import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { ErrorOption, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, IconButton, InputAdornment, Stack, Button, Typography, Box, useTheme, alpha } from '@mui/material'
import FormProvider, { RHFTextField } from "@sentry/components/hook-form";
import { FormHelperText } from '@mui/material';
import { useRouter } from 'next/router';
import { get, isEmpty } from 'lodash';
import { RESET_PASSWORD_SUCCESS_PATH } from '@ku/constants/routes';
import { OTPInputComponent } from '@ku/components/OTP-input';

type FormValuesProps = {
    email: string
    password: string
    afterSubmit?: string
}

function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [otp, setOtp] = useState('')
    const [isErrorOtp, setIsErrorOtp] = useState(false)
    const [isReSend, setIsReSend] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const router = useRouter()
    const theme = useTheme()

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        if (minutes === 0 && seconds === 0) setIsReSend(false)
        return () => {
            clearInterval(myInterval);
        };
    },);

    useEffect(() => {
        console.log("router", router.query)
    }, [])
    useEffect(() => {
        if (isErrorOtp && otp.length === 6) {
            setIsErrorOtp(false)
        }
    }, [otp])

    const Schema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Confirm password not match with new password'),
    })

    const defaultValues = {
        email: isEmpty(router.query) ? '' : get(router, "query.id", '').toString(),
        password: '',
        confirmPassword: '',
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(Schema),
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
        console.log("data", data)
        if (!isErrorOtp) {
            router.push({ pathname: RESET_PASSWORD_SUCCESS_PATH, query: { id: data.email } })
            const errorOptions: ErrorOption = {
                message: "errorResponse.data || errorResponse.devMessage"
            }
            setError('afterSubmit', errorOptions)
        }
    }

    const handleClickResend = () => {
        if (!isReSend) {
            setIsReSend(true)
            setMinutes(10)
            // setSeconds(5)
        }
    }
    const countdownTimer = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                {minutes === 0 && seconds === 0
                    ? <></>
                    : <Alert severity="success">Resent code complete; you can resend again in <strong>{countdownTimer}</strong></Alert>
                }
                <RHFTextField name="email" label="Email address" disabled={true} />
                <Stack sx={{ justifyContent: "center" }}>
                    <OTPInputComponent
                        autoFocus
                        isNumberInput
                        length={6}
                        style={{ margin: "0 auto" }}
                        inputStyle={{
                            textAlign: "center",
                            margin: "0 0.5rem",
                            border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
                            borderRadius: "8px",
                            width: "56px",
                            height: "56px",
                            fontSize: "16px",
                            color: theme.palette.grey[800],
                            fontWeight: "400",
                            backgroundColor: "transparent",
                            outline: "none"
                        }}
                        onChangeOTP={(otp) => { setOtp(otp) }}
                        hasErrored={isErrorOtp}
                    />
                </Stack>
                {isErrorOtp &&
                    <Box >
                        <FormHelperText sx={{ color: theme.palette.error.main, ml: 2, mt: -1 }}>OTP is required</FormHelperText>
                    </Box>}
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
                <RHFTextField
                    name="confirmPassword"
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <LoadingButton
                onClick={() => {
                    if (otp.length < 6) {
                        setIsErrorOtp(true)
                    }
                }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ my: 3 }}

            >
                Change Password
            </LoadingButton>

            <Stack direction={'row'} spacing={0.5} justifyContent="center" >
                <Typography variant='body2'>Don’t have a code? </Typography>
                <Typography variant='subtitle2' sx={{ color: `${isReSend ? theme.palette.action.disabled : "primary.main"}`, cursor: `${isReSend ? "default" : "pointer"}` }} onClick={handleClickResend}> Resend code</Typography>
            </Stack>

        </FormProvider >
    )
}

export default ResetPasswordForm