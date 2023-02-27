import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid } from '@mui/material'
import AuthorizedLayout from '@unfinity/layouts/authorized'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumb'
import {
    AnalyticsWidgetSummary,  
} from '../components/analytics'

Index.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function Index() {
    const theme = useTheme()

    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

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
                            links={[{ name: 'Dashboard' }, { name: 'Admin' }]}
                            sx={{ mt: 3, mb: 0, height: 72 }}
                        />

                        <Grid container spacing={3} sx={{ mt: 5 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <AnalyticsWidgetSummary
                                    title="Today"
                                    total={2}
                                    color="secondary"
                                    icon={'ant-design:android-filled'}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AnalyticsWidgetSummary
                                    title="Pending"
                                    total={581}
                                    color="warning"
                                    icon={'ant-design:apple-filled'}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AnalyticsWidgetSummary
                                    title="Confirm"
                                    total={18}
                                    icon={'ant-design:windows-filled'}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AnalyticsWidgetSummary
                                    title="Waiting for payment"
                                    total={12}
                                    color="info"
                                    icon={'ant-design:bug-filled'}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Index