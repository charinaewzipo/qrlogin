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
import { format, parseISO } from 'date-fns'
import axios from '@ku/services/axios'
import { get } from 'lodash'
import { fileNameByUrl } from '@sentry/components/file-thumbnail'

MaintenanceLogEdit.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function MaintenanceLogEdit() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
	const [maintenanceApiData, setMaintenanceApiData] = useState<IV1GetEquipmentMaintenanceRead>()
	const [maintenanceData, setMaintenanceData] = useState<IMaintenanceLogFormValuesProps>()
    const pathData = router.query

	useEffect(() => {
	  fetchMaintenanceData('234')
	}, [])  

    async function getFileFromUrl(url: string){
        // สร้างไฟล์เปล่าตาม size ของไฟล์ที่ได้จาก header เพื่อเอาไปโชว์ก่อน
        // เพื่อไม่ให้โหลด default นาน แล้วค่อยไปโหลดไฟล์เต็มตอนคลิกโหลด
        const response = await axios({
            method: 'head',
            url: url,
        })
        const fileSize = Number(get(response.headers, 'content-length', 0))
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const arrayBuffer = new ArrayBuffer(fileSize)
        const filename = fileNameByUrl(new URL(url).pathname)
        const file: CustomFile = new File([arrayBuffer], get(blob, 'name', filename), { type: blob.type })

        file.path = filename
        file.preview = url
        return file
    }      

	const fetchMaintenanceData = async (id: string) => {
        const apiData = {
            eqId: 1,
            eqmtnId: 1,
            eqmtnDescription: 'Engineer จาก crest แก้ไขปัญหาภาพ noise จากการเสียหายของอุปกรณ์',
            eqmtnCost: 3500,
            eqmtnDate: '2022-02-28T10:30:00.000Z',
            eqmtnCreatedAt: '2022-02-28T11:00:00.000Z',
            eqmtnUpdatedAt: '2022-02-28T11:15:00.000Z',
            eqmtnPicLink: 'https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg',
            eqmtnPicCreatedAt: '2022-02-28T11:05:00.000Z',
            eqmtnPicUpdatedAt: '2022-02-28T11:05:00.000Z'
        }
        setMaintenanceApiData(apiData)
		setMaintenanceData({
            descriptions: apiData.eqmtnDescription,
            cost: fNumber(apiData.eqmtnCost),
            date: format(parseISO(apiData.eqmtnDate.replace('Z', '')), 'dd MMM yyyy'),
            maintenanceFiles: [],
		})
        const maintenanceFiles = await getFileFromUrl(apiData.eqmtnPicLink)
        setMaintenanceData(prev => ({...prev, maintenanceFiles: [maintenanceFiles]}))
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
                <title>Update Maintenance Log | KU</title>
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
