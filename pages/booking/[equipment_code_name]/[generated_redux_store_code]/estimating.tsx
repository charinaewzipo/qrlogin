// next
import { useState, useEffect } from 'react'
// next
import Head from 'next/head'
import {
  Container,
  Autocomplete,
  TextField,
  Stack,
  Card,
  Grid,
  Typography,
  Box,
} from '@mui/material'
import { BOOKING_PATH, MERGE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import BookingSort from '@ku/components/Booking/BookingSort'
import BookingList from '@ku/components/Booking/BookingList'
import { fetchGetBookingMeRead } from '@ku/services/booking'
import { get, isEmpty } from 'lodash'
import { format } from 'date-fns'
import Label from '@sentry/components/label/Label'
import BookingSummary from '@ku/components/Booking/BookingEstimatingSummary'
import { useRouter } from 'next/router'
import BookingInvoice from '@ku/components/Booking/BookingEstimatingInvoice'
import BookingEstimatingForm from '@ku/components/Booking/BookingEstimatingForm'
import BookingEstimatingInvoice from '@ku/components/Booking/BookingEstimatingInvoice'
import BookingEstimatingSummary from '@ku/components/Booking/BookingEstimatingSummary'
const mockTableData: Array<IV1RespGetBookingMeRead & IV1TablePayments> = [
  {
    eqId: 1,
    eqCreateBy: 1,
    eqStatus: "Available",
    eqCode: "EQ0001",
    eqName: "Excavator",
    eqBrand: "Caterpillar",
    eqModel: "CAT320",
    eqDescription: "A heavy equipment machine used in construction",
    eqPictures: [
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: 1648753212000,
    eqUpdatedAt: 1648753212000,
    bookId: 1,
    bookOwner: 1,
    bookAdvisor: 2,
    bookStatus: "confirmed",
    eqprices: [
      {
        eqpId: 1,
        eqpEqId: 1,
        eqpTypePerson: "operator",
        eqpSubOption: "",
        eqpChecked: "",
        eqpIsChecked: true,
        eqpName: "Rental fee",
        eqpDescription: "StarndardStarndard optionsStarndard optionsStarndard optionsStarndard options options",
        eqpQuantity: 3,
        eqpTotal: 15000,
        eqpUnitPrice: 5000,
        eqpUnitPer: "hour",
        eqpCreatedAt: 1648753212000,
        eqpUpdatedAt: 1648753212000,
        eqsubprice: [
          {
            eqsubpId: 1,
            eqsubpChecked: "yes",
            eqsubpName: "Laptop",
            eqsubpDescription: "Macbook Pro 13-inch",
            eqsubpUnitPrice: 1399.99,
            eqsubpUnitPer: "piece",
            eqsubpQuantity: 2,
            eqsubpTotal: 2799.98,
            eqsubpCreatedAt: 1649126400,
            eqsubpUpdatedAt: 1649212800
          }, {
            eqsubpId: 2,
            eqsubpChecked: "yes",
            eqsubpName: "Laptop",
            eqsubpDescription: "Macbook Pro 13-inch",
            eqsubpUnitPrice: 1399.99,
            eqsubpUnitPer: "piece",
            eqsubpQuantity: 2,
            eqsubpTotal: 2799.98,
            eqsubpCreatedAt: 1649126400,
            eqsubpUpdatedAt: 1649212800
          }]
      }, {
        eqpId: 1,
        eqpEqId: 1,
        eqpTypePerson: "operator",
        eqpSubOption: "",
        eqpChecked: "",
        eqpIsChecked: true,
        eqpName: "Rental fee",
        eqpDescription: "StarndardStarndard optionsStarndard optionsStarndard optionsStarndard options options",
        eqpQuantity: 3,
        eqpTotal: 5000,
        eqpUnitPrice: 5010,
        eqpUnitPer: "hour",
        eqpCreatedAt: 1648753212000,
        eqpUpdatedAt: 1648753212000,
        eqsubprice: [
        ]
      }
    ],
    eqpriceSubTotal: 500,
    payOt: 0,
    payDiscount: 50,
    payFees: 20,
    payTotal: 4700,
    payId: 1,
    payBookId: 1,
    payQuotationPicture: "https://example.com/quotation.jpg",
    payInvoicePicture: "https://example.com/invoice.jpg",
    payReceiptPicture: "https://example.com/receipt.jpg",
    paySlipPicture: "",
    payQrPicture: "",
    payQrExpiry: 1648753212000,
    payQrRef1: "ABC123",
    payQrRef2: "",
    payRemark: "Paid in full",
    payBillingAddress: "123 Main Street, Anytown, USA",
    payReceiptNumber: "R-0001",
    payDateTime: 1648753212000,
    payAmount: 470,
    payCreatedAt: 1648753212000,
    payUpdatedAt: 1648753212000
  }, {
    eqId: 3,
    eqCreateBy: 1,
    eqStatus: "Available",
    eqCode: "EQ0001",
    eqName: "Excavator",
    eqBrand: "Caterpillar",
    eqModel: "CAT320",
    eqDescription: "A heavy equipment machine used in construction",
    eqPictures: [
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: 1648753212000,
    eqUpdatedAt: 1648753212000,
    bookId: 1,
    bookOwner: 1,
    bookAdvisor: 2,
    bookStatus: "confirmed",
    eqprices: [
      {
        eqpId: 1,
        eqpEqId: 1,
        eqpTypePerson: "operator",
        eqpSubOption: "",
        eqpChecked: "",
        eqpIsChecked: true,
        eqpName: "Rental fee",
        eqpDescription: "",
        eqpQuantity: 1,
        eqpTotal: 500,
        eqpUnitPrice: 500,
        eqpUnitPer: "hour",
        eqpCreatedAt: 1648753212000,
        eqpUpdatedAt: 1648753212000,
        eqsubprice: []
      }
    ],
    eqpriceSubTotal: 500,
    payOt: 0,
    payDiscount: 50,
    payFees: 20,
    payTotal: 470,
    payId: 1,
    payBookId: 1,
    payQuotationPicture: "https://example.com/quotation.jpg",
    payInvoicePicture: "https://example.com/invoice.jpg",
    payReceiptPicture: "https://example.com/receipt.jpg",
    paySlipPicture: "",
    payQrPicture: "",
    payQrExpiry: 1648753212000,
    payQrRef1: "ABC123",
    payQrRef2: "",
    payRemark: "Paid in full",
    payBillingAddress: "123 Main Street, Anytown, USA",
    payReceiptNumber: "R-0001",
    payDateTime: 1648753212000,
    payAmount: 470,
    payCreatedAt: 1648753212000,
    payUpdatedAt: 1648753212000
  }, {
    eqId: 2,
    eqCreateBy: 1,
    eqStatus: "Unavailable",
    eqCode: "EQ0001",
    eqName: "Excavator",
    eqBrand: "Caterpillar",
    eqModel: "CAT320",
    eqDescription: "A heavy equipment machine used in construction",
    eqPictures: [
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: 1648753212000,
    eqUpdatedAt: 1648753212000,
    bookId: 1,
    bookOwner: 1,
    bookAdvisor: 2,
    bookStatus: "confirmed",
    eqprices: [
      {
        eqpId: 1,
        eqpEqId: 1,
        eqpTypePerson: "operator",
        eqpSubOption: "",
        eqpChecked: "",
        eqpIsChecked: true,
        eqpName: "Rental fee",
        eqpDescription: "",
        eqpQuantity: 1,
        eqpTotal: 500,
        eqpUnitPrice: 500,
        eqpUnitPer: "hour",
        eqpCreatedAt: 1648753212000,
        eqpUpdatedAt: 1648753212000,
        eqsubprice: []
      }
    ],
    eqpriceSubTotal: 500,
    payOt: 0,
    payDiscount: 50,
    payFees: 20,
    payTotal: 470,
    payId: 1,
    payBookId: 1,
    payQuotationPicture: "https://example.com/quotation.jpg",
    payInvoicePicture: "https://example.com/invoice.jpg",
    payReceiptPicture: "https://example.com/receipt.jpg",
    paySlipPicture: "",
    payQrPicture: "",
    payQrExpiry: 1648753212000,
    payQrRef1: "ABC123",
    payQrRef2: "",
    payRemark: "Paid in full",
    payBillingAddress: "123 Main Street, Anytown, USA",
    payReceiptNumber: "R-0001",
    payDateTime: 1648753212000,
    payAmount: 470,
    payCreatedAt: 1648753212000,
    payUpdatedAt: 1648753212000
  }]

BookingPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
export default function BookingPage() {
  const [bookDeatail, setBookDetail] = useState<IV1RespGetBookingMeRead & IV1TablePayments>(null)

  //receive from prev page
  const generated_redux_store_code = 123456

  useEffect(() => {
    GetBookingMeRead()
  }, [])

  const GetBookingMeRead = async () => {
    const query: IV1QueyGetBookingMeRead & IV1QueryPagination = {
      page: 1,
      limit: 9999,
      startTime: '',
      endTime: '',
      search: '',
      eqId: generated_redux_store_code,
      bookStatus: '',
    }
    await fetchGetBookingMeRead(query).then(response => {
      if (response.code === 200) {
        setBookDetail(mockTableData[0])
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const handleDownloadPDF = () => {
    //handleDownloadPDF
  }
  return (
    <>
      <Head>
        <title> Booking | KU</title>
      </Head>
      <Container>
        <CustomBreadcrumbs
          heading={'Booking'}
          links={[
            {
              name: 'Booking',
              href: BOOKING_PATH,
            },
            {
              name: 'List',
              href: BOOKING_PATH,
            },
            {
              name: get(bookDeatail, 'eqName', ''),
              href: (MERGE_PATH(BOOKING_PATH, get(bookDeatail, 'eqName', '').toString(), generated_redux_store_code.toString()))
            },
            {
              name: 'Estimating',
            },
          ]}
        />
        <BookingEstimatingSummary book={bookDeatail} />
        <BookingEstimatingInvoice book={bookDeatail} onDownloadPDF={handleDownloadPDF} />
        <BookingEstimatingForm book={bookDeatail} reduxCode={generated_redux_store_code} />
      </Container>
    </>
  )
}