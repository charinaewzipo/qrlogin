import styles from '../../../../../styles/index.module.scss'
import Head from 'next/head'
import { Alert, Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import { useEffect, useState } from 'react'
import MaintenanceLogForm, { IMaintenanceLogFormValuesProps } from '@ku/components/Equipment/MaintenanceLogForm'
import { CustomFile } from '@sentry/components/upload'
import { fNumber } from '@sentry/utils/formatNumber'
import { format } from 'date-fns'
import axios from '@ku/services/axios'
import { get } from 'lodash'

MaintenanceLogEdit.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
interface IEquipmentMaintenance {
    eq_id: number
    eqmtn_id: number
    eqmtn_description: string
    eqmtn_cost: number
    eqmtn_date: Date
    eqmtn_created_at: Date
    eqmtn_updated_at: Date
    eqmtnpic_link: string
    eqmtnpic_created_at: Date
    eqmtnpic_updated_at: Date
}
    
export function MaintenanceLogEdit() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
	const [maintenanceApiData, setMaintenanceApiData] = useState<IEquipmentMaintenance>()
	const [maintenanceData, setMaintenanceData] = useState<IMaintenanceLogFormValuesProps>()
    const pathData = router.query

	useEffect(() => {
	  fetchMaintenanceData('234')
	}, [])
	
    async function getFileFromUrl(url: string){
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'blob',
        })
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const filename = `${new URL(url).pathname.split('/').pop()}`
        const file: CustomFile = new File([blob], get(blob, 'name', filename), { type: blob.type })
        file.preview = url
        return file
    }      

	const fetchMaintenanceData = async (id: string) => {
        const apiData = {
            eq_id: 1,
            eqmtn_id: 1,
            eqmtn_description: 'Engineer จาก crest แก้ไขปัญหาภาพ noise จากการเสียหายของอุปกรณ์',
            eqmtn_cost: 3500,
            eqmtn_date: new Date(),
            eqmtnpic_link: 'https://handballthailand.com/filesAttach/1670591100.pdf',
            eqmtn_created_at: new Date(),
            eqmtn_updated_at: new Date(),
            eqmtnpic_created_at: new Date(),
            eqmtnpic_updated_at: new Date(),
        }
        setMaintenanceApiData(apiData)
        const maintenanceFiles = await getFileFromUrl(apiData.eqmtnpic_link)
		setMaintenanceData({
            descriptions: apiData.eqmtn_description,
            cost: fNumber(apiData.eqmtn_cost),
            date: format(apiData.eqmtn_date, 'dd MMM yyyy'),
            maintenanceFiles: [maintenanceFiles],
		})
	}

	const handleFormSubmit = (data: IMaintenanceLogFormValuesProps) => {
        //TODO: api submit
        enqueueSnackbar('Updated maintenance log.')
        setErrorMsg('error msg')
        console.log('submit', data)
        router.push({pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail/[id]')}`, query: { id: pathData.id }})
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
                            <Stack spacing={5}>
                                {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                                <MaintenanceLogForm
                                    onSubmit={handleFormSubmit}
                                    onCancel={handleFormReset}
                                    isEditing
                                    defaultValue={maintenanceData}
                                />
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MaintenanceLogEdit
