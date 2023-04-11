import Head from 'next/head'
import { Button, Divider, Grid, Typography } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import { MotionContainer, varBounce } from '@sentry/components/animate'
import { PageNotFoundIllustration } from '@sentry/assets/illustrations'
import { m } from 'framer-motion'
import NextLink from 'next/link'
import Iconify from '@sentry/components/iconify'

NotFoundEquipment.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function NotFoundEquipment() {

    return (
        <>
            <Head>
                <title> Equipment Not Found </title>
            </Head>
            <Grid container>
                <Grid xs={6} sx={{ margin: '0 auto' }}>
                    <MotionContainer alignItems='center' sx={{  }}>
                        <m.div variants={varBounce().in}>
                            <Typography variant="h5" textAlign='center' paragraph>
                                Not Found Equipment!
                            </Typography>
                        </m.div>

                        <m.div variants={varBounce().in}>
                            <PageNotFoundIllustration
                                sx={{
                                    height: 240,
                                    my: { xs: 5, sm: 10 },
                                }}
                            />
                        </m.div>

                        <m.div variants={varBounce().in}>
                            <Typography variant='body1'whiteSpace='pre' >
                                {`The booking result not found, please recheck form your\nbooking report list.`}
                            </Typography>
                            <Typography variant='body1' sx={{ mt: 3 }}>
                                All the best,
                            </Typography>
                        </m.div>
                        <Divider sx={{ mt: 5, mb: 4 }} />
                        <NextLink href="/equipment" passHref>
                            <Button size="small" fullWidth color='inherit' variant="outlined">
                                <Iconify icon="eva:chevron-left-fill" />Equipment List
                            </Button>
                        </NextLink>
                    </MotionContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default NotFoundEquipment
