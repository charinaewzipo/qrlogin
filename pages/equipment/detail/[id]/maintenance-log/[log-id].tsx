import styles from '../../../../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import { useEffect, useState } from 'react'
import MaintenanceLogForm, { IMaintenanceLogFormValuesProps } from '@ku/components/Equipment/MaintenanceLogForm'
import { CustomFile } from '@sentry/components/upload'

MaintenanceLogEdit.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function MaintenanceLogEdit() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
	const [maintenanceData, setMaintenanceData] = useState<IMaintenanceLogFormValuesProps>()
    const pathData = router.query

	useEffect(() => {
	  fetchMaintenanceData('234')
	}, [])
	

	const fetchMaintenanceData = (id: string) => {
		setMaintenanceData({
			descriptions: 'Engineer จาก crest แก้ไขปัญหาภาพ noise จากการเสียหายของอุปกรณ์',
			cost: 'https://googl.co/documents/54532',
			date: '01 Dec 2022',
			maintenanceFiles: [{
				name:"eerer.png",
				preview:"https://placekitten.com/200/300",
			}] as CustomFile[]
		})
	}

	const handleFormSubmit = (data: IMaintenanceLogFormValuesProps) => {
        //TODO: api submit
        enqueueSnackbar('Updated maintenance log.')
        setErrorMsg('error msg')
        console.log('submit', data)
        router.push({pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail')}/[id]`, query: { id: pathData.id }})
    }

    const handleFormReset = () => {
		//todo ยิง api ใหม่
		fetchMaintenanceData('123')
        setMaintenanceData({ ...maintenanceData, descriptions: 'asdasdasdasdasd' })
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
                                        href: `${MERGE_PATH(EQUIPMENT_PATH, 'detail')}/[id]/${
                                            pathData.id
                                        }`,
                                    },
                                    { name: 'Maintenance Detail' },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <MaintenanceLogForm
                                onSubmit={handleFormSubmit}
                                onCancel={handleFormReset}
                                errorMsg={errorMsg}
								isEditing
								defaultValue={maintenanceData}
                            />
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MaintenanceLogEdit
