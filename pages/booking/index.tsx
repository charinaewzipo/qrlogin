// next
import { useState, useEffect, useCallback } from 'react'
// next
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  Tooltip,
  IconButton,
  TablePagination,
  Box,
  useTheme,
  Autocomplete,
  TextField,
  Stack,
  MenuItem,
} from '@mui/material'
import { BOOKING_PATH, EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import Label from '@sentry/components/label'
import Iconify from '@sentry/components/iconify'
import Scrollbar from '@sentry/components/scrollbar'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  getComparator,
} from '@sentry/components/table'
import AccountAdminRow from '@ku/components/Account/AccountAdminRow'
import { fetchGetAssessments } from '@ku/services/assessment'
import { useSnackbar } from 'notistack'
import AccountAdminToolsbar from '@ku/components/Account/AccountAdminToolsbar'
import { Typography } from '@mui/material'
import EquipmentToolbar from '@ku/components/Equipment/EquipmentToolsbar'
import EquipmentRow from '@ku/components/Equipment/EquipmentRow'
import Image from '@sentry/components/image/Image'
import BookingSort from '@ku/components/Booking/BookingSort'

const BOOKING_OPTION = ['Coating Material (CM1)', 'Coating Material (CM2)', 'Coating Material (CM3)']
BookingPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
export default function BookingPage() {
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('')
  const [filterSort, setFilterSort] = useState('')
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
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
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            id="search-equipment"
            onInputChange={handleSearchEquipment}
            options={BOOKING_OPTION.map(option => option)}
            renderInput={(params) => <TextField {...params} label="Search equipment" />}
            sx={{ width: 300 }}
          />
          <BookingSort
            filterSort={filterSort}
            onFilterSort={setFilterSort}
          />
        </Stack>
      </Container>
    </>
  )
}