// next
import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import LoginForm from './LoginForm'
import Image from '@sentry/components/image';

import LoginLayout from '@ku/layouts/login'

// ----------------------------------------------------------------------

LoginPage.getLayout = (page: React.ReactElement) => <LoginLayout> {page} </LoginLayout>

export default function LoginPage() {
    return (
        <>
            <Head>
                <title> Login | KU </title>
            </Head>

            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Sign in to Scientific Equipment Booking</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">Enter your details below</Typography>
                </Stack>
            </Stack>
            <LoginForm />
        </>
    )
}
