// next
import { useState, useEffect } from 'react'
// next
import Head from 'next/head'
import {
  Container,
  Autocomplete,
  TextField,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Box,
  Dialog,
  DialogActions,
} from '@mui/material'
import { BOOKING_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import BookingSort from '@ku/components/Booking/BookingSort'
import BookingList from '@ku/components/Booking/BookingList'
import { fetchGetBookingMeRead } from '@ku/services/booking'
import { isEmpty } from 'lodash'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Iconify from '@sentry/components/iconify/Iconify'
import { CircularProgress } from '@mui/material'
import InvoicePDF from '@ku/components/Booking/invoice/InvoicePDF'


const BOOKING_OPTION = ['Coating Material (CM1)', 'Coating Material (CM2)', 'Coating Material (CM3)']
BookingPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
export default function BookingPage() {
  const [tableData, setTableData] = useState<Array<IV1RespGetBookingMeRead & IV1TablePayments>>([])
  const [page, setPage] = useState(1)
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('')
  const [filterSort, setFilterSort] = useState('')
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  const [open, setOpen] = useState(false);
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
        setTableData([])
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLoadMore = () => {
    GetBookingMeRead()
  }
  const invoice = {
    id: "INV-001",
    sent: 1,
    status: "paid",
    totalPrice: 100.0,
    invoiceNumber: "20230001",
    subTotalPrice: 90.0,
    taxes: 10.0,
    discount: 0,
    invoiceFrom: {
      name: "ABC Corporation",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA"
    },
    invoiceTo: {
      name: "XYZ Corporation",
      address: "456 Oak Ave",
      city: "Sometown",
      state: "CA",
      zip: "67890",
      country: "USA"
    },
    createDate: new Date(),
    dueDate: new Date(2023, 4, 30),
    items: [
      {
        description: "Product A",
        quantity: 2,
        price: 45.0
      },
      {
        description: "Product B",
        quantity: 1,
        price: 10.0
      }
    ]
  };

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

        {/* <Button variant='contained' onClick={handlePDF}>PDF</Button> */}
        <PDFDownloadLink
          document={<InvoicePDF invoice={invoice} />}
          fileName={'ทดสอบ123'}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Tooltip title="Download">
              <IconButton>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Iconify icon="eva:download-fill" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </PDFDownloadLink>
        <Tooltip title="View">
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:eye-fill" />
          </IconButton>
        </Tooltip>
        <Dialog fullScreen open={open}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <DialogActions
              sx={{
                zIndex: 9,
                padding: '12px !important',
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            >
              <Tooltip title="Close">
                <IconButton color="inherit" onClick={handleClose}>
                  <Iconify icon="eva:close-fill" />

                </IconButton>
              </Tooltip>
            </DialogActions>
            <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>

              <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                <InvoicePDF invoice={invoice} />

              </PDFViewer>
            </Box>
          </Box>
        </Dialog>
        <Box sx={{ flexGrow: 1, height: '600px', overflow: 'hidden' }}>

          <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
            <InvoicePDF invoice={invoice} />

          </PDFViewer>
        </Box>
        {/* <BookingList data={tableData} loading={!tableData.length} onLoadmore={handleLoadMore} showLoadMore={showLoadMore} /> */}
      </Container>
    </>
  )
}