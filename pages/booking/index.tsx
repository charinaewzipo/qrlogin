// next
import { useState, useEffect } from 'react'
// next
import Head from 'next/head'
import {
  Container,
  Autocomplete,
  TextField,
  Stack,
} from '@mui/material'
import { BOOKING_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import BookingSort from '@ku/components/Booking/BookingSort'
import BookingList from '@ku/components/Booking/BookingList'
import { fetchGetBookingMeRead } from '@ku/services/booking'
import { isEmpty } from 'lodash'
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

const BOOKING_OPTION = ['Coating Material (CM1)', 'Coating Material (CM2)', 'Coating Material (CM3)']
BookingPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
export default function BookingPage() {
  const [tableData, setTableData] = useState<Array<IV1RespGetBookingMeRead & IV1TablePayments>>([])
  const [page, setPage] = useState(1)
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('')
  const [filterSort, setFilterSort] = useState('')
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();

  useEffect(() => {
    GetBookingMeRead()
  }, [])

  const GetBookingMeRead = async () => {
    const query: IV1QueyGetBookingMeRead & IV1QueryPagination = {
      page: page,
      limit: 12,
      startTime: '',
      endTime: '',
      search: filterSearchEquipment,
      eqId: 12345,
      bookStatus: filterSort,
    }
    await fetchGetBookingMeRead(query).then(response => {
      if (response.code === 200) {
        const nextData = response.data;
        if (!isEmpty(nextData)) {
          setShowLoadMore(false)
        }
        // โชว์เฉยๆ
        // if (isEmpty(nextData)) {
        //   setShowLoadMore(false)
        // }
        setTableData(mockTableData)
        setPage(() => page + 1)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const handleSearchEquipment = (event, value) => {
    setFilterSearchEquipment(value)
    setPage(0)
    clearTimeout(countDown);
    setCountDown(
      setTimeout(() => {
        GetBookingMeRead()
      }, 1000)
    )
  }
  const handleLoadMore = () => {
    GetBookingMeRead()
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
            },
          ]}

        />
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 4 }}>
          <Autocomplete
            disablePortal
            id="search-equipment"
            onInputChange={handleSearchEquipment}
            options={BOOKING_OPTION.map(option => option)}
            renderInput={(params) => <TextField {...params} label="Search equipment" />}
            sx={{ width: 400 }}
          />
          <BookingSort
            filterSort={filterSort}
            onFilterSort={setFilterSort}
          />
        </Stack>
        <BookingList data={tableData} loading={!tableData.length} onLoadmore={handleLoadMore} showLoadMore={showLoadMore} />
      </Container>
    </>
  )
}