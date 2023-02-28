import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Container } from '@mui/material'
import AuthorizedLayout from '@unfinity/layouts/authorized'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumb'
import { AnalyticsWidgetSummary } from '../components/analytics'
import { useTranslation } from "react-i18next";

Index.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function Index() {
    const theme = useTheme()
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const permission = 'Finance'

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
                <title>Unfinity | Dashboard</title>
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
                            <HeaderBreadcrumbs
                                heading="Dashboard"
                                links={[{ name: 'Dashboard' }, { name: permission }]}
                                sx={{ mt: 3, mb: 0, height: 72 }}
                            />

                            {permission === 'Admin' ? (
                                <Grid container spacing={2} sx={{ mt: 5 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Today"
                                            total={2}
                                            // color="grey"
                                            icon={'ant-design:android-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={581}
                                            color="warning"
                                            icon={'ant-design:apple-filled'}
                                            units='Booking'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Confirm"
                                            total={18}
                                            icon={'ant-design:windows-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:bug-filled'}
                                            units='Booking'
                                        />
                                    </Grid>
                                </Grid>
                            ) : permission === 'Finance' ? (
                                <Grid container spacing={2} sx={{ mt: 5 }}>
                    
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:bug-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All booking"
                                            total={128}
                                            color='secondary'
                                            icon={'ant-design:windows-filled'}
                                            units='Booking'
                                        />
                                    </Grid>
                                </Grid>
                            ) : permission === 'Supervisor' ? (
                                <>
                                <div style={{marginTop:40}}>
                                {/* {t("en.only_admin_can_see_this_item")} */}
                                <p style={{ fontSize:16,fontWeight:600,color:'#637381'}}>Supervisor Code</p>
                                <p style={{ fontSize:32,fontWeight:700,color:'#212B36'}}>AA5643GN</p>
                                </div>
                                <Grid container spacing={2} sx={{ mt: 5 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All Booking"
                                            total={5}
                                            color={'secondary'}
                                            icon={'ant-design:windows-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:bug-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                  
                                </Grid>

                                <div style={{marginTop:40}}>
                                    <span style={{ fontSize:16,fontWeight:600,color:'#212B36'}}>Students/Staff</span> 
                                    <span style={{fontSize:16,fontWeight:600,color:'#919EAB'}}> (Under control)</span>
                                    </div>
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                 
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Student"
                                            total={450}
                                            color={'secondary'}
                                            icon={'ant-design:windows-filled'}
                                            units='Users'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All Booking"
                                            total={320}
                                            color="secondary"
                                            icon={'ant-design:bug-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={15}
                                            color="warning"
                                            icon={'ant-design:android-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:android-filled'}
                                            units='Booking'
                                        />
                                    </Grid>
                                </Grid>
                                </>
                            ) : (
                                <Grid container spacing={2} sx={{ mt: 5 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All Booking"
                                            total={5}
                                            color="secondary"
                                            icon={'ant-design:android-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={1}
                                            color="warning"
                                            icon={'ant-design:apple-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={0}
                                            color={'info'}
                                            icon={'ant-design:windows-filled'}
                                            units='Booking'
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
