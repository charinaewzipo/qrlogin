import { Box, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import Image from '@sentry/components/image';
import FormProvider, { RHFCheckbox, RHFTextField } from "@sentry/components/hook-form";
import ResetPasswordForm from './ResetPasswordForm';


const ResetPassword = () => {
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
        <title> Login | Minimal UI</title>
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

        <StyledContent >
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
              <Typography variant="h3" textAlign="center">Request sent successfully!</Typography>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="body1" textAlign="center">We've sent a 6-digit confirmation email to your email. Please enter the code in below box to verify your email.</Typography>
              </Stack>
            </Stack>
            <ResetPasswordForm />
          </Stack>
        </StyledContent>
      </StyledRoot>
    </>
  )
}

export default ResetPassword
