import * as Yup from 'yup'
import { useCallback, useMemo } from 'react'
// next
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Grid, Card, Stack, Button, TextField, Alert, Typography, Box } from '@mui/material'
import { useSnackbar } from '@sentry/components/snackbar'
import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
    RHFUploadAvatar,
} from '@sentry/components/hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import { fData } from '@sentry/utils/formatNumber'

const PRIVILLEGE_OPTION = ['Admin', 'Finance', 'Supervisor', 'User']
const STATUS_OPTION = ['Active', 'Inactive']
const TYPEOFPERSON_OPTION = [
    'SciKU Student & Staff',
    'KU Student & Staff',
    'Other University',
    'Government office',
    'Pricate company',
]
const DEPARTMENT_OPTION = [
    'Dept. of Applied Radiation and Isotope',
    'Dept. of Biochemistry',
    'Dept. of Botany',
    'Dept. of Computer Science',
    'Dept. of Earth Science',
    'Dept. of Genetics',
    'Dept. of Material Science',
    'Dept. of Mathematics',
    'Dept. of Microbiology',
    'Dept. of Physics',
]
const POSITION_OPTION = [
    'Lecturer',
    'Researcher',
    'PhD. student',
    'Master student',
    'Bachelor student',
    'Other',
]
const TITLE_OPTION = ['Mr', 'Miss', 'Mrs', 'Mrs', 'Ms', 'Dr', 'Asset. Prof', 'Assoc. Prof', 'Other']

