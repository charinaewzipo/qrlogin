import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Container } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumb'
import { AnalyticsWidgetSummary } from '../components/analytics'
import { useTranslation } from "react-i18next";

Index.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function Index() {
    const theme = useTheme()
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })



    const permission : PERMISSION = 'Admin'

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
                            <HeaderBreadcrumbs
                                heading="Dashboard"
                                links={[{ name: 'Dashboard' }, { name: permission }]}
                                sx={{ mt: 3, mb: 0, height: 72 }}
                            />

                            {permission === 'Admin' ? (
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Today"
                                            total={2}
                                            color="grey"
                                            icon={'mdi:bag-personal'}
                                            units='Booking'
                                            // iconLinearColor='linear-gradient(135deg, rgba(226, 226, 226, 0) 0%, rgba(40, 40, 40, 0.24) 97.35%)'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={581}
                                            color="warning"
                                            icon={'icon-park-outline:done-all'}
                                            units='Booking'
                                            // iconLinearColor='linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 97.35%)'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Confirm"
                                            total={18}
                                            icon={'ic:baseline-verified'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:credit-card-filled'}
                                            units='Booking'
                                        />
                                    </Grid>
                                </Grid>
                            ) : permission === 'Finance' ? (
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                    
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="grey"
                                            icon={'ant-design:credit-card-filled'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All booking"
                                            total={128}
                                            color='info'
                                            icon={'mdi:bag-personal'}
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
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All Booking"
                                            total={5}
                                            color={'grey'}
                                            icon={'mdi:bag-personal'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:credit-card-filled'}
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
                                            color={'grey'}
                                            icon={'fa6-solid:user-group'}
                                            units='Users'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="All Booking"
                                            total={320}
                                            color="grey"
                                            icon={'mdi:bag-personal'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={15}
                                            color="warning"
                                            icon={'icon-park-outline:done-all'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={12}
                                            color="info"
                                            icon={'ant-design:credit-card-filled'}
                                            units='Booking'
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
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Pending"
                                            total={1}
                                            color="warning"
                                            icon={'icon-park-outline:done-all'}
                                            units='Booking'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <AnalyticsWidgetSummary
                                            title="Waiting for payment"
                                            total={0}
                                            color={'info'}
                                            icon={'ant-design:credit-card-filled'}
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
