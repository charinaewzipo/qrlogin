// next
import { Stack, Typography } from '@mui/material'
import Head from 'next/head'
import ForgotPassword from './ForgotPasswordForm'
import LoginLayout from '@ku/layouts/login'

// ----------------------------------------------------------------------

ForgotPasswordPage.getLayout = (page: React.ReactElement) => <LoginLayout> {page} </LoginLayout>

export default function ForgotPasswordPage() {
    return (
        <>
            <Head>
                <title> Forgot password | KU </title>
            </Head>

            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4" align="center">Forgot your password?</Typography>
                <Stack direction="column" spacing={0.5}>
                    <Typography variant="body2" align="center">Please enter the email address associated with your account,</Typography>
                    <Typography variant="body2" align="center">and we'll email you a link to reset your password.</Typography>
                </Stack>
            </Stack>
            <ForgotPassword />
        </>
    )
}