export type FormValuesProps = {
    permission: string
    email: string
    password: string
    accountStatus: string
    accountExpiryDate: Date | null

    profileImage: File | null | undefined
    typeOfPerson: string
    department: string
    position: string
    positionName: string
    personID: string

    title: string
    otherTitle: string
    firstname: string
    surname: string
    address: string
    phoneNumber: string

    afterSubmit?: string
}
const MAX_FILE_SIZE = 0.2 * 1000 * 1000 // 200 Kb
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export default function ProfileForm() {
    const { enqueueSnackbar } = useSnackbar()

    const ProfileScheme = Yup.object().shape({
        permission: Yup.mixed()
            .oneOf(['Admin', 'Finance', 'Supervisor', 'User'])
            .required('Privillege is required'),
        email: Yup.string().required('Email is required').email('That is not an email'),
        password: Yup.string(),
        accountStatus: Yup.mixed()
            .oneOf(['Active', 'Inactive'])
            .required('Account status is required'),
        accountExpiryDate: Yup.date()
            .typeError('Account expiry date must be valid date')
            .nullable(),
        profileImage: Yup.mixed()
            .required('Photo is is required')
            .test('fileSize', 'The file is too large', (file) => file && file.size <= MAX_FILE_SIZE)
            .test(
                'fileFormat',
                'Unsupported Format',
                (file) => file && FILE_FORMATS.includes(file.type)
            ),
        typeOfPerson: Yup.string().required('Type of person is required'),
        department: Yup.string().required('Department is required'),
        position: Yup.string().required('Position is required'),

        positionName: Yup.string(),
        personID: Yup.string().required('Person ID is required'),

        title: Yup.string().required('Title is required'),
        otherTitle: Yup.string().test('requireOtherTitle', 'Other title is required', function () {
            // TODO:
            return true
        }),
        firstname: Yup.string().required('Firstname is required'),
        surname: Yup.string().required('Surname is required'),
        address: Yup.string()
            .min(10, 'Address is required minimum 10 character')
            .required('Address is required'),
        phoneNumber: Yup.string()
            .min(10, 'Phone number is required minimum 10 character')
            .max(10, 'Phone number is required maximum 10 character')
            .required('Phone number is required'),
    })

    const defaultValues: FormValuesProps = useMemo(
        () => ({
            permission: 'User',
            email: '',
            password: '********** (Auto Genarated)',
            accountStatus: 'Active',
            accountExpiryDate: null,
            profileImage: null,
            typeOfPerson: '',
            department: '',
            position: '',

            positionName: '',
            personID: '',

            title: '',
            otherTitle: '',
            firstname: '',
            surname: '',
            address: '',
            phoneNumber: '',
        }),
        [] // TODO: Put profile data here.
    )

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(ProfileScheme),
        defaultValues,
    })

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods

    const values = watch()

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            reset()
            enqueueSnackbar('Profile has been updated.')
        } catch (error) {
            console.error(error)
        }
    }

    const handleResetValue = useCallback(async () => {
        reset(defaultValues)
    }, [reset])

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            })

            if (file) {
                setValue('profileImage', newFile)
            }
        },
        [setValue]
    )

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {!!errors.afterSubmit && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {errors.afterSubmit.message}
                    </Alert>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <RHFAutocomplete
                                    name="permission"
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    options={PRIVILLEGE_OPTION.map((option) => option)}
                                    onChange={(event, newValue) =>
                                        setValue('permission', `${newValue}`)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Privillege *"
                                            error={!!errors.permission}
                                            helperText={
                                                !!errors.permission && errors.permission.message
                                            }
                                        />
                                    )}
                                />
                                <RHFTextField name="email" label="Email *" />
                                <RHFTextField name="password" label="Password" disabled />
                                <Stack
                                    spacing={{ xs: 2, sm: 3 }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                >
                                    <RHFAutocomplete
                                        name="accountStatus"
                                        fullWidth
                                        disablePortal
                                        disableClearable
                                        options={STATUS_OPTION.map((option) => option)}
                                        onChange={(event, newValue) =>
                                            setValue('accountStatus', `${newValue}`)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Account status *"
                                                error={!!errors.accountStatus}
                                                helperText={
                                                    !!errors.accountStatus &&
                                                    errors.accountStatus.message
                                                }
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="accountExpiryDate"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <DatePicker
                                                {...field}
                                                label="Account expiry date"
                                                inputFormat="dd MMM yyyy"
                                                renderInput={(params) => (
                                                    <TextField
                                                        fullWidth
                                                        {...params}
                                                        error={!!error}
                                                        helperText={error?.message}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <Box>
                                    <RHFUploadAvatar
                                        name="profileImage"
                                        maxSize={MAX_FILE_SIZE}
                                        onDrop={handleDrop}
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
                                                <br /> max size of {fData(MAX_FILE_SIZE)}
                                            </Typography>
                                        }
                                    />
                                </Box>
                                <Stack
                                    spacing={{ xs: 2, sm: 3 }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                >
                                    <RHFAutocomplete
                                        name="typeOfPerson"
                                        fullWidth
                                        disablePortal
                                        disableClearable
                                        options={TYPEOFPERSON_OPTION.map((option) => option)}
                                        onChange={(event, newValue) => {
                                            setValue('department', '')
                                            return setValue('typeOfPerson', `${newValue}`)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Type of person *"
                                                error={!!errors.typeOfPerson}
                                                helperText={
                                                    !!errors.typeOfPerson &&
                                                    errors.typeOfPerson.message
                                                }
                                            />
                                        )}
                                    />

                                    {values.typeOfPerson === 'SciKU Student & Staff' ? (
                                        <RHFAutocomplete
                                            name="department"
                                            fullWidth
                                            disablePortal
                                            disableClearable
                                            options={DEPARTMENT_OPTION.map((option) => option)}
                                            onChange={(event, newValue) =>
                                                setValue('department', `${newValue}`)
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Department *"
                                                    error={!!errors.department}
                                                    helperText={
                                                        !!errors.department &&
                                                        errors.department.message
                                                    }
                                                />
                                            )}
                                        />
                                    ) : (
                                        <RHFTextField name="department" label="Department *" />
                                    )}
                                </Stack>

                                <Stack
                                    spacing={{ xs: 2, sm: 3 }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                >
                                    <RHFAutocomplete
                                        name="position"
                                        fullWidth
                                        disablePortal
                                        disableClearable
                                        options={POSITION_OPTION.map((option) => option)}
                                        onChange={(event, newValue) =>
                                            setValue('position', `${newValue}`)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Position *"
                                                error={!!errors.position}
                                                helperText={
                                                    !!errors.position && errors.position.message
                                                }
                                            />
                                        )}
                                    />

                                    <RHFTextField name="positionName" label="Position name" />

                                    {/* {values.typeOfPerson === 'SciKU Student & Staff' ? (
                                        <RHFAutocomplete
                                            name="department"
                                            fullWidth
                                            disablePortal
                                            disableClearable
                                            options={DEPARTMENT_OPTION.map((option) => option)}
                                            onChange={(event, newValue) =>
                                                setValue('department', `${newValue}`)
                                            }
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type of person *" />
                                            )}
                                        />
                                    ) : (
                                        <RHFTextField name="department" label="Department *" />
                                    )} */}
                                </Stack>

                                <Stack
                                    spacing={{ xs: 2, sm: 3 }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                >
                                    <Stack flex={1} spacing={{ xs: 2, sm: 3 }} direction="row">
                                        <RHFAutocomplete
                                            name="title"
                                            fullWidth
                                            disablePortal
                                            disableClearable
                                            options={TITLE_OPTION.map((option) => option)}
                                            onChange={(event, newValue) => {
                                                setValue('title', `${newValue}`)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Title *"
                                                    error={!!errors.title}
                                                    helperText={
                                                        !!errors.title && errors.title.message
                                                    }
                                                />
                                            )}
                                        />
                                        <RHFTextField name="otherTitle" label="Other title" />
                                    </Stack>
                                    <Stack
                                        spacing={{ xs: 2, sm: 3 }}
                                        direction={{ xs: 'column', sm: 'row' }}
                                        flex={1}
                                    >
                                        <RHFTextField name="firstname" label="Firstname *" />
                                        <RHFTextField name="surname" label="Surname *" />
                                    </Stack>
                                </Stack>

                                <RHFTextField name="address" label="Address *" multiline />
                                <RHFTextField name="phoneNumber" label="Phone number *" />
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1.5} flex={1} justifyContent="flex-end">
                            <Button
                                color="inherit"
                                variant="contained"
                                size="medium"
                                onClick={handleResetValue}
                            >
                                Cancel
                            </Button>

                            <LoadingButton
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="medium"
                                loading={isSubmitting}
                            >
                                Update Profile
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    )
}
