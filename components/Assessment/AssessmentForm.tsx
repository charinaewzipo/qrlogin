import * as Yup from 'yup'
import { useCallback } from 'react'
// next
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Grid, Card, Stack, Button, TextField, Alert } from '@mui/material'
import { ASSESSMENT_PATH } from '@ku/constants/routes'
import { useSnackbar } from '@sentry/components/snackbar'
import FormProvider, { RHFTextField, RHFAutocomplete } from '@sentry/components/hook-form'
import { DatePicker } from '@mui/x-date-pickers'

const STATUS_OPTION = ['Active', 'Inactive']

export type FormValuesProps = {
    assessmentName: string
    link: string
    startDate: Date | null
    endDate: Date | null
    status: string
    afterSubmit?: string
}

export default function AssessmentForm() {
    const { push } = useRouter()

    const { enqueueSnackbar } = useSnackbar()

    const AssessmentScheme = Yup.object().shape({
        assessmentName: Yup.string().required('Assessment name is required'),
        link: Yup.string()
            .required('Assessment link is required')
            .url('Assessment link must be valid a url format e.g. https://www.google.com'),
        startDate: Yup.date().nullable(), //.required('Start date is required'),
        endDate: Yup.date().nullable(), //.required('End date is required').min(Yup.ref('startDate'), 'End date must be later than start date'),
        status: Yup.string().required('Status is required'),
        afterSubmit: Yup.string(),
    })

    const defaultValues = {
        assessmentName: '',
        link: '',
        startDate: null,
        endDate: null,
        status: 'Active',
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(AssessmentScheme),
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
            enqueueSnackbar('Create assessment success.')
            push(ASSESSMENT_PATH)
        } catch (error) {
            console.error(error)
        }
    }

    const handleResetValue = useCallback(async () => {
        reset(defaultValues)
    }, [reset])

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {!!errors.afterSubmit && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Internet error
                    </Alert>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <RHFTextField name="assessmentName" label="Assessment name *" />

                                <RHFTextField name="link" label="Link *" />

                                <Stack
                                    spacing={{ xs: 2, sm: 3 }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                >
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <DatePicker
                                                {...field}
                                                label="Start assessment date"
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

                                    <Controller
                                        name="endDate"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <DatePicker
                                                {...field}
                                                label="End assessment date"
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

                                <RHFAutocomplete
                                    name="status"
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    options={STATUS_OPTION.map((option) => option)}
                                    onChange={(event, newValue) =>
                                        setValue('status', `${newValue}`)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Status" />
                                    )}
                                />
                                <Stack direction="row" spacing={1.5} alignSelf="flex-end">
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
                                        Create Assessment
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    )
}
