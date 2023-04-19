// next
import { useState, useEffect } from 'react'
// next
import Head from 'next/head'
import {
  Container,
} from '@mui/material'
import { BOOKING_PATH, MERGE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { fetchGetBookingMeRead } from '@ku/services/booking'
import { get } from 'lodash'
import BookingEstimatingForm from '@ku/components/Booking/BookingEstimatingForm'
import BookingEstimatingInvoice from '@ku/components/Booking/BookingEstimatingInvoice'
import BookingEstimatingSummary from '@ku/components/Booking/BookingEstimatingSummary'

const mockTableData: Array<IV1RespGetBookingMeRead & IV1TablePayments> = [
  {
    bookId: 35,
    eqId: 7,
    eqStatus: "AVAILABLE",
    eqCode: "111",
    eqName: "funnel",
    eqBrand: "CP",
    eqModel: "1001",
    eqDescription: "hello is",
    eqCreateBy: 123,
    eqPictures: [
      {
        eqpicLink: "http://bestzpic03.jpg",
        eqpicSort: 4
      },
      {
        eqpicLink: "http://bestzpic03.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "http://bestzpic03.jpg",
        eqpicSort: 2
      },
      {
        eqpicLink: "http://bestzpic03.jpg",
        eqpicSort: 3
      }
    ],
    eqCreatedAt: "2023-03-22T14:51:18.136Z",
    eqUpdatedAt: "2023-03-27T16:10:00.823Z",
    bookOwner: 13,
    bookAdvisor: null,
    bookStatus: "CONFIRM",
    bookCreatedAt: "2023-04-18T15:15:17.912Z",
    eqRtimDays: "2023-04-20T01:00:00.000Z",
    eqRtimTimes: [
      9,
      10
    ],
    eqPrices:
      [
        {
          eqpId: 7,
          eqpName: "SCI_KU bestz1",
          eqpEqId: 7,
          eqpTotal: 40,
          eqsubPrice: [{
            eqsubpId: 3,
            eqsubpName: "Sub SCI_KU bestz 1",
            eqsubpTotal: 40,
            eqsubpChecked: "DEFAULT",
            eqsubpUnitPer: "Bath",
            eqsubpCreatedAt: "2023-04-18T15:15:17.912252+00:00",
            eqsubpUnitPrice: 20,
            eqsubpUpdatedAt: "2023-04-18T15:15:17.912252+00:00",
            eqsubpDescription: "Sub test 001",
            eqsubpQuantity: 123
          },] as IV1EquipmentSubPrice[],
          eqpChecked: "FIXED",
          eqpQuantity: 0,
          eqpUnitPer: null,
          eqpCreatedAt: "2023-04-18T15:15:17.912252+00:00",
          eqpUpdatedAt: "2023-04-18T15:15:17.912252+00:00",
          eqpIsChecked: true,
          eqpSubOption: "AT_LEAST_ONE",
          eqpUnitPrice: null,
          eqpDescription: "bestz test 001",
          eqpTypePerson: "SCIKU_STUDENT_STAFF"
        }
      ]
    ,
    eqPriceSubTotal: 40,
    payOt: 0,
    payDiscount: 0,
    payFees: 0,
    payTotal: 40,
    payId: 1,
    payBookId: 35,
    payQuotationPicture: "http://bestzpic03.jpg",
    payInvoicePicture: "http://bestzpic03.jpg",
    payReceiptPicture: "http://bestzpic03.jpg",
    paySlipPicture: "http://bestzpic03.jpg",
    payQrPicture: "http://bestzpic03.jpg",
    payQrExpiry: "2023-04-25T01:00:00.000Z",
    payQrRef1: "123456",
    payQrRef2: "654321",
    payRemark: "Payment received",
    payBillingAddress: "123 Main St, Anytown, USA",
    payReceiptNumber: "R123456",
    payDateTime: "2023-04-19T13:00:00.000Z",
    payAmount: 40,
    payCreatedAt: "2023-04-19T13:00:00.000Z",
    payUpdatedAt: "2023-04-19T13:00:00.000Z",
  }, {
    bookId: 36,
    eqId: 8,
    eqStatus: "AVAILABLE",
    eqCode: "222",
    eqName: "screwdriver",
    eqBrand: "Stanley",
    eqModel: "12345",
    eqDescription: "น็อก อิออน ลอร์ดเห็นด้วยโอวัลตินแคร์ สต๊อกโฮลวีตมยุราภิรมย์ ไฮเวย์เอ็กซ์เพรสพ่อค้า ตะหงิดเฟรมบาลานซ์แฟ็กซ์ สปายฟยอร์ดแพลนแบ็กโฮไฮเทค มหภาคคอมพ์ รัมแล็บเทคโน มวลชนเซ็นเซอร์แรงใจ พล็อตดีพาร์ตเมนต์คูลเลอร์ลิสต์โบรกเกอร์ มือถือเลกเชอร์แอ๊บแบ๊วคลับ อพาร์ตเมนต์แฟนตาซี วิทย์สะกอมดัมพ์บร็อกโคลี พอเพียง ติ๋ม",
    eqCreateBy: 456,
    eqPictures: [
      {
        eqpicLink: "http://bestzpic01.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "http://bestzpic02.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: "2023-04-19T13:00:00.000Z",
    eqUpdatedAt: "2023-04-19T13:00:00.000Z",
    bookOwner: 14,
    bookAdvisor: null,
    bookStatus: "CONFIRM",
    bookCreatedAt: "2023-04-19T13:00:00.000Z",
    eqRtimDays: "2023-04-25T01:00:00.000Z",
    eqRtimTimes: [
      11,
      12
    ],
    eqPrices: [
      {
        eqpId: 8,
        eqpName: "Stanley Screwdriver",
        eqpEqId: 8,
        eqpTotal: 20,
        eqsubPrice: [
          {
            eqsubpId: 4,
            eqsubpName: "Bit",
            eqsubpTotal: 20,
            eqsubpChecked: "DEFAULT",
            eqsubpUnitPer: "อัน",
            eqsubpCreatedAt: "2023-04-19T13:00:00.000Z",
            eqsubpUnitPrice: 5,
            eqsubpUpdatedAt: "2023-04-19T13:00:00.000Z",
            eqsubpDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            eqsubpQuantity: 4
          }
        ],
        eqpChecked: "FIXED",
        eqpQuantity: 5,
        eqpUnitPer: "Booking",
        eqpCreatedAt: "2023-04-19T13:00:00.000Z",
        eqpUpdatedAt: "2023-04-19T13:00:00.000Z",
        eqpIsChecked: true,
        eqpSubOption: "AT_LEAST_ONE",
        eqpUnitPrice: 1000,
        eqpDescription: "Standard Screwdriver",
        eqpTypePerson: "PUBLIC"
      },
      {
        eqpId: 8,
        eqpName: "ตะหงิดเฟรมบาลานซ์แฟ็กซ์",
        eqpEqId: 8,
        eqpTotal: 20,
        eqsubPrice: [
          {
            eqsubpId: 4,
            eqsubpName: "ดัมพ์กรรมาชน",
            eqsubpTotal: 20,
            eqsubpChecked: "DEFAULT",
            eqsubpUnitPer: "ชิ้น",
            eqsubpCreatedAt: "2023-04-19T13:00:00.000Z",
            eqsubpUnitPrice: 5,
            eqsubpUpdatedAt: "2023-04-19T13:00:00.000Z",
            eqsubpDescription: "อุปนายิกาทัวร์อพาร์ทเมนต์บอกซ์ชัตเตอร์ ดัมพ์กรรมาชน ธรรมากู๋ออร์แกนอัลตรา ",
            eqsubpQuantity: 4
          }
        ],
        eqpChecked: "FIXED",
        eqpQuantity: 5,
        eqpUnitPer: "Booking",
        eqpCreatedAt: "2023-04-19T13:00:00.000Z",
        eqpUpdatedAt: "2023-04-19T13:00:00.000Z",
        eqpIsChecked: true,
        eqpSubOption: "AT_LEAST_ONE",
        eqpUnitPrice: 1000,
        eqpDescription: "น็อก อิออน ลอร์ดเห็นด้วยโอวัลตินแคร์ สต๊อกโฮลวีตมยุราภิรมย์ ไฮเวย์เอ็กซ์เพรสพ่อค้า ตะหงิดเฟรมบาลานซ์แฟ็กซ์ สปายฟยอร์ดแพลนแบ็กโฮไฮเทค มหภาคคอมพ์ รัมแล็บเทคโน มวลชนเซ็นเซอร์แรงใจ พล็อตดีพาร์ตเมนต์คูลเลอร์ลิสต์โบรกเกอร์ มือถือเลกเชอร์แอ๊บแบ๊วคลับ อพาร์ตเมนต์แฟนตาซี วิทย์สะกอมดัมพ์บร็อกโคลี พอเพียง ติ๋ม",
        eqpTypePerson: "PUBLIC"
      }
    ],
    eqPriceSubTotal: 20,
    payOt: 0,
    payDiscount: 0,
    payFees: 0,
    payTotal: 1120,
    payId: 2,
    payBookId: 36,
    payQuotationPicture: "http://bestzpic01.jpg",
    payInvoicePicture: "http://bestzpic01.jpg",
    payReceiptPicture: "http://bestzpic01.jpg",
    paySlipPicture: "http://bestzpic01.jpg",
    payQrPicture: "http://bestzpic01.jpg",
    payQrExpiry: "2023-04-25T01:00:00.000Z",
    payQrRef1: "123456",
    payQrRef2: "654321",
    payRemark: "Payment received",
    payBillingAddress: "123 Main St, Anytown, USA",
    payReceiptNumber: "R123456",
    payDateTime: "2023-04-19T13:00:00.000Z",
    payAmount: 40,
    payCreatedAt: "2023-04-19T13:00:00.000Z",
    payUpdatedAt: "2023-04-19T13:00:00.000Z",
  }
]


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
        setBookDetail(mockTableData[1])
      }
    }).catch(err => {
      console.log(err)
    })
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
        <BookingEstimatingInvoice book={bookDeatail} />
        <BookingEstimatingForm book={bookDeatail} reduxCode={generated_redux_store_code} />
      </Container>
    </>
  )
}