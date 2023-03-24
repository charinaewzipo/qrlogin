import styles from '../../../../../styles/index.module.scss'
import Head from 'next/head'
import { Alert, Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import { useState } from 'react'
import MaintenanceLogForm, { IMaintenanceLogFormValuesProps } from '@ku/components/Equipment/MaintenanceLogForm'

MaintenanceLog.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function MaintenanceLog() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
    const pathData = router.query

    const handleFormSubmit = (data: IMaintenanceLogFormValuesProps) => {
        //TODO: api submit
        enqueueSnackbar('Added maintenance log.')
        setErrorMsg('error msg')
        console.log('submit', data)
        router.push({pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail/[id]')}`, query: { id: pathData.id }})
    }

    const handleFormCancel = () => {
        router.push({pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail/[id]')}`, query: { id: pathData.id }})
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
                                    {
                                        name: 'Coating Material (CM1)',
                                        href: `${MERGE_PATH(EQUIPMENT_PATH, `detail${pathData.id}`)}`,
                                    },
                                    { name: 'Create Maintenance Log' },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <Stack spacing={5}>
                                {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                                <MaintenanceLogForm
                                    onSubmit={handleFormSubmit}
                                    onCancel={handleFormCancel}
                                />
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MaintenanceLog
