import styles from '../../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import AccountForm, { IAccountFormValuesProps } from '@ku/components/Account/AccountForm'
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { ACCOUNT_PATH } from '@ku/constants/routes'
import { useState } from 'react'
import BookDetail from '@ku/components/MyBooking/BookDetail'
import UserPaymentNotice from '@ku/components/MyBooking/UserPaymentNotice'
import PaymentSummary from '@ku/components/MyBooking/PaymentSummary'
import EquipmentDetail from '@ku/components/MyBooking/EquipmentDetail'
import TableView from '@ku/components/MyBooking/TableView'

MyBookingDetail.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function MyBookingDetail() {
    // const { t } = useTranslation();
    const permission : PERMISSION = 'Admin'
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    const onFormSubmit = (data: IAccountFormValuesProps) => {
        //TODO: api submit
        enqueueSnackbar('Account create success.')
        setErrorMsg('error msg')
        console.log('submit', data)
    }
    const onFormCancel = () => {
        router.push(ACCOUNT_PATH)
    }
    const handleQrCode = () => {
		//TODO: qr link
	}
    const handleDownloadInvoice = () => {
		//TODO: qr link
	}
    const handleDownloadQuotation = () => {
		//TODO: qr link
	}
    const handleDownloadPayslip = () => {
		//TODO: qr link
	}
    const handleDownloadReceipt = () => {
		//TODO: qr link
	}
    const handlePaymentNotice = () => {
		//TODO: qr link
	}
    const handleRecheck = () => {
		//TODO: qr link
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
                                heading="Accounts"
                                links={[
                                    { name: 'Accounts', href: '/account' },
                                    { name: 'List', href: '/account' },
                                    { name: 'Create an account' },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
							<Stack spacing={5}>
								<BookDetail onCancel={onFormCancel} errorMsg={errorMsg} status={''} />
								<UserPaymentNotice onCancel={onFormCancel} errorMsg={errorMsg} />
								<PaymentSummary onCancel={onFormCancel} errorMsg={errorMsg} />
								<EquipmentDetail onCancel={onFormCancel} errorMsg={errorMsg} />
								<TableView onCancel={onFormCancel} errorMsg={errorMsg} />
							</Stack>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MyBookingDetail
