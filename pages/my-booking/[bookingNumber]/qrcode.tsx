import styles from '../../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import BookDetail from '@ku/components/MyBooking/BookDetail'
import { MERGE_PATH, MY_BOOKING_PATH } from '@ku/constants/routes'
import QrCodeDetail from '@ku/components/MyBooking/QrCodeDetail'

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
            eqsubPrice: [
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
            eqsubPrice: [],
        },
    ],
    eqPriceSubTotal: 100,
    bookId: 123,
    bookOwner: 1,
    bookAdvisor: 2,
    bookStatus: 'WAITING_FOR_PAYMENT',
    payOt: 0,
    payDiscount: 10,
    payFees: 0,
    payTotal: 100,
    bookCreatedAt: '2023-03-13T16:21:30.894Z',
    eqRtimDays: '2023-03-13T16:21:30.894Z',
    eqRtimTimes: [8, 10, 14],
};
MyBookingQrCode.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function MyBookingQrCode() {
    // const { t } = useTranslation();
    const permission : PERMISSION = 'Admin'
    const { enqueueSnackbar } = useSnackbar();
    const {
        query: { bookingNumber },
        push,
    } = useRouter()

    const handleQrDownload = () => {

    }

    return (
        <>
            <Head>
                <title>My Booking: QR payment | KU</title>
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
                                    { name: 'My Booking', href: MY_BOOKING_PATH },
                                    { name: 'List', href: MY_BOOKING_PATH },
                                    {
                                        name: `Booking: ${bookingNumber}`,
                                        href: MERGE_PATH(MY_BOOKING_PATH, `${bookingNumber}`),
                                    },
                                    { name: `QR payment` },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <Stack spacing={5}>
                                <BookDetail bookingData={mockData} noButton />
                                <QrCodeDetail
                                    billerId={'xxxbilleridxxx'}
                                    totalPayment={'xxxamountxxx'}
                                    ref1={'xxxref1xxx'}
                                    ref2={'xxxref2xxx'}
                                    onDownload={handleQrDownload}
                                />
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default MyBookingQrCode
