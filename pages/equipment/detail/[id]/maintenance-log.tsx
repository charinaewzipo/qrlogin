import styles from '../../../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { EQUIPMENT_PATH } from '@ku/constants/routes'
import { useState } from 'react'
import MaintenanceLogForm, { IMaintenanceLogFormValuesProps } from '@ku/components/Equipment/MaintenanceLogForm'

MaintenanceLog.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function MaintenanceLog() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    const onFormSubmit = (data: IMaintenanceLogFormValuesProps) => {
        //TODO: api submit
        enqueueSnackbar('Added maintenance log.')
        setErrorMsg('error msg')
        console.log('submit', data)
    }

    const onFormCancel = () => {
        router.push(EQUIPMENT_PATH)
    }

    return (
        <>
            <Head>
                <title>Account Create | KU</title>
            </Head>
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
                                heading="Equipments"
                                links={[
                                    { name: 'Equipments', href: '/equipment' },
                                    { name: 'List', href: '/equipment' },
                                    { name: 'Coating Material (CM1)', href: '/equipment' },
                                    { name: 'Create Maintenance Log' },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <MaintenanceLogForm onSubmit={onFormSubmit} onCancel={onFormCancel} errorMsg={errorMsg} />
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MaintenanceLog
