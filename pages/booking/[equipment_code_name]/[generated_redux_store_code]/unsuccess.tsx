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
        <title> Unsuccess | KU</title>
      </Head>

      <LogoOnlyLayout />

      <ContentStyle>
        <Stack>
          <Stack spacing={2} sx={{ position: 'relative', mt: 12 }}>
            <Typography variant="h5" textAlign="center">
              Sorry, date and time are unavailable.
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
                src={'/assets/illustrations/illustration_coming_soon.svg'}
                sx={{ objectFit: 'cover', my: 5, width: 327.33 }}
                disabledEffect
              />
            </Box>

            <Stack direction="column" spacing={0.5}>
              <Typography variant="body1">Thanks for placing booking order</Typography>
              <Stack direction={'row'}>
                <Typography variant="body1">Booking date:
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main, textDecoration: 'underline', mx: 0.5, }}>
                  19/08/2022
                </Typography>
              </Stack>
              <Stack direction={'row'}>
                <Typography variant="body1">Booking time:
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main, textDecoration: 'underline', mx: 0.5, }}>
                  18:00 - 18:59, 19:00-19:59
                </Typography>
              </Stack>
              <Stack direction={'row'}>
                <Typography variant="body1">Status:
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.error.main, mx: 0.5, }}>
                  Unavailable
                </Typography>
              </Stack>
              <Box >
                <Typography variant="body1" sx={{ mt: 2 }}>
                  You can change date and time, If you have any question
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  or queries then fell to get in contact us.
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
              Equipement List
            </LoadingButton>
            <LoadingButton
              size="medium"
              variant="contained"
              color='warning'
              startIcon={<Iconify icon="eva:edit-fill" />}
            >
              Edit Booking
            </LoadingButton>
          </Stack>

        </Stack>
      </ContentStyle>
    </>
  )
}

export default ResetPassword
