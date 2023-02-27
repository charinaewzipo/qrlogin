
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
    // const [showPassword, setShowPassword] = useState(false)
    // const [openPleaseContact, setOpenPleaseContact] = useState(false)

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
            {/* <Link variant="subtitle1" href={FORGOT_PASSWORD_PATH}> Register </Link> */}
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

            {/* <ConfirmDialog
                open={openPleaseContact}
                textCancel="Try it now"
                onClose={()=>{
                    setOpenPleaseContact(false)
                }}
                title="Reset password!"
                content={
                    <Box>
                        {[
                            {sx:{mb: 2}, text:`Hi ${getValues('email')},`},
                            {sx:{my: 2},text:`We received a request to reset the password for your account. If you did not request a passowrd reset, please`},
                            {sx:{my: 2},text:`ignore this email or reply to let us know. This password reset code is only valid for the next 10 minutes.`,},
                            {sx:{mt: 1},text:`To reset your password, you can copy this 6-ditgit code to reset password page to confirm below.`,},
                            {sx:{mb: 1},text:`653453`,},
                            {sx:{my: 2},text:`Tel. 02 562 5555 ext. 646154 646156`,},
                            {sx:{my: 2},text:`Office hour: 8.30 - 16.30`,},
                        ].map((i,index)=><Typography key={'contact'+index} variant="body1" sx={{...{color: (theme) => palette(theme.palette.mode).text.secondary},...i.sx}}>{i.text}</Typography>)}
                    </Box>
                }
                action={<></>}
            /> */}
        </FormProvider>
    )
}

export default ForgotPasswordForm