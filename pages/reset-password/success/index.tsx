import { Box, Button, Stack, styled, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import React, { useEffect } from 'react'
import Image from '@sentry/components/image';
import { LOGIN_PATH } from '@unfinity/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { get, isEmpty } from 'lodash';

const ResetPassword = () => {
  const theme = useTheme()
  const router = useRouter()
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

  useEffect(() => {
    console.log("router", router.query)
  }, [])

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
            <Stack spacing={2} sx={{ position: 'relative' }} >
              <Typography variant="h5" textAlign="center">Your password has been reset!</Typography>
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Image
                  alt="Artboard Copy"
                  src={'/assets/illustrations/characters/Artboard Copy.png'}
                  sx={{ objectFit: "cover", my: 5, width: 327.33 }}
                  disabledEffect
                />
              </Box>

              <Stack direction="column" spacing={0.5}>
                <Typography variant="body1" >Thanks for your interest.</Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main }} >{isEmpty(router.query) ? '' : get(router, "query.id", '').toString()}</Typography>
                <Box component="div"
                  sx={{
                    display: 'flex',
                  }}>
                  <Typography variant="body1" sx={{ my: 2 }}>We have sent detail to your inbox to confirm this action.</Typography>
                </Box>
                <Typography variant="body1" >All the best,</Typography>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: 'flex',
                mt: 4,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
            </Box>

            <Button variant="outlined"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3
              }}
            >
              <Image
                alt="Icon Base"
                src={'/assets/icons/direction/Icon Base.png'}
                sx={{ objectFit: 'cover', height: 20.67, mr: 1 }}
              />
              <Link
                href={{
                  pathname: LOGIN_PATH,
                }}
                style={{ textDecoration: 'none', color: 'inherit' }} >   Back to Login page</Link>

            </Button>



          </Stack>
        </StyledContent>
      </StyledRoot>
    </>
  )
}

export default ResetPassword
