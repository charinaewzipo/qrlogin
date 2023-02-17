// next
import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import LoginForm from './components/LoginForm'
import Image from '@sentry/components/image';

// ----------------------------------------------------------------------

export default function LoginPage() {

    const ContentStyle = styled('div')(({ theme }) => ({
        maxWidth: 480,
        margin: 'auto',
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(12, 0),
    }))

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
                <title> Login | KU </title>
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
                            <Typography variant="h4">Sign in to Scientific Equipment Booking</Typography>
                            <Stack direction="row" spacing={0.5}>
                                <Typography variant="body2">Enter your details below</Typography>
                            </Stack>
                        </Stack>
                        <LoginForm />
                    </Stack>
                </StyledContent>
            </StyledRoot>
        </>
    )
}
