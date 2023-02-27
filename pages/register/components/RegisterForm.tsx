import { FC, useCallback, useState } from 'react';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ErrorOption, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup'
import { FORGOT_PASSWORD_PATH } from '@unfinity/constants/routes'
import { Alert, IconButton, InputAdornment, Stack, Link, Button, Typography, Box, styled, MenuItem } from '@mui/material'
import FormProvider, { RHFAutocomplete, RHFCheckbox, RHFSelect, RHFTextField } from "@sentry/components/hook-form";
import palette from '@sentry/theme/palette';
import { Upload, UploadAvatar } from '@sentry/components/upload';
import { fData } from '@sentry/utils/formatNumber';
import { Accept } from 'react-dropzone';
import { clamp, get } from 'lodash';

type FormValuesProps = {
    email: string
    password: string
    remember: boolean
    afterSubmit?: string
    typeOfPerson: string
    avatar: string
    department: string
    position: string
    title: string
    otherTitle: string
    firstName: string
    surName: string
    address: string
    phoneNumber: string
    studentIdImage: string
    citizenIdImage: string
    idImages: string[]
}
const constant = {
    submit: 'Submit',
    back: 'Back',
    email: 'Email',
    password: 'Password',
    typeOfPerson: 'Type of person',
    department: 'Department',
    position: 'Position',
    studentId: 'StudentId',
    title: 'Title',
    otherTitle: 'Other title',
    firstName: 'Firstname',
    surName: 'Surname',
    address: 'Address',
    phoneNumber: 'Phone number',
    studentIdImage: 'Student/Staff ID Image',
    citizenIdImage: 'Citizen ID Image',
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
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        remember: Yup.boolean(),
        avatar: Yup.string(),
        typeOfPerson: Yup.string(),
        department: Yup.string(),
        position: Yup.string(),
        title: Yup.string(),
        otherTitle: Yup.string(),
        firstName: Yup.string(),
        surName: Yup.string(),
        address: Yup.string(),
        phoneNumber: Yup.string(),
        studentIdImage: Yup.string(),
        citizenIdImage: Yup.string(),
        idImages: Yup.array(Yup.string()),
    })

    const defaultValues = {
        avatar: '',
        email: '',
        password: '',
        remember: false,
        typeOfPerson: '',
        department: '',
        position: '',
        title: '',
        otherTitle: '',
        firstName: '',
        surName: '',
        address: '',
        phoneNumber: '',
        studentIdImage: '',
        citizenIdImage: '',
        idImages: [''],
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    })

    const {
        reset,
        setError,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        control,
        watch
    } = methods
    const onSubmit = async (data: FormValuesProps) => {
        methods.watch
        const errorOptions: ErrorOption = {
            message: "errorResponse.data || errorResponse.devMessage"
        }
        setOpenPleaseContact(true)
        setError('afterSubmit', errorOptions)
    }

    const IdImageUpload: FC<IIdImageUpload> = ({index}) => {
        return (
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
                                    textAlign: 'center'
                                },
                            }}
                        />
                    )}
                />
        )
    }
    const RenderIdImageUpload = () => {
        const idImageWithoutEmpty = watch('idImages').filter(idImage => idImage)
        const idImageLength = clamp(idImageWithoutEmpty.length + 1, 1, 2)
        
        return (
            <Stack flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={1.5}>
                {[...Array(idImageLength).keys()].map((i)=><IdImageUpload key={`id-image-upload-${i}`} index={i} />)}
            </Stack>
        )
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} justifyContent="center">
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <UploadAvatar
                            accept={{ 'image/*': ['.jpeg, .jpg, .png, .gif'] }}
                            file={field.value}
                            onDrop={(files) => field.onChange(URL.createObjectURL(files[0]))}
                            maxSize={200000}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(200000)}
                                </Typography>
                            }
                        />
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
                    <RHFAutocomplete
                        fullWidth
                        options={department}
                        name="department"
                        renderInput={(params) => (
                            <RHFTextField
                                {...params}
                                name="department"
                                label={constant.department}
                            />
                        )}
                        placeholder={constant.department}
                        defaultValue={''}
                    />
                    {/* <RHFSelect
                        name='department'
                        label={constant.department}
                        placeholder={constant.department}
                        defaultValue={''}
                    >
                        <option value={''} key={`${''}-department-option`} hidden></option>
                        {department.map(val=><option value={val} key={`${val}-department-option`}>{val}</option>)}
                    </RHFSelect> */}
                </Stack>
                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect
                        name="position"
                        label={constant.position}
                        placeholder={constant.position}
                        defaultValue={''}
                    >
                        <option value={''} key={`${''}-position-option`} hidden></option>
                        <option value={''} key={`${''}-position-option`} disabled>Plese select</option>
                        {position.map((val) => (
                            <option value={val} key={`${val}-position-option`}>
                                {val}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFTextField
                        name="studentId"
                        label={constant.studentId}
                        sx={
                            watch('position').includes('student')
                                ? { width: '100%', display: 'block', transitionDuration: '.5s'}
                                : { width: '0%', display: 'none', transitionDuration: '.5s' }
                        }
                    />
                </Stack>

                <Stack flexDirection={'row'} gap={3}>
                    <RHFSelect
                        name="title"
                        label={constant.title}
                        placeholder={constant.title}
                        defaultValue={''}
                    >
                        <option value={''} key={`${''}-title-option`} hidden></option>
                        {title.map((val) => (
                            <option value={val} key={`${val}-title-option`}>
                                {val}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFTextField
                        name="otherTitle"
                        label={constant.otherTitle}
                        disabled={watch('title') !== 'Other'}
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

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 6 }}
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
        </FormProvider>
    )
}

export default RegisterForm