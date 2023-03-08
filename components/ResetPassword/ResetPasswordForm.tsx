import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ErrorOption, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, IconButton, InputAdornment, Stack, Typography, useTheme, alpha, OutlinedInput } from '@mui/material'
import FormProvider, { RHFTextField } from "@sentry/components/hook-form";
import { FormHelperText } from '@mui/material';
import { useRouter } from 'next/router';
import { get, isEmpty } from 'lodash';
import { RESET_PASSWORD_SUCCESS_PATH } from '@ku/constants/routes';



type FormValuesProps = {
    email: string
    password: string
    confirmPassword: string;
    afterSubmit?: string
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;

}

type ValueNames = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isReSend, setIsReSend] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const router = useRouter()
    const theme = useTheme()

    useEffect(() => {
        const target = document.querySelector('input.field-code');
        target?.addEventListener('paste', handlePaste);
        return () => {
            target?.removeEventListener('paste', handlePaste);
        };
    }, []);

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


    const Schema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Confirm password not match with new password'),
        code1: Yup.string().required('Code is required'),
        code2: Yup.string().required('Code is required'),
        code3: Yup.string().required('Code is required'),
        code4: Yup.string().required('Code is required'),
        code5: Yup.string().required('Code is required'),
        code6: Yup.string().required('Code is required'),

    })

    const defaultValues = {
        email: isEmpty(router.query) ? '' : get(router, "query.id", '').toString(),
        password: '',
        confirmPassword: '',
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',

    }

    const methods = useForm<FormValuesProps>({
        mode: 'all',
        resolver: yupResolver(Schema),
        defaultValues,
    })

    const {
        reset,
        control,
        setError,
        handleSubmit,
        setValue,
        getValues,

        formState: { errors },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        console.log("data", data)

        router.push({ pathname: RESET_PASSWORD_SUCCESS_PATH, query: { id: data.email } })
        const errorOptions: ErrorOption = {
            message: "errorResponse.data || errorResponse.devMessage"
        }
        setError('afterSubmit', errorOptions)

    }
    const focusPrevInput = () => {
        const prevfield = document.querySelector(`input[name=code${currentIndex - 1}]`);
        if (prevfield !== null) {
            (prevfield as HTMLElement).focus();
            setCurrentIndex(() => currentIndex - 1)
        }
    }
    const focusNextInput = () => {
        const nextfield = document.querySelector(`input[name=code${currentIndex + 1}]`);
        if (nextfield !== null) {
            (nextfield as HTMLElement).focus();
            setCurrentIndex(() => currentIndex + 1)
        }
    }

    const handleOnKeyDown =
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const pressedKey = e.key;
            switch (pressedKey) {
                case 'Backspace':
                case 'Delete': {
                    e.preventDefault();
                    const fieldIndex = `code${currentIndex}`;
                    const value = getValues()
                    if (value[fieldIndex] !== '') {
                        setValue(fieldIndex as ValueNames, '');
                    } else {
                        focusPrevInput();
                    }
                    break;
                }
                case 'ArrowLeft': {
                    e.preventDefault();
                    focusPrevInput();
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault();
                    focusNextInput();
                    break;
                }
                default: {
                    if (pressedKey.match(/^[A-Za-z]$/)) {
                        e.preventDefault();
                    }
                    break;
                }
            }
        }

    const handleClickResend = () => {
        if (!isReSend) {
            setIsReSend(true)
            setMinutes(10)

        }
    }
    const handlePaste = (event: any) => {
        let data = event.clipboardData.getData('text');
        data = data.split('');
        [].forEach.call(document.querySelectorAll('.field-code'), (node: any, index) => {
            node.value = data[index];
            const fieldIndex = `code${index + 1}`;
            setValue(fieldIndex as ValueNames, data[index]);
        });
        event.preventDefault();
    };

    const handleChangeWithNextField = (
        event: React.ChangeEvent<HTMLInputElement>,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    ) => {
        const { maxLength, value, name } = event.target;
        const fieldIndex = name.replace('code', '');
        const fieldIntIndex = Number(fieldIndex);
        if (value.length >= maxLength) {
            if (fieldIntIndex < 6) {
                focusNextInput()
            }
        }
        handleChange(event);
    };
    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        event.target.placeholder = ""
        event.target.select();
        const fieldIndex = event.target.name.replace('code', '');
        const fieldIntIndex = Number(fieldIndex);
        setCurrentIndex(fieldIntIndex)

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

                <Stack direction="row" spacing={2} justifyContent="center">
                    {['code1', 'code2', 'code3', 'code4', 'code5', 'code6'].map((name, index) => (
                        <Controller
                            key={name}
                            name={`code${index + 1}` as ValueNames}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <OutlinedInput
                                    {...field}
                                    error={!!error}
                                    autoFocus={index === 0}
                                    placeholder="-"
                                    onFocus={handleOnFocus}
                                    onBlur={(event) => event.target.placeholder = "-"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        handleChangeWithNextField(event, field.onChange)
                                    }
                                    onKeyDown={handleOnKeyDown}
                                    inputProps={{
                                        className: 'field-code',
                                        maxLength: 1,
                                        sx: {
                                            p: 0,
                                            textAlign: 'center',
                                            width: { xs: 36, sm: 56 },
                                            height: { xs: 36, sm: 56 },
                                        },
                                    }}
                                    sx={{
                                        // "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        //     borderColor: alpha(theme.palette.grey[500], 0.32)
                                        // },
                                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: alpha(theme.palette.grey[500], 0.32)
                                        },
                                    }}
                                />


                            )}
                        />
                    )
                    )}
                </Stack>

                {(!!errors.code1 ||
                    !!errors.code2 ||
                    !!errors.code3 ||
                    !!errors.code4 ||
                    !!errors.code5 ||
                    !!errors.code6) && (
                        <FormHelperText error sx={{ px: 2 }}>
                            OTP is required
                        </FormHelperText>
                    )}

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