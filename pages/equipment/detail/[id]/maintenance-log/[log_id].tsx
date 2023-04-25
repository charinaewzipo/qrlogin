import styles from '../../../../../styles/index.module.scss'
import Head from 'next/head'
import { Alert, Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { EQUIPMENT_PATH, MERGE_PATH, NOTFOUND_PATH } from '@ku/constants/routes'
import { useEffect, useState } from 'react'
import MaintenanceLogForm, { IMaintenanceLogFormValuesProps } from '@ku/components/Equipment/MaintenanceLogForm'
import { CustomFile } from '@sentry/components/upload'
import { fNumber } from '@sentry/utils/formatNumber'
import { formatISO } from 'date-fns'
import axios, { AxiosError } from 'axios'
import { get } from 'lodash'
import { fileNameByUrl } from '@sentry/components/file-thumbnail'
import { fetchGetEquipmentMaintenanceRead, postEquipmentMaintenanceUpdate } from '@ku/services/equipment'
import numeral from 'numeral'
import messages from '@ku/constants/response'
import codes from '@ku/constants/responseCode'
import { fDateTimeFormat } from '@sentry/utils/formatDateTime'

MaintenanceLogEdit.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function MaintenanceLogEdit() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const {
        push,
        query: { id, log_id },
        isReady,
    } = useRouter()
    const [errorMsg, setErrorMsg] = useState('')
	const [maintenanceApiData, setMaintenanceApiData] = useState<IV1GetEquipmentMaintenanceRead>()
	const [maintenanceData, setMaintenanceData] = useState<IMaintenanceLogFormValuesProps>()
    const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
        if (!isReady) return
	    fetchMaintenanceData()
	}, [isReady])

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

    const fetchMaintenanceData = async () => {
        if (!isFinite(+id) || !isFinite(+log_id)) push(MERGE_PATH(NOTFOUND_PATH, 'equipment'))
        await fetchGetEquipmentMaintenanceRead({
            eqId: Number(id),
            eqmtnId: Number(log_id),
            page: 1,
            limit: 1,
        })
            .then(async (res) => {
                if (res.code === codes.OK_CODE) {
                    const dataList = get(res, 'data.dataList', [])
                    if (!dataList.length) {
                        push(MERGE_PATH(NOTFOUND_PATH, 'equipment'))
                        return
                    }
                    const apiData = get(dataList, '0', null)
                    setMaintenanceApiData(apiData)
                    setMaintenanceData({
                        descriptions: get(apiData, 'eqmtnDescription', ''),
                        cost: fNumber(get(apiData, 'eqmtnCost', '')),
                        date: fDateTimeFormat(get(apiData, 'eqmtnDate', ''), 'DD MMM YYYY'),
                        maintenanceFiles: [],
                    })
                    const maintenanceFiles = await getFileFromUrl(get(apiData, 'eqmtnpicLink', ''))
                    setMaintenanceData((prev) => ({ ...prev, maintenanceFiles: [maintenanceFiles] }))
                }
            })
            .catch((err: AxiosError) => {
                const errorMessage = get(err, 'devMessage', messages[0])
                enqueueSnackbar(errorMessage, { variant: 'error' })
            })
    }

	const handleFormSubmit = async (data: IMaintenanceLogFormValuesProps) => {
        setErrorMsg('')
        setIsLoading(true)
        await postEquipmentMaintenanceUpdate({
            eqmtnId: Number(get(maintenanceApiData, 'eqmtnId', '')),
            eqmtnDescription: get(data, 'descriptions', ''),
            eqmtnCost: numeral(get(data, 'cost', 0)).value(),
            eqmtnDate: formatISO(new Date(get(data, 'date', ''))),
            eqmtnpicLink:
                'https://media-cdn.bnn.in.th/219215/MacBook_Pro_13-inch_Silver_2-square_medium.jpg',
            // รอ api รูป
        })
            .then(async (res) => {
                enqueueSnackbar('Updated maintenance log.')
                push({ pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail', `${id}`)}` })
            })
            .catch((err: AxiosError) => {
                setErrorMsg(get(err, 'devMessage', messages[0]))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleFormReset = () => {
        fetchMaintenanceData()
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
                                        href: `${MERGE_PATH(EQUIPMENT_PATH, `detail`, `${id}`)}`,
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
                                    isLoading={isLoading}
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
