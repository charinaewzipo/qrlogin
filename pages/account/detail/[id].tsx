import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../../../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Container, Tabs, Tab } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { useTranslation } from "react-i18next";
import { useState } from 'react'
import Iconify from '@sentry/components/iconify'
import AccountForm from '@ku/components/Account/AccountForm'
import UserSupervise from '@ku/components/Account/UserSupervise'
import Assessment from '@ku/components/Account/Assessment'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import Booking from '@ku/components/Account/Booking'

AccountCreate.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function AccountCreate() {
    const theme = useTheme()
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState('Account-detail');
    const { scrollYProgress } = useScroll()

    const router = useRouter()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const permission : PERMISSION = get(router.query,"id",'Admin') as PERMISSION

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

    const onFormSubmit = () => {
      //TODO: api submit
      console.log('submit');
    }

    const onFormCancel = () => {
      //TODO: cancel form
      console.log('canncel');
    }

    const listAllTab = {
        account:{
          value: 'Account-detail',
          label: 'Account detail',
          icon: <Iconify icon="ic:round-account-box" />,
          component: <AccountForm onSubmit={onFormSubmit} onCancel={onFormCancel} />,
        },
        user:{
          value: 'User-Supervise',
          label: 'User (Supervise)',
          icon: <Iconify icon="ooui:user-group-ltr" />,
          component: <UserSupervise />,
        },
        booking:{
          value: 'Booking',
          label: 'Booking',
          icon: <Iconify icon="ic:check-circle" />,
          component: <Booking />,
        },
        assessments:{
          value: 'Assessments',
          label: 'Assessments',
          icon: <Iconify icon="ic:check-circle" />,
          component: <Assessment />,
        },
    }
    const listPermissionTab: { [key in PERMISSION] } = {
        Supervisor : [listAllTab.account,listAllTab.user,listAllTab.booking,listAllTab.assessments],
        User : [listAllTab.account,listAllTab.booking,listAllTab.assessments],
        Finance : [listAllTab.account],
        Admin : [listAllTab.account,listAllTab.booking]
    }

    return (
        <>
            <Head>
                <title>Account Detail | KU</title>
            </Head>
            {progress}
            <Container>
                <Box
                    sx={{
                        overflow: 'visible',
                        position: 'relative',
                        bgcolor: 'background.default',
                    }}
                >
                    <div className={styles.page}>
                        <div className="wrapper">
                            <CustomBreadcrumbs
                                heading="Account"
                                links={[ { name: 'Account', href: '/account' }, { name: 'List' }, { name: '[id]' } ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />

                            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                                {get(listPermissionTab,permission,[]).map((tab) => (
                                    <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                                ))}
                            </Tabs>

                            {get(listPermissionTab,permission,[]).map(
                                (tab) =>
                                    tab.value === currentTab && (
                                    <Box key={tab.value} sx={{ mt: 5 }}>
                                        {tab.component}
                                    </Box>
                                    )
                            )}

                            
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default AccountCreate
