// next
import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import ForgotPassword from './ForgotPassword'
import Image from '@sentry/components/image';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {

    const StyledRoot = styled('main')(() => ({
        height: '100%',
        display: 'flex',
        position: 'relative',
    }));

    const StyledContent = styled('div')(({ theme }) => ({
        width: 480,
        margin: 'auto',
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        padding: theme.spacing(30, 0),
        [theme.breakpoints.up('md')]: {
          flexShrink: 0,
          padding: theme.spacing(30, 0),
        },
    }));
      
      
    return (
        <>
            <Head>
                <title> Forgot password | KU </title>
            </Head>

            <StyledRoot>
            <Box
                component="div"
                sx={{
                    display: 'inline-flex',
                    position: 'absolute',
                    width: 400,
                    height: 56,
                    zIndex: 9,
                    mt: { xs: 1.5, md: 5 },
                    ml: { xs: 2, md: 5 },
                }}
            >
                <Image
                    alt="Logo"
                    src={'/assets/images/logo/Logo.png'}
                    disabledEffect
                />
            </Box>

                <StyledContent>
                    <Stack sx={{ width: 1 }}>
                        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                            <Typography variant="h4" align="center">Forgot your password?</Typography>
                            <Stack direction="column" spacing={0.5}>
                                <Typography variant="body2" align="center">Please enter the email address associated with your account,</Typography>
                                <Typography variant="body2" align="center">and we'll email you a link to reset your password.</Typography>
                            </Stack>
                        </Stack>
                        <ForgotPassword />
                    </Stack>
                </StyledContent>
            </StyledRoot>
        </>
    )
}
