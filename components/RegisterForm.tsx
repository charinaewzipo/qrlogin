import { FC, useCallback, useRef, useState, useEffect } from 'react';RHFTextField
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ErrorOption, useFieldArray, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup'
import { FORGOT_PASSWORD_PATH } from '@unfinity/constants/routes'
import { Alert, IconButton, InputAdornment, Stack, Link, Button, Typography, Box, styled, MenuItem, TextField, Divider, CircularProgress, FormHelperText, Autocomplete } from '@mui/material'
import FormProvider, { RHFAutocomplete, RHFCheckbox, RHFSelect, RHFTextField } from "@sentry/components/hook-form";
import palette from '@sentry/theme/palette';
import { Upload, UploadAvatar } from '@sentry/components/upload';
import { fData } from '@sentry/utils/formatNumber';
import { Accept } from 'react-dropzone';
import { clamp, every, get } from 'lodash';
import Image from '@sentry/components/image'
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from '@unfinity/redux';
import { getSupervisor } from '@unfinity/redux/supervisor';
import UploadWithTextProps from './upload/UploadWithTextProps';

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
    supervisorCode: string
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
    const checkIsKuPerson = (typeOfPerson: string) =>
        ['KU Student & Staff', 'SciKU Student & Staff'].includes(typeOfPerson)
    const checkIsStudent = (position: string) => position.includes('student')
    const checkIsStaff = (position: string) => ['Lecturer', 'Researcher',].includes(position)
    const checkIsKuStudent = (position: string, typeOfPerson: string) =>
        checkIsKuPerson(typeOfPerson) && checkIsStudent(position)

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required'),
        password: Yup.string().required('Password is require'),
        avatar: Yup.string().required('Profile image is require'),
        typeOfPerson: Yup.string().required('Type of person is require'),
        department: Yup.string().nullable().when('typeOfPerson', {
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
        expiryDate: Yup.string().when(['position', 'typeOfPerson'], {
            is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
            then: Yup.string().required('Expiry date is required'),
        }),
        title: Yup.string().required('Title is require'),
        otherTitle: Yup.string().when('title', {
            is: (title) => title === 'Other' || title === '',
            then: Yup.string().required('Other title is require'),
        }),
        firstName: Yup.string().required('Firstname is require'),
        surName: Yup.string().required('Surname is require'),
        address: Yup.string().required('Address is require'),
        phoneNumber: Yup.string().required('Phone number is require'),
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
            then: Yup.string().required('Supervisor code is require, please contact your supervisor for code'),
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
        watch,
    } = methods
    const watchTypeOfPerson = watch('typeOfPerson')
    const watchPosition = watch('position')
    const watchTitle = watch('title')
    const watchSupervisorCode = watch('supervisorCode')

    useEffect(() => {
        if (!watchSupervisorCode)
            return
        if (watchSupervisorCode.length === 6)
        fetchSupervisorData(watchSupervisorCode)
    }, [watchSupervisorCode])
    
    const isKu = checkIsKuPerson(watchTypeOfPerson)
    const isStudent = checkIsStudent(watchPosition)
    const isStaff = checkIsStaff(watchPosition)
    const isKuStudent = checkIsKuStudent(watchPosition, watchTypeOfPerson)
    const isPositionOther = watchPosition === 'Other'
    const isTitleOther = watchTitle === 'Other' || watchTitle === ''

    const onSubmit = async (data: FormValuesProps) => {
        methods.watch
        const errorOptions: ErrorOption = {
            message: "errorResponse.data || errorResponse.devMessage"
        }
        setError('afterSubmit', errorOptions)
        console.log(data);
        window.scrollTo(0, 0)
    }

    const IdImageUpload: FC<IIdImageUpload> = ({ index }) => {
        return (
            <Controller
                name={`idImages.${index}`}
                control={control}
                render={({ field }) => (
                    <UploadWithTextProps
                        titleText={isKu || watchTypeOfPerson === '' ? constant.studentIdImage : constant.citizenIdImage}
                        descriptionText={
                            <>
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
                                <Typography
                                    variant="body2"
                                    component="span"
                                    whiteSpace='pre-line'
                                >
                                    {`thorough your machine.\n\n`}
                                    Allowed *.jpeg, *.jpg, *.png<br />
                                    Max size of 200KB
                                </Typography>
                            </>
                        }
                        accept={{ 'image/*': ['.jpeg, .jpg, .png, .gif'] }}
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
    
    const dispatch = useDispatch()
    const {isLoading, error, supervisor} = useSelector(state => state.supervisor)

    const fetchSupervisorData = (code: string) => {
        console.log(code)
        dispatch(getSupervisor(code))
    }
    
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} justifyContent="center" textAlign={'center'}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
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
                            <FormHelperText error sx={{ mt: 2, textAlign: 'center' }}>
                                {errors.avatar?.message}
                            </FormHelperText>
                        </Stack>
                    )}
                />
                <RHFTextField name="email" label="Email" />
                <RHFTextField name="password" label="Password" />
                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect
                        name="typeOfPerson"
                        label={constant.typeOfPerson}
                        placeholder={constant.typeOfPerson}
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
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        freeSolo
                                        fullWidth
                                        onChange={(event, newValue) => field.onChange(newValue)}
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

                    <Stack
                        sx={collapseableInputStyle(
                            (isKu || isPositionOther) && watchPosition !== ''
                        )}
                    >
                        {isKuStudent ? (
                            <RHFTextField name="studentId" label={constant.studentId} />
                        ) : isKu && isStaff ? (
                            <RHFTextField name="staffId" label={constant.staffId} />
                        ) : isPositionOther ? (
                            <RHFTextField name="positionName" label={constant.positionName} />
                        ) : (
                            <RHFTextField name="studentId" label={constant.studentId} />
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
                                inputFormat='dd MMM yyyy'
                                label={constant.expiryDate}
                                value={field.value || null}
                                onChange={(newValue) => {
                                    field.onChange(newValue)
                                }}
                                disableMaskedInput
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
                    <Stack spacing={2} textAlign={'left'}>
                        <Typography variant="h4">{constant.supervisorDetail}</Typography>
                        <Typography variant="body1" whiteSpace={'pre-line'}>
                            {constant.enterSupervisorCode}
                        </Typography>
                        <RHFTextField
                            name="supervisorCode"
                            label={constant.supervisorCode}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isLoading ? (
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
                        {isLoading === false && error === '' && supervisor.code !== ''}
                        <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
                            <Image
                                alt="Logo"
                                src={supervisor.pic}
                                sx={{ height: 64, width: 64, borderRadius: 1 }}
                                disabledEffect
                            />
                            <Stack>
                                <Typography variant="h6">{`${supervisor.name} (${supervisor.code})`}</Typography>
                                <Typography variant="body1" whiteSpace={'pre-line'}>
                                    {supervisor.email}
                                </Typography>
                            </Stack>
                        </Stack>
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