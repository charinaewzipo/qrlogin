import { useState } from 'react';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { ErrorOption, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import ConfirmDialog from './ConfirmDialog';
import { yupResolver } from '@hookform/resolvers/yup'
import { FORGOT_PASSWORD_PATH } from '@unfinity/constants/routes'
import { Alert, IconButton, InputAdornment, Stack, Link, Button, Typography, Box } from '@mui/material'
import FormProvider, { RHFCheckbox, RHFTextField } from "@sentry/components/hook-form";
import palette from '@sentry/theme/palette';

type FormValuesProps = {
    email: string
    password: string
    remember: boolean
    afterSubmit?: string
}

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [openPleaseContact, setOpenPleaseContact] = useState(false)

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        remember: Yup.boolean(),
    })

    const defaultValues = {
        email: '',
        password: '',
        remember: false,
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    })

    const {
        reset,
        setError,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        const errorOptions: ErrorOption = {
            message: "errorResponse.data || errorResponse.devMessage"
        }
        setOpenPleaseContact(true)
        setError('afterSubmit', errorOptions)
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <RHFCheckbox name="remember" label="Remember me" />
                <Link variant="subtitle1" href={FORGOT_PASSWORD_PATH}>
                    Forgot password? 
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                // loading={authenticationStore.isFetching}
            >
                Login
            </LoadingButton>
            {/* <Link variant="subtitle1" href={FORGOT_PASSWORD_PATH}> Register </Link> */}
            <LoadingButton
                fullWidth
                size="large"
                type="button"
                variant="text"
                sx={{mt:2}}
                onClick={()=>{

                }}
                // loading={authenticationStore.isFetching}
            >
                Register
            </LoadingButton>

            <ConfirmDialog
                open={openPleaseContact}
                textCancel="Try it now"
                onClose={()=>{
                    setOpenPleaseContact(false)
                    setValue('password','')
                }}
                title="Expiry account!"
                content={
                    <Box>
                        {[
                            {sx:{mb: 2}, text:`Hi ${getValues('email')},`},
                            {sx:{my: 2},text:`Please contact Scientific Equipment Center.`},
                            {sx:{my: 2},text:`fsciquip_center@ku.ac.th`,},
                            {sx:{mt: 1},text:`50 Ngamwongwan Rd Ladyao,`,},
                            {sx:{mb: 1},text:`Chatuchak, Bankok 10900 Thailand.`,},
                            {sx:{my: 2},text:`Tel. 02 562 5555 ext. 646154 646156`,},
                            {sx:{my: 2},text:`Office hour: 8.30 - 16.30`,},
                        ].map((i,index)=><Typography key={'contact'+index} variant="body1" sx={{...{color: (theme) => palette(theme.palette.mode).text.secondary},...i.sx}}>{i.text}</Typography>)}
                    </Box>
                }
                action={<></>}
            />
        </FormProvider>
    )
}

export default LoginForm