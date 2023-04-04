import { Box, Divider, Stack, styled, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import React, { useEffect } from 'react'
import Image from '@sentry/components/image'
import { LOGIN_PATH } from '@ku/constants/routes'
import { useRouter } from 'next/router'
import { get, isEmpty } from 'lodash'
import LogoOnlyLayout from '@ku/layouts/LogoOnlyLayout'
import { LoadingButton } from '@mui/lab'
import Iconify from '@sentry/components/iconify/Iconify'

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

  useEffect(() => {
    console.log('router', router.query)
  }, [])

  return (
    <>
      <Head>
        <title> Success | KU</title>
      </Head>

      <LogoOnlyLayout />

      <ContentStyle>
        <Stack>
          <Stack spacing={2} sx={{ position: 'relative', mt: 12 }}>
            <Typography variant="h5" textAlign="center">
              Thank you for your booking!
            </Typography>
            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image
                alt="Artboard Copy"
                src={'/assets/illustrations/illustration_order_complete.svg'}
                sx={{ objectFit: 'cover', my: 5, width: 327.33 }}
                disabledEffect
              />
            </Box>

            <Stack direction="column" spacing={0.5}>
              <Typography variant="body1">Thanks for placing booking order </Typography>
              <Stack direction={'row'}>
                <Typography variant="body1">Booking number:
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main, textDecoration: 'underline', mx: 0.5, }}>
                  0170400061
                </Typography>
              </Stack>
              <Box >
                <Typography variant="body1" sx={{ mt: 2 }}>
                  If you have any question or queries then fell to get in
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  contact us.
                </Typography>
              </Box>

              <Typography variant="body1">All the best,</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ mt: 4 }} />
          <Stack justifyContent={'space-between'} direction={'row'} spacing={2} sx={{ my: 3 }}>
            <LoadingButton
              size="medium"
              type="submit"
              variant="outlined"
              color='inherit'
              onClick={() => router.push(LOGIN_PATH)}
            >
              <Image
                alt="Icon Base"
                src={'/assets/icons/direction/Icon Base.png'}
                sx={{ objectFit: 'cover', height: 20.67, mr: 1 }}
              />
              Continue Booking
            </LoadingButton>
            <LoadingButton
              size="medium"
              variant="contained"
              color='success'
            >
              <Image
                alt="Icon booking"
                src={'/assets/icons/files/ic_booking.svg'}
                sx={{ objectFit: 'cover', height: 20.67, mr: 1 }}
              />
              My Booking
            </LoadingButton>
          </Stack>

        </Stack>
      </ContentStyle>
    </>
  )
}

export default ResetPassword
