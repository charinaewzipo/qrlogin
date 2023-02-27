import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import Image from '@sentry/components/image';
import FormProvider, { RHFCheckbox, RHFTextField } from "@sentry/components/hook-form";
import ResetPasswordForm from './ResetPasswordForm';
import LogoOnlyLayout from '@ku/layouts/LogoOnlyLayout'
const ResetPassword = () => {
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(30, 0),
    [theme.breakpoints.up('md')]: {
      flexShrink: 0,
      padding: theme.spacing(30, 0),
    },
  }));

  return (
    <>
      <Head>
        <title> Login | Minimal UI</title>
      </Head>
      <LogoOnlyLayout/>
      <Container>
          <ContentStyle sx={{ textAlign: 'center' }}>
            <Stack>
              <Stack direction={"row"} justifyContent="center">
                <Box
                  component="div"
                  sx={{
                    display: 'inline-flex',
                    position: 'absolute',
                    zIndex: 9,
                    top: 127.18,
                  }}
                >
                  <Image
                    alt="ic_email_sent"
                    src={'/assets/icons/apps/ic_email_sent.png'}
                    sx={{ width: "103.32px", objectFit: "cover" }}
                    disabledEffect
                  />

                </Box>
              </Stack>
              <Stack spacing={2} sx={{ mt: 5, mb: 4, position: 'relative' }}>
                <Typography variant="h3">Request sent successfully!</Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  We've sent a 6-digit confirmation email to your email.
                  Please enter the code in below box to verify your email.
                </Typography>
              </Stack>
              <ResetPasswordForm />
            </Stack>
          </ContentStyle>
      </Container>
    </>
  )
}

export default ResetPassword
