import { ChangeEvent, FC, useEffect, useState } from 'react';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ErrorOption, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, IconButton, InputAdornment, Stack, Typography, TextField, Divider, CircularProgress, FormHelperText, Autocomplete, Box } from '@mui/material'
import FormProvider, { RHFSelect, RHFTextField } from "@sentry/components/hook-form";
import { Upload, UploadAvatar } from '@sentry/components/upload';
import { fData } from '@sentry/utils/formatNumber';
import { clamp, every, get } from 'lodash';
import Image from '@sentry/components/image'
import { DatePicker } from '@mui/x-date-pickers';
import { fetchGetSupervisor } from '@ku/services/supervisor';

export interface RegisterFormValuesProps {
    email: string
    password: string
    typeOfPerson: string
    avatar: string
    department: string
    governmentName: string
    companyName: string
    position: string
    studentId: string
    staffId: string
    positionName: string
    expiryDate: string
    title: string
    otherTitle: string
    firstName: string
    surName: string
    address: string
    phoneNumber: string
    idImages: string[]
    supervisorCode: string
    supervisorStatus: 'found' | 'notFound' | 'waiting'
}
const constant = {
    submit: 'Submit',
    back: 'Back',
    email: 'Email *',
    password: 'Password *',
    typeOfPerson: 'Type of person *',
    department: 'Department *',
    governmentName: 'Government name *',
    universityName: 'University name *',
    companyName: 'Company name *',
    position: 'Position *',
    studentId: 'StudentId *',
    staffId: 'Staff ID',
    positionName: 'Position name *',
    expiryDate: 'Expiry date *',
    title: 'Title *',
    otherTitle: 'Other title',
    firstName: 'Firstname *',
    surName: 'Surname *',
    address: 'Address *',
    phoneNumber: 'Phone number *',
    studentIdImage: 'Student/Staff ID Image',
    citizenIdImage: 'Citizen ID Image',
    supervisorDetail: 'Supervisor/Advisor Detail',
    enterSupervisorCode: 'Please enter the code form supervisor associated with your account here.',
    supervisorCode: 'Supervisor code',
    supervisorNotFound: 'Supervisor code not found, please contact your supervisor for code',
}
const typeOfPerson = [
    {value: 'SciKU Student & Staff', label: 'SciKU Student & Staff'},
    {value: 'KU Student & Staff', label: 'KU Student & Staff'},
    {value: 'Other University', label: 'Other University'},
    {value: 'Government office', label: 'Government office'},
    {value: 'Private company', label: 'Private company'},
]
const position = [
    {value: 'Lecturer', label: 'Lecturer'},
    {value: 'Researcher', label: 'Researcher'},
    {value: 'Ph.D. student', label: 'Ph.D. student'},
    {value: 'Master student', label: 'Master student'},
    {value: 'Bachelor student', label: 'Bachelor student'},
    {value: 'Other', label: 'Other'},
]
const department = [
    {value: 'Dept. of Applied Radiation and Isotope', label: 'Dept. of Applied Radiation and Isotope'},
    {value: 'Dept. of Biochemistry', label: 'Dept. of Biochemistry'},
    {value: 'Dept. of Botany', label: 'Dept. of Botany'},
    {value: 'Dept. of Chemistry', label: 'Dept. of Chemistry'},
    {value: 'Dept. of Computer Science', label: 'Dept. of Computer Science'},
    {value: 'Dept. of Earth Sciences', label: 'Dept. of Earth Sciences'},
    {value: 'Dept. of Genetics', label: 'Dept. of Genetics'},
    {value: 'Dept. of Material Science', label: 'Dept. of Material Science'},
    {value: 'Dept. of Mathematics', label: 'Dept. of Mathematics'},
    {value: 'Dept. of Microbiology', label: 'Dept. of Microbiology'},
    {value: 'Dept. of Physics', label: 'Dept. of Physics'},
    {value: 'Dept. of Statustics', label: 'Dept. of Statustics'},
    {value: 'Dept. of Zoology', label: 'Dept. of Zoology'},
]
const title = [
    {value: 'Mr', label: 'Mr'},
    {value: 'Miss', label: 'Miss'},
    {value: 'Mrs', label: 'Mrs'},
    {value: 'Ms', label: 'Ms'},
    {value: 'Dr', label: 'Dr'},
    {value: 'Asst.Prof', label: 'Asst.Prof'},
    {value: 'Assoc.Prof', label: 'Assoc.Prof'},
    {value: 'Prof', label: 'Prof'},
    {value: 'Other', label: 'Other'},
]
interface RegisterFormProps {
    onSubmit: (data: RegisterFormValuesProps) => void
    onBack: () => void
    errorMsg: string
}
interface IIdImageUpload {
  index: number
}
function RegisterForm(props: RegisterFormProps) {
    const [supervisor, setSupervisor] = useState<ISupervisor | null>()
    const [isSupervisorFetching, setIsSupervisorFetching] = useState(false)
    const [supervisorTimeout, setSupervisorTimeout] = useState<NodeJS.Timeout>();

    const checkIsKuPerson = (typeOfPerson: string) =>
        ['KU Student & Staff', 'SciKU Student & Staff'].includes(typeOfPerson)
    const checkIsStudent = (position: string) => position.includes('student')
    const checkIsStaff = (position: string) => ['Lecturer', 'Researcher',].includes(position)
    const checkIsKuStudent = (position: string, typeOfPerson: string) =>
        checkIsKuPerson(typeOfPerson) && checkIsStudent(position)
    const kuStudentEmailRegex = /@ku\.ac\.th$|@ku\.th$/
    const numberOnlyRegex = /^[0-9\b]+$/

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required')
            .when(['position', 'typeOfPerson'], {
                is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
                then: Yup.string().test({
                    name: 'email',
                    message: 'KU student/staff must be @ku.ac.th or @ku.th',
                    test: (email) => new RegExp(kuStudentEmailRegex).test(email),
                }),
            }),
        password: Yup.string().required('Password is require'),
        avatar: Yup.string().required('Profile image is require'),
        typeOfPerson: Yup.string().required('Type of person is require'),
        department: Yup.string()
            .nullable()
            .when('typeOfPerson', {
                is: (position) => checkIsKuPerson(position) || position === '',
                then: Yup.string().nullable().required('Department is require'),
            }),
        universityName: Yup.string().when('typeOfPerson', {
            is: 'Other University',
            then: Yup.string().required('University name is require'),
        }),
        governmentName: Yup.string().when('typeOfPerson', {
            is: 'Government office',
            then: Yup.string().required('Government name is require'),
        }),
        companyName: Yup.string().when('typeOfPerson', {
            is: 'Private company',
            then: Yup.string().required('Company name is require'),
        }),
        position: Yup.string().required('Position is require'),
        studentId: Yup.string().when(['position', 'typeOfPerson'], {
            is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
            then: Yup.string().required('Student ID is required'),
        }),
        staffId: Yup.string(),
        positionName: Yup.string().when('position', {
            is: 'Other',
            then: Yup.string().required('Position is require'),
        }),
        expiryDate: Yup.date()
            .typeError('Expected date format is dd/mmm/yyyy. Example: "1 jan 1970"')
            .nullable()
            .when(['position', 'typeOfPerson'], {
                is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
                then: Yup.date()
                    .typeError('Expected date format is dd/mmm/yyyy. Example: "1 jan 1970".')
                    .nullable()
                    .required('Expiry date is required')
                    .test({
                        name: 'expiryDate',
                        message: "Expiry date must be greater than today's date",
                        test: (date) => {
                            const datePlusOne = new Date()
                            datePlusOne.setDate(datePlusOne.getDate() + 1)
                            datePlusOne.setHours(0, 0, 0, 0)
                            return date === null || date.getTime() >= datePlusOne.getTime()
                        },
                    }),
            }),
        title: Yup.string().required('Title is require'),
        otherTitle: Yup.string().when('title', {
            is: (title) => title === 'Other' || title === '',
            then: Yup.string().required('Other title is require'),
        }),
        firstName: Yup.string().required('Firstname is require'),
        surName: Yup.string().required('Surname is require'),
        address: Yup.string().required('Address is require'),
        phoneNumber: Yup.string()
            .required('Phone number is require')
            .test({
                name: 'phoneNumber',
                message: 'Phone number must be numbers',
                test: (phone) => new RegExp(numberOnlyRegex).test(phone),
            })
            .test({
                name: 'phoneNumber',
                message: "Phone number must start with '0'",
                test: (phone) => phone[0] === '0',
            })
            .length(10, 'Phone number must be 10 digits'),
        idImages: Yup.array(Yup.string()).when(['position', 'typeOfPerson'], {
            is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
            then: Yup.array(Yup.string()).test({
                name: 'idImages',
                message: 'SciKU student & staff ID card are require',
                test: (idImages) => every(idImages, (img) => img !== ''),
            }),
        }),
        supervisorCode: Yup.string().when(['position', 'typeOfPerson'], {
            is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
            then: Yup.string()
                .required('Supervisor code is require, please contact your supervisor for code')
                .test({
                    name: 'supervisorCode',
                    message: '',
                    test: (_, ctx) => ctx.parent.supervisorStatus !== 'waiting',
                })
                .test({
                    name: 'supervisorCode',
                    message: constant.supervisorNotFound,
                    test: (_, ctx) => ctx.parent.supervisorStatus !== 'notFound',
                }),
        }),
    })

    const defaultValues = {
        avatar: '',
        email: '',
        password: '',
        typeOfPerson: '',
        department: '',
        universityName: '',
        studentId: '',
        position: '',
        staffId: '',
        positionName: '',
        expiryDate: null,
        title: '',
        otherTitle: '',
        firstName: '',
        surName: '',
        address: '',
        phoneNumber: '',
        idImages: [''],
        supervisorCode: '',
        supervisorStatus: null,
    }

    const methods = useForm<RegisterFormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    })

    const {
        clearErrors,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitted },
        control,
        watch,
        trigger
    } = methods
    const watchTypeOfPerson = watch('typeOfPerson')
    const watchPosition = watch('position')
    const watchTitle = watch('title')
    const watchSupervisorCode = watch('supervisorCode')

    useEffect(() => {
        clearTimeout(supervisorTimeout);
        setValue('supervisorStatus', 'waiting')
        setSupervisorTimeout(
            setTimeout(() => {
                fetchSupervisorData(watchSupervisorCode)
            }, 1000)
        )
    }, [watchSupervisorCode])
    useEffect(() => {
        if (isSubmitted)
            trigger()
    }, [watchTypeOfPerson, watchPosition])
    
    const isKu = checkIsKuPerson(watchTypeOfPerson)
    const isStudent = checkIsStudent(watchPosition)
    const isStaff = checkIsStaff(watchPosition)
    const isKuStudent = checkIsKuStudent(watchPosition, watchTypeOfPerson)
    const isPositionOther = watchPosition === 'Other'
    const isTitleOther = watchTitle === 'Other'

    const onSubmit = async (data: RegisterFormValuesProps) => {
        methods.watch
        window.scrollTo(0, 0)
        props.onSubmit(data)
    }
    const handleChangeNumber = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: keyof RegisterFormValuesProps,
    ) => {
        const typingIndexFromEnd = e.target.selectionStart - e.target.value.length
        const newValue = e.target.value.replace(new RegExp(',', 'g'), '') || ''
        if (newValue === '' || new RegExp(numberOnlyRegex).test(newValue)) {
            setValue(fieldName, newValue)
            if (isSubmitted) trigger()
            setTimeout(() => {
                //set text cursor at same position after setValue
                const typingIndexFromStart = newValue.length + typingIndexFromEnd;
                e.target.setSelectionRange(typingIndexFromStart, typingIndexFromStart)
            }, 0)
        }
    }
    const IdImageUpload: FC<IIdImageUpload> = ({ index }) => {
        return (
            <Controller
                name={`idImages.${index}`}
                control={control}
                render={({ field }) => (
                    <Upload
                        dropzoneHelper={
                            <Box sx={{ py: 3, px: 1 }}>
                                <Typography gutterBottom variant="h5" sx={{ ml: -2 }}>
                                    {isKu || watchTypeOfPerson === ''
                                        ? constant.studentIdImage
                                        : constant.citizenIdImage}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    component="p"
                                    whiteSpace="pre-line"
                                    sx={{ ml: -2 }}
                                >
                                    Drop files here or click
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{
                                            mx: 0.5,
                                            color: 'primary.main',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {`browse\n`}
                                    </Typography>
                                    {`thorough your machine.\n\n`}
                                    {`Allowed *.jpeg, *.jpg, *.png\n`}
                                    {`Max size of 200KB`}
                                </Typography>
                            </Box>
                        }
                        accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                        file={field.value}
                        onDrop={(files) => field.onChange(URL.createObjectURL(files[0]))}
                        onDelete={() => field.onChange('')}
                        sx={{
                            width: get(field, 'value', '') === '' ? 264 : '100%',
                            flex: get(field, 'value', '') === '' ? '' : '50%',
                            '& > div > div': {
                                flexDirection: 'column',
                                textAlign: 'center',
                            },
                        }}
                        maxSize={200000}
                    />
                )}
            />
        )
    }
    const RenderIdImageUpload = () => {
        const idImageWithoutEmpty = watch('idImages').filter(idImage => idImage)
        const idImageLength = clamp(idImageWithoutEmpty.length + 1, 1, 2)
        return (
            <>
                <Stack flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={1.5}>
                    {[...Array(idImageLength).keys()].map((i) => (
                        <IdImageUpload key={`id-image-upload-${i}`} index={i} />
                    ))}
                </Stack>
                <FormHelperText error sx={{ textAlign: 'center '}}>{errors.idImages?.message}</FormHelperText>
            </>
        )
    }

    const collapseableInputStyle = (isShow: boolean) => ({
        flex: isShow ? '100%' : '0%',
        transform: `scaleZ(${isShow ? '1' : '0'})`,
        transitionDuration: '.2s',
        transformOrigin: 'right',
        marginLeft: isShow ? 3 : -3,
        '& > div': {
            transitionDuration: '.2s',
            opacity: isShow ? 1 : 0,
        },
    })

    const fetchSupervisorData = async (code: string) => {
        clearErrors()
        if (!code) return
        if (code.length < 6) return
        try {
            setIsSupervisorFetching(true)
            const response = await fetchGetSupervisor(code)
            if (response.code === 200) {
                setValue('supervisorStatus', 'found')
                setSupervisor(response.data)
            } else {
                setSupervisor(null)
                setValue('supervisorStatus', 'notFound')
            }
            setIsSupervisorFetching(false)
        } catch (error) {
            console.log(error);
        }
        trigger()
    }
    
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} justifyContent="center" textAlign={'center'}>
                {!!props.errorMsg && (
                    <Alert severity="error">{props.errorMsg}</Alert>
                )}
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <Stack>
                            <UploadAvatar
                                accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                                file={field.value}
                                onDrop={(files) => field.onChange(URL.createObjectURL(files[0]))}
                                maxSize={200000}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{ mt: 1, color: 'text.secondary' }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br /> max size of {fData(200000)}
                                    </Typography>
                                }
                            />
                            <FormHelperText error sx={{ mt: 2, textAlign: 'center' }}>
                                {errors.avatar?.message}
                            </FormHelperText>
                        </Stack>
                    )}
                />
                <RHFTextField name="email" label={constant.email} />
                <RHFTextField
                    name="password"
                    label={constant.password}
                    inputProps={{ maxLength: 100 }}
                />
                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect
                        name="typeOfPerson"
                        label={constant.typeOfPerson}
                        placeholder={constant.typeOfPerson}
                    >
                        <option value={''} key={`${''}-typeOfPerson-option`} hidden></option>
                        {typeOfPerson.map(({ value, label }) => (
                            <option value={value} key={`${value}-typeOfPerson-option`}>
                                {label}
                            </option>
                        ))}
                    </RHFSelect>
                    {{
                        'Other University': (
                            <RHFTextField name="universityName" label={constant.universityName} />
                        ),
                        'KU Student & Staff': (
                            <RHFTextField
                                name="department"
                                key={'department-textfield'}
                                label={constant.department}
                            />
                        ),
                        'SciKU Student & Staff': (
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        freeSolo
                                        fullWidth
                                        onChange={(event, newValue) =>
                                            field.onChange(get(newValue, 'value', newValue))
                                        }
                                        options={department}
                                        key={'department-auto'}
                                        renderInput={(param) => (
                                            <TextField
                                                {...param}
                                                error={!!errors?.department}
                                                helperText={get(errors?.department, 'message', '')}
                                                label={constant.department}
                                            />
                                        )}
                                        placeholder={constant.department}
                                    />
                                )}
                            />
                        ),
                        'Government office': (
                            <RHFTextField
                                name="governmentName"
                                key={'governmentName-textfield'}
                                label={constant.governmentName}
                            />
                        ),
                        'Private company': (
                            <RHFTextField
                                name="companyName"
                                key={'companyName-textfield'}
                                label={constant.companyName}
                            />
                        ),
                    }[watchTypeOfPerson] || (
                        <RHFTextField
                            name="department"
                            key={'department-textfield'}
                            label={constant.department}
                            disabled
                        />
                    )}
                </Stack>
                <Stack flexDirection={'row'}>
                    <RHFSelect
                        name="position"
                        label={constant.position}
                        placeholder={constant.position}
                        sx={{ flex: '100%' }}
                    >
                        <option value={''} key={`${''}-position-option`} hidden></option>
                        {position.map(({ value, label }) => {
                            if (watchTypeOfPerson === 'SciKU Student & Staff' && value === 'Other')
                                return
                            return (
                                <option value={value} key={`${value}-position-option`}>
                                    {label}
                                </option>
                            )
                        })}
                    </RHFSelect>

                    <Stack
                        sx={collapseableInputStyle(
                            (isKu || isPositionOther) && watchPosition !== ''
                        )}
                    >
                        {isKuStudent ? (
                            <RHFTextField
                                name="studentId"
                                label={constant.studentId}
                                inputProps={{ maxLength: 100 }}
                            />
                        ) : isKu && isStaff ? (
                            <RHFTextField
                                name="staffId"
                                label={constant.staffId}
                                inputProps={{ maxLength: 100 }}
                            />
                        ) : isPositionOther ? (
                            <RHFTextField
                                name="positionName"
                                label={constant.positionName}
                                inputProps={{ maxLength: 100 }}
                            />
                        ) : (
                            <RHFTextField
                                name="studentId"
                                label={constant.studentId}
                                inputProps={{ maxLength: 100 }}
                            />
                        )}
                    </Stack>
                </Stack>

                {isKuStudent ? (
                    <Controller
                        name="expiryDate"
                        control={control}
                        defaultValue={''}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                inputFormat="dd MMM yyyy"
                                label={constant.expiryDate}
                                value={field.value || null}
                                onChange={(newValue) => {
                                    field.onChange(newValue)
                                }}
                                disableMaskedInput
                                disablePast
                                minDate={new Date().setDate(new Date().getDate() + 1)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    />
                ) : (
                    <></>
                )}
                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect name="title" label={constant.title} placeholder={constant.title}>
                        <option value={''} key={`${''}-title-option`} hidden></option>
                        {title.map(({ value, label }) => (
                            <option value={value} key={`${value}-title-option`}>
                                {label}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFTextField
                        name={isTitleOther ? 'otherTitle' : ''}
                        label={`${constant.otherTitle} ${isTitleOther ? '*' : ''}`}
                        disabled={!isTitleOther}
                        inputProps={{ maxLength: 100 }}
                    />
                </Stack>
                <Stack flexDirection={'row'} gap={3}>
                    <RHFTextField
                        name="firstName"
                        label={constant.firstName}
                        inputProps={{ maxLength: 100 }}
                    />
                    <RHFTextField
                        name="surName"
                        label={constant.surName}
                        inputProps={{ maxLength: 100 }}
                    />
                </Stack>
                <RHFTextField
                    name="address"
                    multiline
                    label={constant.address}
                    inputProps={{ maxLength: 200 }}
                    minRows={4}
                />
                <RHFTextField
                    name="phoneNumber"
                    label={constant.phoneNumber}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => handleChangeNumber(e, 'phoneNumber')}
                />
                <RenderIdImageUpload />
            </Stack>

            {isKu && isStudent ? (
                <>
                    <Divider sx={{ marginY: 8 }} />
                    <Stack spacing={2} textAlign={'left'}>
                        <Typography variant="h4">{constant.supervisorDetail}</Typography>
                        <Typography variant="body1" whiteSpace={'pre-line'}>
                            {constant.enterSupervisorCode}
                        </Typography>
                        <RHFTextField
                            name="supervisorCode"
                            defaultValue=""
                            label={constant.supervisorCode}
                            error={!!errors.supervisorCode}
                            helperText={get(errors?.supervisorCode, 'message', '')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isSupervisorFetching ? (
                                            <CircularProgress
                                                size={16}
                                                sx={{ color: 'text.primary' }}
                                            />
                                        ) : !!errors.supervisorCode ? (
                                            <IconButton
                                                onClick={() =>
                                                    fetchSupervisorData(getValues('supervisorCode'))
                                                }
                                                edge="end"
                                            >
                                                <Iconify icon={'ic:round-refresh'} />
                                            </IconButton>
                                        ) : (
                                            <></>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {supervisor ? (
                            <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
                                <Image
                                    alt="Logo"
                                    src={supervisor.pic}
                                    sx={{ height: 64, width: 64, borderRadius: 1 }}
                                    disabledEffect
                                />
                                <Stack>
                                    <Typography variant="h6">
                                        {`${supervisor.name} (${supervisor.code})`}
                                    </Typography>
                                    <Typography variant="body1" whiteSpace={'pre-line'}>
                                        {supervisor.email}
                                    </Typography>
                                </Stack>
                            </Stack>
                        ) : (
                            <></>
                        )}
                    </Stack>
                </>
            ) : (
                <></>
            )}
            <Stack marginTop={6}>
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    // loading={authenticationStore.isFetching}
                >
                    {constant.submit}
                </LoadingButton>
                <LoadingButton
                    fullWidth
                    size="large"
                    type="button"
                    variant="text"
                    sx={{ mt: 1 }}
                    onClick={props.onBack}
                    // loading={authenticationStore.isFetching}
                >
                    {constant.back}
                </LoadingButton>
            </Stack>
        </FormProvider>
    )
}

export default RegisterForm