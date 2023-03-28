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
import { fetchGetAssessments } from '@ku/services/assessment'
import BookingSort from '@ku/components/Booking/BookingSort'
import BookingList from '@ku/components/Booking/BookingList'
const mockDataTable: IBookingProduct[] = [
  {
    id: "27658a79-ac6c-4003-b927-23b260840201",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg',
    status: 'Available',
    category: 'CM1'
  },
  {
    id: "27658a79-ac6c-4003-b927-23b260840202",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg',
    status: "Unavailable",
    category: 'CM1'
  },
  {
    id: "27658a79-ac6c-4003-b927-23b260840203",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
    status: "Available",
    category: 'CM1'
  }, {
    id: "27658a79-ac6c-4003-b927-23b260840204",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
    status: "Unavailable",
    category: 'CM1'
  }, {
    id: "27658a79-ac6c-4003-b927-23b260840201",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg',
    status: 'Available',
    category: 'CM1'
  },
  {
    id: "27658a79-ac6c-4003-b927-23b260840202",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg',
    status: "Unavailable",
    category: 'CM1'
  },
  {
    id: "27658a79-ac6c-4003-b927-23b260840203",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
    status: "Available",
    category: 'CM1'
  }, {
    id: "27658a79-ac6c-4003-b927-23b260840204",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
    status: "Unavailable",
    category: 'CM1'
  }, {
    id: "27658a79-ac6c-4003-b927-23b260840201",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg',
    status: 'Available',
    category: 'CM1'
  },
  {
    id: "27658a79-ac6c-4003-b927-23b260840202",
    name: "Coating Material",
    cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg',
    status: "Unavailable",
    category: 'CM1'
  },

]
const BOOKING_OPTION = ['Coating Material (CM1)', 'Coating Material (CM2)', 'Coating Material (CM3)']
BookingPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
export default function BookingPage() {
  const [tableData, setTableData] = useState<IBookingProduct[]>([])
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('')
  const [filterSort, setFilterSort] = useState('')
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();

  useEffect(() => {
    getEquipmentList()
  }, [])


  const getEquipmentList = async () => {
    // TODO: Add filter parameter
    const response = await fetchGetAssessments()
    if (response.data) {
      setTableData(mockDataTable)
      // setTableData(response.data)
    }
  }
  const handleSearchEquipment = (event, value) => {
    console.log(value)
    setFilterSearchEquipment(value)
    clearTimeout(countDown);
    setCountDown(
      setTimeout(() => {
        console.log("hello time out")
      }, 1000)
    )
  }
  const handleLoadMore = () => {
    console.log("load more")
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
        <BookingList data={tableData} loading={!tableData.length} onLoadmore={handleLoadMore} />
      </Container>
    </>
  )
}