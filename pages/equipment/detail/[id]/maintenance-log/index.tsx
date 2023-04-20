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
import { fetchGetEquipmentRead, postEquipmentMaintenanceCreate } from '@ku/services/equipment'
import { get, isFinite } from 'lodash'
import numeral from 'numeral'
import { formatISO, startOfDay } from 'date-fns'
import messages from '@ku/constants/response'
import { AxiosError } from 'axios'
import codes from '@ku/constants/responseCode'

MaintenanceLog.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function MaintenanceLog() {
    // const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const { push, query: { id }, isReady } = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if (!isReady) return
        checkEquipmentExist()
    }, [isReady])
    

    const checkEquipmentExist = () => {
        if (!isFinite(+id)) push(MERGE_PATH(NOTFOUND_PATH, 'equipment'))
        fetchGetEquipmentRead({ eqId: `${id}`, limit: 1, page: 1 })
            .then((res) => {
                if (res.code === codes.OK_CODE) {
                    const dataLength = get(res, 'data.dataList', []).length
                    if (dataLength) {
                        return
                    } else {
                        push(MERGE_PATH(NOTFOUND_PATH, 'equipment'))
                    }
                }
            })
            .catch((err: AxiosError) => {
                const errorMessage = get(err, 'devMessage', messages[0])
                enqueueSnackbar(errorMessage, { variant: 'error' })
            })
    }

    const handleFormSubmit = async (data: IMaintenanceLogFormValuesProps) => {
        const mtnDate = data.date ? formatISO(new Date(get(data, 'date', ''))) : formatISO(startOfDay(new Date()))
        setErrorMsg('')
        await postEquipmentMaintenanceCreate({
            eqId: Number(id),
            eqmtnDescription: get(data, 'descriptions', ''),
            eqmtnCost: numeral(get(data, 'cost', 0)).value() || 0,
            eqmtnDate: mtnDate,
            eqmtnFileLink:
                'https://media-cdn.bnn.in.th/219215/MacBook_Pro_13-inch_Silver_2-square_medium.jpg',
            // รอ api รูป
        })
            .then(async (res) => {
                if (res.code === codes.OK_CODE) {
                    enqueueSnackbar('Added maintenance log.')
                    push({ pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail', `${id}`)}` })
                }
            })
            .catch((err: AxiosError) => {
                setErrorMsg(get(err, 'devMessage', messages[0]))
            })
    }

    const handleFormCancel = () => {
        push({pathname: `${MERGE_PATH(EQUIPMENT_PATH, 'detail/[id]')}`, query: { id: id }})
    }

    return (
        <>
            <Head>
                <title>Create Maintenance Log | KU</title>
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
