import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Container, Typography } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { AnalyticsWidgetSummary } from '../../components/Dashboard/analytics'
import { useTranslation } from 'react-i18next'
import Iconify from '@sentry/components/iconify'
Index.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function Index() {
    const theme = useTheme()
    const { t } = useTranslation()

    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const permission: PERMISSION = 'Supervisor'

    const progress = (
        <m.div
            style={{
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                zIndex: 1999,
                position: 'fixed',
                transformOrigin: '0%',
                backgroundColor: theme.palette.primary.main,
                scaleX,
            }}
        />
    )

    return (
        <>
            <Head>
                <title>Dashboard | KU</title>
            </Head>
            {progress}
            <Container>
                <Box
                    sx={{
                        overflow: 'hidden',
                        position: 'relative',
                        bgcolor: 'background.default',
                    }}
                >
                    <div className={styles.page}>
                        <div className="wrapper">
                            <CustomBreadcrumbs
                                heading="Dashboard"
                                links={[{ name: 'Dashboard' }, { name: permission }]}
                                sx={{ mt: 3, mb: 0, height: 72 }}
                            />

                            {(permission as PERMISSION) === 'Admin' ? (
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Today"
                                            total={2}
                                            color="grey"
                                            icon={'mdi:bag-personal'}
                                            units="Booking"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={581}
                                            color="warning"
                                            icon={'icon-park-outline:done-all'}
                                            units="Booking"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Confirm"
                                            total={18}
                                            icon={'ic:baseline-verified'}
                                            units="Booking"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:credit-card-filled'}
                                            units="Booking"
                                        />
                                    </Grid>
                                </Grid>
                            ) : (permission as PERMISSION) === 'Finance' ? (
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="grey"
                                            icon={'ant-design:credit-card-filled'}
                                            units="Booking"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All booking"
                                            total={128}
                                            color="info"
                                            icon={'mdi:bag-personal'}
                                            units="Booking"
                                        />
                                    </Grid>
                                </Grid>
                            ) : (permission as PERMISSION) === 'Supervisor' ? (
                                <>
                                    <div style={{ marginTop: 40 }}>
                                        <Typography
                                            fontSize={16}
                                            fontWeight={600}
                                            color={theme.palette.grey[600]}
                                        >
                                            Supervisor Code
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            <Typography
                                                fontSize={32}
                                                fontWeight={700}
                                                color={theme.palette.grey[800]}
                                                noWrap
                                                component="span"
                                            >
                                                AA5643GN
                                            </Typography>
                                            <Iconify
                                                marginLeft={2}
                                                icon={'material-symbols:content-copy-rounded'}
                                                width={18}
                                                height={18}
                                            />
                                        </div>
                                    </div>

                                    <Grid container spacing={2} sx={{ mt: 3 }}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <AnalyticsWidgetSummary
                                                title="All Booking"
                                                total={5}
                                                color={'grey'}
                                                icon={'mdi:bag-personal'}
                                                units="Booking"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={3}>
                                            <AnalyticsWidgetSummary
                                                title="Waiting for payment"
                                                total={12}
                                                color="info"
                                                icon={'ant-design:credit-card-filled'}
                                                units="Booking"
                                            />
                                        </Grid>
                                    </Grid>

                                    <div style={{ marginTop: 40 }}>
                                        <Typography variant="subtitle1" noWrap color="text.primary">
                                            Students/Staff
                                            <Typography
                                                variant="subtitle1"
                                                color={theme.palette.grey[500]}
                                                noWrap
                                                component="span"
                                            >
                                                {' '}
                                                (Under control)
                                            </Typography>
                                        </Typography>
                                    </div>

                                    <Grid container spacing={2} sx={{ mt: 3 }}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <AnalyticsWidgetSummary
                                                title="Student"
                                                total={450}
                                                color={'grey'}
                                                icon={'fa6-solid:user-group'}
                                                units="Users"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={3}>
                                            <AnalyticsWidgetSummary
                                                title="All Booking"
                                                total={320}
                                                color="grey"
                                                icon={'mdi:bag-personal'}
                                                units="Booking"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={3}>
                                            <AnalyticsWidgetSummary
                                                title="Pending"
                                                total={15}
                                                color="warning"
                                                icon={'icon-park-outline:done-all'}
                                                units="Booking"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={3}>
                                            <AnalyticsWidgetSummary
                                                title="Waiting for payment"
                                                total={12}
                                                color="info"
                                                icon={'ant-design:credit-card-filled'}
                                                units="Booking"
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All Booking"
                                            total={5}
                                            color="grey"
                                            icon={'mdi:bag-personal'}
                                            units="Booking"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={1}
                                            color="warning"
                                            icon={'icon-park-outline:done-all'}
                                            units="Booking"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={0}
                                            color={'info'}
                                            icon={'ant-design:credit-card-filled'}
                                            units="Booking"
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default Index
