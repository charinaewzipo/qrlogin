import { FC, useCallback, useState } from 'react';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ErrorOption, useFieldArray, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup'
import { FORGOT_PASSWORD_PATH } from '@unfinity/constants/routes'
import { Alert, IconButton, InputAdornment, Stack, Link, Button, Typography, Box, styled, MenuItem, TextField, Divider, CircularProgress, FormHelperText } from '@mui/material'
import FormProvider, { RHFAutocomplete, RHFCheckbox, RHFSelect, RHFTextField } from "@sentry/components/hook-form";
import palette from '@sentry/theme/palette';
import { Upload, UploadAvatar } from '@sentry/components/upload';
import { fData } from '@sentry/utils/formatNumber';
import { Accept } from 'react-dropzone';
import { clamp, every, get } from 'lodash';
import Image from '@sentry/components/image'
import { DatePicker } from '@mui/x-date-pickers';

type FormValuesProps = {
    email: string
    password: string
    afterSubmit?: string
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
}
const constant = {
    submit: 'Submit',
    back: 'Back',
    email: 'Email',
    password: 'Password',
    typeOfPerson: 'Type of person',
    department: 'Department',
    governmentName: 'Government name',
    universityName: 'University name',
    companyName: 'Company name',
    position: 'Position',
    studentId: 'StudentId',
    staffId: 'Staff ID',
    positionName: 'Position name',
    expiryDate: 'Expiry date',
    title: 'Title',
    otherTitle: 'Other title',
    firstName: 'Firstname',
    surName: 'Surname',
    address: 'Address',
    phoneNumber: 'Phone number',
    studentIdImage: 'Student/Staff ID Image',
    citizenIdImage: 'Citizen ID Image',
    supervisorDetail: 'Supervisor/Advisor Detail',
    enterSupervisorCode: 'Please enter the code form supervisor associated with your account here.',
    supervisorCode: 'Supervisor code',
}
const typeOfPerson = [
    'SciKU Student & Staff',
    'KU Student & Staff',
    'Other University',
    'Government office',
    'Private company',
]
const position = [
    'Lecturer',
    'Researcher',
    'Ph.D. student',
    'Master student',
    'Bachelor student',
    'Other',
]
const department = [
    'Dept. of Applied Radiation and Isotope',
    'Dept. of Biochemistry',
    'Dept. of Botany',
    'Dept. of Chemistry',
    'Dept. of Computer Science',
    'Dept. of Earth Sciences',
    'Dept. of Genetics',
    'Dept. of Material Science',
    'Dept. of Mathematics',
    'Dept. of Microbiology',
    'Dept. of Physics',
    'Dept. of Statustics',
    'Dept. of Zoology',
]
const title = [
    'Mr',
    'Miss',
    'Mrs',
    'Ms',
    'Dr',
    'Asst.Prof',
    'Assoc.Prof',
    'Prof',
    'Other',
]
interface RegisterFormProps {
    onSubmit: () => void
    onBack: () => void
}
interface IIdImageUpload {
  index: number
}
function RegisterForm(props: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [openPleaseContact, setOpenPleaseContact] = useState(false)

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        password: Yup.string().required('Password is require'),
        avatar: Yup.string().required('Profile image is require'),
        typeOfPerson: Yup.string().required('Type of person is require'),
        department: Yup.string().required('Department is require'),
        universityName: Yup.string().required('University name is require'),
        position: Yup.string().required('Position is require'),
        studentId: Yup.string().required('Student ID is required'),
        staffId: Yup.string(),
        positionName: Yup.string().required('Position is require'),
        expiryDate: Yup.string().required('Expiry date is required'),
        title: Yup.string().required('Title is require'),
        otherTitle: Yup.string().when("title", {
            is: "Other",
            then: Yup.string().required('Other title is require')
        }),
        firstName: Yup.string().required('Firstname is require'),
        surName: Yup.string().required('Surname is require'),
        address: Yup.string().required('Address is require'),
        phoneNumber: Yup.string().required('Phone number is require'),
        idImages: Yup.array(Yup.string()).when(['position', 'typeOfPerson'], {
            is: (true),
            then: Yup.array(Yup.string()).test({
                name: 'idImages',
                message: 'Required',
                test: (val) => every(val, (v) => v !== ''),
            })
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
        expiryDate: '',
        title: '',
        otherTitle: '',
        firstName: '',
        surName: '',
        address: '',
        phoneNumber: '',
        idImages: [''],
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    })

    const {
        reset,
        setError,
        clearErrors,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        control,
        watch
    } = methods
    const watchTypeOfPerson = watch('typeOfPerson')
    const watchPosition = watch('position')
    const watchTitle = watch('title')

    const isKu = ['KU Student & Staff', 'SciKU Student & Staff'].includes(watchTypeOfPerson)
    const isStudent = watchPosition.includes('Student') || watchPosition.includes('student')
    const isStaff = ['Lecturer', 'Researcher',].includes(watchPosition)
    const isPositionOther = watchPosition === 'Other'
    const isTitleOther = watchTitle === 'Other'

    const onSubmit = async (data: FormValuesProps) => {
        methods.watch
        const errorOptions: ErrorOption = {
            message: "errorResponse.data || errorResponse.devMessage"
        }
        setOpenPleaseContact(true)
        setError('afterSubmit', errorOptions)
        console.log(data);
        
    }

    const IdImageUpload: FC<IIdImageUpload> = ({index}) => {
        return (
            <>
                <Controller
                    name={`idImages.${index}`}
                    control={control}
                    render={({ field }) => (
                        <Upload
                            accept={{'image/*': ['.jpeg, .jpg, .png, .gif']}}
                            file={field.value}
                            onDrop={(files) => field.onChange(URL.createObjectURL(files[0]))}
                            onDelete={()=>field.onChange('')}
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
            </>
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
        flex: isShow ? '100%' : 0,
        transform: `scaleZ(${isShow ? '1' : '0'})`,
        transitionDuration: '.2s',
        transformOrigin: 'right',
        marginLeft: isShow ? 3 : 0,
        '& > div': {
            transitionDuration: '.2s',
            opacity: isShow ? 1 : 0,
        },
    })

    const RenderSupervisorDetail = () => {
        const supervisorName = 'Asst. Prof. Dr. Firstname Surname (AB4945GR)'
        const supervisorEmail = 'supervisor.email@ku.ac.th'
        const supervisorPic = 'https://via.placeholder.com/150 '
        return (
            <Stack spacing={2} textAlign={'left'}>
                <Typography variant="h4">{constant.supervisorDetail}</Typography>
                <Typography variant="body1" whiteSpace={'pre-line'}>
                    {constant.enterSupervisorCode}
                </Typography>
                <RHFTextField
                    name="supervisorCode"
                    label={constant.supervisorCode}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {'isFetched' ? (
                                    <CircularProgress size={16} sx={{ color: 'text.primary' }} />
                                ) : (
                                    <IconButton onClick={() => console.log('click')} edge="end">
                                        <Iconify icon={'ic:round-refresh'} />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
                    <Image
                        alt="Logo"
                        src={supervisorPic}
                        sx={{ height: 64, width: 64, borderRadius: 1 }}
                        disabledEffect
                    />
                    <Stack>
                        <Typography variant="h6">{supervisorName}</Typography>
                        <Typography variant="body1" whiteSpace={'pre-line'}>
                            {supervisorEmail}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} justifyContent="center" textAlign={'center'}>
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <Stack>
                            <UploadAvatar
                                accept={{ 'image/*': ['.jpeg, .jpg, .png, .gif'] }}
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
                            <FormHelperText error sx={{ mt: 2 }}>
                                {errors.avatar?.message}
                            </FormHelperText>
                        </Stack>
                    )}
                />
                <RHFTextField name="email" label="Email" />
                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    <Iconify
                                        icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect
                        name="typeOfPerson"
                        label={constant.typeOfPerson}
                        placeholder={constant.typeOfPerson}
                        defaultValue={''}
                    >
                        <option value={''} key={`${''}-typeOfPerson-option`} hidden></option>
                        {typeOfPerson.map((val) => (
                            <option value={val} key={`${val}-typeOfPerson-option`}>
                                {val}
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
                            <RHFAutocomplete
                                fullWidth
                                options={department}
                                name="department"
                                renderInput={(params) => (
                                    <TextField {...params} label={constant.department} />
                                )}
                                placeholder={constant.department}
                                defaultValue={''}
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
                        />
                    )}
                </Stack>
                <Stack flexDirection={'row'}>
                    <RHFSelect
                        name="position"
                        label={constant.position}
                        placeholder={constant.position}
                        defaultValue={''}
                        sx={{ flex: '100%' }}
                    >
                        <option value={''} key={`${''}-position-option`} hidden></option>
                        <option value={''} key={`${'s'}-position-option`}>
                            Plese select
                        </option>
                        {position.map((val) => {
                            if (watchTypeOfPerson === 'SciKU Student & Staff' && val === 'Other')
                                return
                            return (
                                <option value={val} key={`${val}-position-option`}>
                                    {val}
                                </option>
                            )
                        })}
                    </RHFSelect>

                    <Stack sx={collapseableInputStyle(( isKu || isPositionOther) && watchPosition !== '')}>
                        {isStudent ? (
                            <RHFTextField name="studentId" label={constant.studentId} />
                        ) : isStaff ? (
                            <RHFTextField name="staffId" label={constant.staffId} />
                        ) : isPositionOther ? (
                            <RHFTextField name="positionName" label={constant.positionName} />
                        ) : (
                            <></>
                        )}
                    </Stack>
                </Stack>

                {isKu && isStudent ? (
                    <Controller
                        name="expiryDate"
                        control={control}
                        defaultValue={''}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                label={constant.expiryDate}
                                value={field.value || null}
                                onChange={(newValue) => {
                                    field.onChange(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        )}
                    />
                ) : (
                    <></>
                )}
                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect
                        name="title"
                        label={constant.title}
                        placeholder={constant.title}
                        defaultValue={''}
                        // onBlur={() => clearErrors('otherTitle')}
                    >
                        <option value={''} key={`${''}-title-option`} hidden></option>
                        {title.map((val) => (
                            <option value={val} key={`${val}-title-option`}>
                                {val}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFTextField
                        name={isTitleOther ? 'otherTitle' : ''}
                        label={constant.otherTitle}
                        disabled={!isTitleOther}
                    />
                </Stack>
                <Stack flexDirection={'row'} gap={3}>
                    <RHFTextField name="firstName" label={constant.firstName} />
                    <RHFTextField name="surName" label={constant.surName} />
                </Stack>
                <RHFTextField name="address" multiline label={constant.address} minRows={4} />
                <RHFTextField name="phoneNumber" label={constant.phoneNumber} />
                <RenderIdImageUpload />
            </Stack>

            {isKu && isStudent ? (
                <>
                    <Divider sx={{ marginY: 8 }} />
                    <RenderSupervisorDetail />
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
                {/* <Link variant="subtitle1" href={FORGOT_PASSWORD_PATH}> Register </Link> */}
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