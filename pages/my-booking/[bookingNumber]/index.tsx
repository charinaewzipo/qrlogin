import styles from '../../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { useState } from 'react'
import BookDetail from '@ku/components/MyBooking/BookDetail'
import UserPaymentNotice, { PaymentNoticeFormValuesProps } from '@ku/components/MyBooking/UserPaymentNotice'
import PaymentSummary from '@ku/components/MyBooking/PaymentSummary'
import EquipmentDetail from '@ku/components/MyBooking/EquipmentDetail'
import TableView from '@ku/components/MyBooking/TableView'
import numeral from 'numeral'
import { formatISO } from 'date-fns'

MyBookingDetail.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
const paymentData: IV1TablePayments = {
    payId: 1,
    payBookId: 123,
    payQuotationPicture: 'https://example.com/quotation.png',
    payInvoicePicture: 'https://example.com/invoice.png',
    payReceiptPicture: 'https://example.com/receipt.png',
    paySlipPicture: 'https://example.com/slip.png',
    payQrPicture: 'https://example.com/qr.png',
    payQrExpiry: '2023-06-30T12:00:00Z',
    payQrRef1: 'REF123',
    payQrRef2: 'REF456',
    payOt: 0,
    payDiscount: 0,
    payFees: 1.5,
    payTotal: 100,
    payRemark: 'Payment for services rendered',
    payBillingAddress: '14/55 หมู่ 12 ต.รอบเวียง อ.เมือง จ.เชียงใหม่ 57300',
    payReceiptNumber: 'RECEIPT123',
    payDateTime: '2023-03-15T10:00:00Z',
    payAmount: 100,
    payCreatedAt: '2023-03-16T10:00:00Z',
    payUpdatedAt: '2023-03-17T10:00:00Z',
}
  
const mockData: IV1RespGetBookingMeRead = {
    eqId: 1,
    eqCreateBy: 1,
    eqStatus: "Available",
    eqCode: "EQ001",
    eqName: "Laptop",
    eqBrand: "Apple",
    eqModel: "MacBook Pro",
    eqDescription: "Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals",
    eqPictures: [
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg",
            eqpicSort: 2,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1-square_medium.jpg",
            eqpicSort: 1,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1-square_medium.jpg",
            eqpicSort: 3,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg",
            eqpicSort: 4,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1-square_medium.jpg",
            eqpicSort: 5,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg",
            eqpicSort: 6,
        },
    ],
    eqCreatedAt: '2023-03-13T16:21:30.894Z',
    eqUpdatedAt: '2023-03-16T16:21:30.894Z',
    eqPrices: [
        {
            eqpId: 1,
            eqpEqId: 1,
            eqpTypePerson: "member",
            eqpSubOption: "basic",
            eqpChecked: "yes",
            eqpIsChecked: true,
            eqpName: "Basic membership",
            eqpDescription: "Access to basic features",
            eqpQuantity: 1,
            eqpTotal: 100,
            eqpUnitPrice: 100,
            eqpUnitPer: "month",
            eqpCreatedAt: '2023-03-13T16:21:30.894Z',
            eqpUpdatedAt: '2023-03-15T16:21:30.894Z',
            eqSubPrice: [
                {
                    eqsubpId: 1,
                    eqsubpChecked: "no",
                    eqsubpName: "Premium membership",
                    eqsubpDescription: "Access to premium features",
                    eqsubpUnitPrice: 200,
                    eqsubpUnitPer: "month",
                    eqsubpQuantity: 1,
                    eqsubpTotal: 200,
                    eqsubpCreatedAt: '2023-03-13T16:21:30.894Z',
                    eqsubpUpdatedAt: '2023-03-13T16:21:30.894Z',
                },
            ],
        },
        {
            eqpId: 2,
            eqpEqId: 2,
            eqpTypePerson: "member",
            eqpSubOption: "basic",
            eqpChecked: "yes",
            eqpIsChecked: true,
            eqpName: "Basic membership",
            eqpDescription: "Access to basic features",
            eqpQuantity: 1,
            eqpTotal: 100,
            eqpUnitPrice: 100,
            eqpUnitPer: "month",
            eqpCreatedAt: '2023-03-13T16:21:30.894Z',
            eqpUpdatedAt: '2023-03-15T16:21:30.894Z',
            eqSubPrice: [],
        },
    ],
    eqPriceSubTotal: 100,
    bookId: 123,
    bookOwner: 1,
    bookAdvisor: 2,
    bookStatus: 'CONFIRM',
    payOt: 0,
    payDiscount: 10,
    payFees: 0,
    payTotal: 100,
    bookCreatedAt: '2023-03-13T16:21:30.894Z',
    eqRtimDays: '2023-03-13T16:21:30.894Z',
    eqRtimTimes: [8, 10, 14],
};
  
  
export function MyBookingDetail() {
    // const { t } = useTranslation();
    const permission : PERMISSION = 'Admin'
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const [paymentErrorMsg, setpaymentErrorMsg] = useState('')

    const {
        query: { bookingNumber },
    } = useRouter()
    
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
    const handleCancelBooking = () => {
        //TODO: qr link
    }
    const handlePaymentNotice = (data: PaymentNoticeFormValuesProps) => {
        setpaymentErrorMsg('')
        console.log(data)
        const formattedData: IV1PostBookingPayments = {
            bookId: mockData.bookId,
            paySlipPicture: 'https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg',
            payRemark: data.remark,
            payBillingAddress: data.billingAddress,
            payDateTime: formatISO(data.paymentDateTime),
            payAmount: numeral(data.amount).value(),
        }
        enqueueSnackbar('Payment notice to financial success.')
        setpaymentErrorMsg('Network Error')
        console.log(formattedData)
        
    }
    const handleRecheck = () => {
        //TODO: qr link
    }
    const handleOnDownloadAsPdf = () => {

    }

    return (
        <>
            <Head>
                <title>My Booking: Detail | KU</title>
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
                                heading="My Booking"
                                links={[
                                    { name: 'My Booking', href: '/my-booking' },
                                    { name: 'List', href: '/my-booking' },
                                    { name: `Booking: ${bookingNumber}` },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <Stack spacing={5}>
                                <BookDetail
                                    bookingData={mockData}
                                    onDownloadQuotation={handleDownloadQuotation}
                                    onCancelBooking={handleCancelBooking}
                                    onDownloadInvoice={handleDownloadInvoice}
                                    onPaymentQRCode={handleQrCode}
                                />
                                {['WAITING_FOR_PAYMENT_CONFIRM', 'FINISH'].includes(
                                    mockData.bookStatus
                                ) ? (
                                    <PaymentSummary
                                        payData={paymentData}
                                        onDownloadPayslip={handleDownloadPayslip}
                                        onDownloadReceipt={handleDownloadReceipt}
                                    />
                                ) : (
                                    <></>
                                )}
                                <EquipmentDetail bookingData={mockData} />
                                <TableView
                                    onDownloadAsPdf={handleOnDownloadAsPdf}
                                    bookingData={mockData}
                                />
                                {mockData.bookStatus === 'WAITING_FOR_PAYMENT' ? (
                                    <UserPaymentNotice
                                        onSubmit={handlePaymentNotice}
                                        errorMsg={paymentErrorMsg}
                                        totalAmount={paymentData.payTotal}
                                        eqName={mockData.eqName}
                                        bookId={mockData.bookId}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MyBookingDetail
