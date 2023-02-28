
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { ErrorOption, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Stack } from '@mui/material'
import FormProvider, { RHFTextField } from "@sentry/components/hook-form";
import router from 'next/router'

type FormValuesProps = {
    email: string
    afterSubmit?: string
}

function ForgotPasswordForm() {
    
    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    })

    const defaultValues = {
        email: '',
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues,
    })

    const {
        setError,
        handleSubmit,
        formState: { errors },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        const errorOptions: ErrorOption = {
            message: "3 Attempt forgot password request"
        }
        // setOpenPleaseContact(true)
        setError('afterSubmit', errorOptions)
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <RHFTextField name="email" label="Email address" />
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                sx={{mt:2}}
                variant="contained"
                // loading={authenticationStore.isFetching}
            >
                Reset Password
            </LoadingButton>
            <LoadingButton
                fullWidth
                size="large"
                type="button"
                variant="text"
                sx={{mt:2}}
                onClick={()=>{
                    router.back()
                }}
                // loading={authenticationStore.isFetching}
            >
                Back
            </LoadingButton>
        </FormProvider>
    )
}

export default ForgotPasswordForm