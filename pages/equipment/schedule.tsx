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
} from '@mui/material'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
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
  TableSelectedAction,
  TableSkeleton,
  getComparator,
} from '@sentry/components/table'
import { fetchGetAssessments } from '@ku/services/assessment'
import { useSnackbar } from 'notistack'
import { Typography } from '@mui/material'
import EquipmentToolbar from '@ku/components/Equipment/EquipmentToolsbar'
import EquipmentRow from '@ku/components/Equipment/EquipmentRow'
import Image from '@sentry/components/image/Image'
import EquipmentScheduleRow from '@ku/components/Equipment/EquipmentScheduleRow'
import EquipmentScheduleToolsbar from '@ku/components/Equipment/EquipmentScheduleToolsbar'


const mockDataTable: IEquipmentSchedule[] = [{
  id: "27658a79-ac6c-4003-b927-23b260840201",
  activeDate: new Date().toString(),
  time: "Full Day",
  createBy: 'Simsimi ok',
  createAt: new Date().toString(),
  status: "Finish"
},
{
  id: "27658a79-ac6c-4003-b927-23b260840202",
  activeDate: new Date().toString(),
  time: "Early morning",
  createBy: 'Simsimi ok',
  createAt: new Date().toString(),
  status: "Finish"
}, {
  id: "27658a79-ac6c-4003-b927-23b260840203",
  activeDate: new Date().toString(),
  time: "Early morning",
  createBy: 'Simsimi okSimsimi okSimsimi okSimsimi ok',
  createAt: new Date().toString(),
  status: "Pending"
}, {
  id: "27658a79-ac6c-4003-b927-23b260840204",
  activeDate: new Date().toString(),
  time: "Afternoon",
  createBy: 'Simsimi ok',
  createAt: new Date().toString(),
  status: "Pending"
},
]

const TABLE_HEAD = [
  { id: 'activeDate', label: 'Active date', align: 'left', width: 150 },
  { id: 'time', label: 'Time', align: 'left' },
  { id: 'createBy', label: 'Create by', align: 'left', width: 250 },
  { id: 'createAt', label: 'Create at', align: 'left' },
  { id: 'status', label: 'Status', align: 'left', width: 120 },
  { id: 'button', label: '', align: 'left', width: 150 },
];

EquipmentSchedulePage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function EquipmentSchedulePage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [tableData, setTableData] = useState<IEquipmentSchedule[]>([])
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('upcoming')
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  const theme = useTheme()
  const { push } = useRouter()
  useEffect(() => {
    getEquipmentList()
  }, [])
  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.status === status).length

  const TABS = [
    // { value: 'all', label: 'All', color: 'default', count: tableData.length },
    { value: 'upcoming', label: 'Upcoming', color: 'warning', count: getLengthByStatus('Pending') },
    {
      value: 'Finish',
      label: 'Finish',
      color: 'default',
      count: getLengthByStatus('Finish'),
    },

  ] as const
  const getEquipmentList = async () => {
    // TODO: Add filter parameter
    const response = await fetchGetAssessments()
    if (response.data) {
      setTableData(mockDataTable)
      // setTableData(response.data)
    }
  }
  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0)
    setFilterStatus(newValue)
    console.log("filterStatus", filterStatus)
  }

  const handleViewRow = (id: string) => {
    push(MERGE_PATH(EQUIPMENT_PATH, '/schedule/detail', id))
  };

  const isNotFound = (!tableData.length)

  return (
    <>
      <Head>
        <title> Equipments | KU</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading={'Equipments'}
          links={[
            {
              name: 'Equipments',
              href: EQUIPMENT_PATH,
            },
            {
              name: 'List',
              href: EQUIPMENT_PATH,
            },
            {
              name: 'Manage Available Schedules',
            },
          ]}
          action={
            <NextLink href={MERGE_PATH(EQUIPMENT_PATH, 'schedule/create')} passHref >
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create Schedule
              </Button>
            </NextLink>
          }
        />
        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>
          <EquipmentScheduleToolsbar
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          {/* <Divider /> */}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <EquipmentScheduleRow
                          key={row.id}
                          row={row}
                          onViewRow={() => handleViewRow(row.id)}
                        />
                      )
                    })}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>

    </>
  )
}
