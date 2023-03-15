import * as Yup from 'yup'
// next
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Grid, Card, Stack, Alert } from '@mui/material'
import { useSnackbar } from '@sentry/components/snackbar'
import FormProvider, { RHFTextField } from '@sentry/components/hook-form'

export type FormValuesProps = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
    afterSubmit?: string
}

export default function ProfileResetPasswordForm() {
    const { enqueueSnackbar } = useSnackbar()

    const privacyPoliciesScheme = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required'),
        confirmPassword: Yup.string().required('Confirm password is required'),
        afterSubmit: Yup.string(),
    })

    const defaultValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(privacyPoliciesScheme),
        defaultValues,
    })

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods

    const values = watch() // TODO: Remove this, If not using

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            reset()
            enqueueSnackbar('Password has been updated.')
        } catch (error) {
            // TODO: Handle this after integrate api.
            setValue('afterSubmit', 'Internal Server error.')
            console.error(error)
        }
    }

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
                        <Card>
                            <Stack spacing={3} sx={{ p: 3 }}>
                                <RHFTextField type="password" name="oldPassword" label="Old password" />
                                <RHFTextField type="password" name="newPassword" label="New password" />
                                <RHFTextField type="password" name="confirmPassword" label="Confirm new password" />
                                <Stack direction="row" spacing={1.5} alignSelf="flex-end">
                                    <LoadingButton
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        loading={isSubmitting}
                                    >
                                        Save Changes
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
