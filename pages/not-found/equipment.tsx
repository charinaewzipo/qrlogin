import Head from 'next/head'
import { Button, Divider, Grid, Typography } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import { MotionContainer, varBounce } from '@sentry/components/animate'
import { PageNotFoundIllustration } from '@sentry/assets/illustrations'
import { m } from 'framer-motion'
import NextLink from 'next/link'
import Iconify from '@sentry/components/iconify'
import { EQUIPMENT_PATH } from '@ku/constants/routes'

NotFoundEquipment.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

const constant = {
    bodyText: `The equipment result not found, please recheck form\nyour equipment report list.`,
    buttonText: `Equipment List`,
    allTheBest: `All the best,`,
    notFound: `Not Found Equipment!`,
}

export function NotFoundEquipment() {

    return (
        <>
            <Head>
                <title> Equipment Not Found </title>
            </Head>
            <Grid container>
                <Grid item xs={8} sm={6} md={4} sx={{ margin: '0 auto' }}>
                    <MotionContainer alignItems='center'>
                        <m.div variants={varBounce().in}>
                            <Typography variant="h5" textAlign='center' paragraph>
                                {constant.notFound}
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
                            <Typography variant='body1'>
                                {constant.bodyText}
                            </Typography>
                            <Typography variant='body1' sx={{ mt: 3 }}>
                                {constant.allTheBest}
                            </Typography>
                        </m.div>
                        <Divider sx={{ mt: 5, mb: 3 }} />
                        <NextLink href={EQUIPMENT_PATH} passHref>
                            <Button fullWidth color='inherit' variant="outlined">
                                <Iconify icon="eva:chevron-left-fill" />{constant.buttonText}
                            </Button>
                        </NextLink>
                    </MotionContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default NotFoundEquipment
