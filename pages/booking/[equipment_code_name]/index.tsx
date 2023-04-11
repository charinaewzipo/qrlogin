import styles from '../../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container, Stack } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { formatISO, isValid } from 'date-fns'
import { MY_BOOKING_PATH } from '@ku/constants/routes'
import EquipmentDetail from '@ku/components/Booking/CreateBooking/EquipmentDetail'
import BookSummary from '@ku/components/Booking/CreateBooking/BookSummary'
import TableView from '@ku/components/Booking/CreateBooking/TableView'
import BookInformation from '@ku/components/Booking/CreateBooking/BookInformation'
import AvailableDateCalendar from '@ku/components/Booking/CreateBooking/AvailableDateCalendar'

bookingCreate.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
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
          eqpEqId: 134,
          eqpTypePerson: 'KU_STUDENT_STAFF',
          eqpSubOption: 'ONLY_ONE',
          eqpChecked: 'FIXED',
          eqpIsChecked: true,
          eqpName: "Basic membership",
          eqpDescription: "Access to basic features",
          eqpQuantity: 1,
          eqpTotal: 100,
          eqpUnitPrice: 100,
          eqpUnitPer: "hr",
          eqpCreatedAt: '2023-03-13T16:21:30.894Z',
          eqpUpdatedAt: '2023-03-15T16:21:30.894Z',
          eqsubPrice: [
              {
                  eqsubpId: 1,
                  eqsubpChecked: 'DEFAULT',
                  eqsubpName: "Premium membership",
                  eqsubpDescription: "Access to premium features",
                  eqsubpUnitPrice: 200,
                  eqsubpUnitPer: "hr",
                  eqsubpQuantity: 1,
                  eqsubpTotal: 200,
                  eqsubpCreatedAt: '2023-03-13T16:21:30.894Z',
                  eqsubpUpdatedAt: '2023-03-13T16:21:30.894Z',
              },
              {
                  eqsubpId: 2,
                  eqsubpChecked: 'UNCHECK',
                  eqsubpName: "Premium membership 2",
                  eqsubpDescription: "Access to premium features 2",
                  eqsubpUnitPrice: 200,
                  eqsubpUnitPer: "hr",
                  eqsubpQuantity: 1,
                  eqsubpTotal: 200,
                  eqsubpCreatedAt: '2023-03-13T16:21:30.894Z',
                  eqsubpUpdatedAt: '2023-03-13T16:21:30.894Z',
              },
          ],
      },
      {
          eqpId: 2,
          eqpEqId: 2312,
          eqpTypePerson: "KU_STUDENT_STAFF",
          eqpSubOption: '',
          eqpChecked: 'FIXED',
          eqpIsChecked: true,
          eqpName: "Basic membership",
          eqpDescription: "Access to basic features",
          eqpQuantity: 1,
          eqpTotal: 100,
          eqpUnitPrice: 100,
          eqpUnitPer: "other",
          eqpCreatedAt: '2023-03-13T16:21:30.894Z',
          eqpUpdatedAt: '2023-03-15T16:21:30.894Z',
          eqsubPrice: [],
      },
      {
        eqpId: 5,
        eqpEqId: 15123,
        eqpTypePerson: "KU_STUDENT_STAFF",
        eqpSubOption: 'AT_LEAST_ONE',
        eqpChecked: 'DEFAULT',
        eqpIsChecked: true,
        eqpName: "Basic ski equipment rental",
        eqpDescription: "Includes skis, boots, and poles",
        eqpQuantity: 2,
        eqpTotal: 60.00,
        eqpUnitPrice: 30.00,
        eqpUnitPer: "Booking",
        eqpCreatedAt: "2022-01-01T00:00:00Z",
        eqpUpdatedAt: "2022-01-02T00:00:00Z",
        eqsubPrice: [
          {
            eqsubpId: 1,
            eqsubpChecked: 'DEFAULT',
            eqsubpName: "Helmet rental",
            eqsubpDescription: "Protective helmet for skiing",
            eqsubpUnitPrice: 5.00,
            eqsubpUnitPer: "Booking",
            eqsubpQuantity: 2,
            eqsubpTotal: 10.00,
            eqsubpCreatedAt: "2022-01-01T00:00:00Z",
            eqsubpUpdatedAt: "2022-01-02T00:00:00Z"
          }
        ]
      },
      {
        eqpId: 6,
        eqpEqId: 12423,
        eqpTypePerson: "KU_STUDENT_STAFF",
        eqpSubOption: 'AT_LEAST_ONE',
        eqpChecked: 'DEFAULT',
        eqpIsChecked: false,
        eqpName: "Premium ski equipment rental",
        eqpDescription: "Includes high-performance skis, boots, and poles",
        eqpQuantity: 1,
        eqpTotal: 40.00,
        eqpUnitPrice: 40.00,
        eqpUnitPer: "Booking",
        eqpCreatedAt: "2022-01-01T00:00:00Z",
        eqpUpdatedAt: "2022-01-02T00:00:00Z",
        eqsubPrice: [
          {
            eqsubpId: 2,
            eqsubpChecked: 'FIXED',
            eqsubpName: "Ski helmet rental",
            eqsubpDescription: "Protective helmet for skiing",
            eqsubpUnitPrice: 5.00,
            eqsubpUnitPer: "Booking",
            eqsubpQuantity: 1,
            eqsubpTotal: 5.00,
            eqsubpCreatedAt: "2022-01-01T00:00:00Z",
            eqsubpUpdatedAt: "2022-01-02T00:00:00Z"
          },
          {
            eqsubpId: 3,
            eqsubpChecked: 'UNCHECK',
            eqsubpName: "Ski goggles rental",
            eqsubpDescription: "Protective goggles for skiing",
            eqsubpUnitPrice: 5.00,
            eqsubpUnitPer: "Booking",
            eqsubpQuantity: 1,
            eqsubpTotal: 5.00,
            eqsubpCreatedAt: "2022-01-01T00:00:00Z",
            eqsubpUpdatedAt: "2022-01-02T00:00:00Z"
          }
        ]
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


export function bookingCreate() {
    // const { t } = useTranslation();
    const permission : PERMISSION = 'Admin'
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState<number[]>([])
    const [bookingData, setBookingData] = useState<IV1RespGetBookingMeRead[]>([])
    const [postBookingPrice, setPostBookingPrice] = useState<IV1BookingEquipmentPrice[]>([])
    const bookNowRef = useRef(null)

    const {
        query: { equipment_code_name },
        push,
    } = useRouter()

    const handleToBookNow = () => {
        bookNowRef.current.scrollIntoView()
    }

    const handleSelectDate = (date: Date) => {
      setSelectedDate(date)
    }

    const handleSelectTime = (time: number) => {
      if (selectedTime.includes(time)) {
        setSelectedTime(prev => [...prev.filter(n => n !== time)])
      } else {
        setSelectedTime(prev => [...prev, time])
      }
    }

    const handleTableDataChange = (data: IV1BookingEquipmentPrice[]) => {
        setPostBookingPrice(data)
    }

    const handlePostBook = () => {
        const postObj: IV1PostBookingCreate = {
            eqId: 0,
            eqPrices: postBookingPrice,
            eqRtimDays: '',
            eqRtimTimes: selectedTime,
            payRemark: '',
            payBillingAddress: '',
            payMethod: ''
        }
        console.log(postObj)
    }

    const availableDate = [
        {
            start: '2023-03-31T02:00:40.239Z',
            title: '15:00 - 16:00',
        },
        {
            start: '2023-03-31T03:00:40.239Z',
            title: '17:00 - 18:00',
        },
        {
            start: '2023-04-06T02:00:40.239Z',
            title: '15:00 - 16:00',
        },
        {
            start: '2023-03-31T02:00:40.239Z',
            title: '15:00 - 16:00',
        },
        {
            start: '2023-03-31T02:00:40.239Z',
            title: '18:00 - 19:00',
        },
        {
            start: '2023-04-15T02:00:40.239Z',
            title: '18:00 - 19:00',
        },
        {
            start: '2023-04-16T02:00:40.239Z',
            title: '18:00 - 19:00',
        },
    ]

    return (
        <>
            <Head>
                <title>Booking | KU</title>
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
                                heading="Booking"
                                links={[
                                    { name: 'Booking', href: '/booking' },
                                    { name: 'List', href: '/booking' },
                                    { name: `${mockData.eqName}` },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <Stack spacing={5}>
                                <EquipmentDetail
                                    bookingData={mockData}
                                    onClickBookNow={handleToBookNow}
                                />
                                <AvailableDateCalendar events={availableDate} />
                                <Stack sx={{ scrollMarginTop: '80px'}} ref={bookNowRef}>
                                    <BookInformation
                                        selectedDate={selectedDate}
                                        selectedTimes={selectedTime}
                                        onSelectDate={handleSelectDate}
                                        onSelectTime={handleSelectTime}
                                    />
                                </Stack>
                                {isValid(selectedDate) && selectedTime.length ? (
                                    <>
                                        <TableView
                                            bookingData={mockData}
                                            selectedHours={selectedTime.length}
                                            onChangeData={handleTableDataChange}
                                        />
                                        <BookSummary
                                            bookingData={mockData}
                                            onBook={handlePostBook}
                                            onCancelBooking={() => {}}
                                            selectedTime={selectedTime}
                                            selectedDate={selectedDate}
                                        />
                                    </>
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

export default bookingCreate
