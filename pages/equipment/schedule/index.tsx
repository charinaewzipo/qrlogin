// next
import { useState, useEffect } from 'react'
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
  TableBody,
  Container,
  TableContainer,
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
  TableNoData,
  TableHeadCustom,
} from '@sentry/components/table'

import { useSnackbar } from 'notistack'
import { Typography } from '@mui/material'
import EquipmentScheduleRow from '@ku/components/Equipment/EquipmentScheduleRow'
import EquipmentScheduleToolsbar from '@ku/components/Equipment/EquipmentScheduleToolsbar'
import { format } from 'date-fns'
import { LoadingButton } from '@mui/lab';
import ConfirmDialog from '@ku/components/ConfirmDialog'
import { get, isEmpty, pickBy } from 'lodash'
import { fetchGetUnAvailableSchedule, fetchGetUnAvailableScheduleStats, fetchPostEquipmentUnavailableDelete } from '@ku/services/equipment'
import { getTimeOfDay } from '@ku/utils/formatDate'

const initialScheduleStats = {
  upcomingCount: 0,
  finishCount: 0,
}

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

  const [tableData, setTableData] = useState<IV1RespGetEquipmentUnavailableSchedule[]>([])
  const [scheduleStats, setScheduleStats] = useState<IV1RespGetEquipmentUnavailableStatsSchedule>()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('PENDING')
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  const [detailSchedule, setDetailSchedule] = useState<IV1RespGetEquipmentUnavailableSchedule>(null)
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()

  useEffect(() => {
    GetUnAvailableScheduleStats()
    GetUnAvailableSchedule()
  }, [])

  useEffect(() => {
    setPage(0)
    clearTimeout(countDown);
    setCountDown(
      setTimeout(() => {
        GetUnAvailableSchedule()
      }, 1000)
    );
  }, [page, rowsPerPage, filterStartDate, filterEndDate, filterStatus])

  const GetUnAvailableScheduleStats = async () => {
    await fetchGetUnAvailableScheduleStats().then(response => {
      if (response.code === 200000) {
        setScheduleStats(get(response, 'data', initialScheduleStats))
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const GetUnAvailableSchedule = async () => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentUnavailableSchedule = {
      page: page,
      limit: rowsPerPage,
      startTime: filterStartDate,
      endTime: filterEndDate,
      status: filterStatus as IEquipmentUnavailableStatus,
    }
    Object.keys(query).forEach(key => {
      if (query[key] === null || query[key] === undefined) {
        delete query[key]
      }
    })
    console.log("query", query)
    await fetchGetUnAvailableSchedule((query)).then(response => {
      console.log("response.data", response.data)
      if (response.code === 200000) {
        setTableData(get(response, 'data.dataList', []))
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const PostEquipmentUnavailableDelete = async () => {
    const query: IV1PostEquipmentUnavailableDelete = {
      equnavascheId: get(detailSchedule, 'equnavascheId', -1)
    }
    await fetchPostEquipmentUnavailableDelete(query).then(response => {
      if (response.code === 200000) {
        enqueueSnackbar(`Cancelled schedule of ${format(new Date(get(detailSchedule, 'activeDate', new Date())), 'dd MMM yyyy')} (${getTimeOfDay(get(detailSchedule, 'equnavascheTimes', []))}).`)
      }
    }).catch(err => {
      enqueueSnackbar(`Failled cancel schedule of ${format(new Date(get(detailSchedule, 'activeDate', new Date())), 'dd MMM yyyy')} (${getTimeOfDay(get(detailSchedule, 'equnavascheTimes', []))}).`, { variant: 'error' })
      console.log(err)
    }).finally(() => {
      GetUnAvailableSchedule()
    })
  }

  const TABS = [
    { value: 'PENDING', label: 'Upcoming', color: 'warning', count: get(scheduleStats, 'upcomingCount', 0) },
    {
      value: 'FINISH',
      label: 'Finish',
      color: 'default',
      count: get(scheduleStats, 'finishCount', 0),
    },
  ] as const

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0)
    setFilterStatus(newValue)
  }

  const handleViewRow = (id: number) => {
    push(MERGE_PATH(EQUIPMENT_PATH, '/schedule/detail', id.toString()))
  };

  const handleOnCancel = (item: IV1RespGetEquipmentUnavailableSchedule) => {
    setDetailSchedule(item)
    setOpenConfirmModal(true)

  }
  const handleOnClickModal = () => {
    setOpenConfirmModal(false)
    PostEquipmentUnavailableDelete()
  }
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


          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                />

                <TableBody>
                  {!isEmpty(tableData) &&
                    tableData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <EquipmentScheduleRow
                            key={get(row, 'equnavascheId', -1)}
                            row={row}
                            onViewRow={() => handleViewRow(get(row, 'equnavascheId', -1))}
                            onRemove={() => handleOnCancel(row)}
                          />
                        )
                      })}
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
      <ConfirmDialog
        open={openConfirmModal}
        textCancel="No, I’m not sure"
        colorButton='inherit'
        onClose={() => { setOpenConfirmModal(false) }}
        title="Are you sure!"
        content={
          <Box>
            {[
              { sx: { mb: 0 }, text: `To cancel upcoming ${format(new Date(get(detailSchedule, 'equnavascheCreatedAt', new Date())), 'dd MMM yyyy')} ${getTimeOfDay(get(detailSchedule, 'equnavascheTimes', []))} schedule` },
              { sx: { my: 2 }, text: `Remark: after you cancelled schedule, you can not \nrecover this schedule.` },
            ].map((i, index) => (
              <Typography
                key={'contact' + index}
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  ...i.sx,
                }}
              >
                {i.text}
              </Typography>
            ))}
          </Box>
        }
        action={
          <LoadingButton
            fullWidth
            color='error'
            size="large"
            type="button"
            variant="contained"
            onClick={
              handleOnClickModal
            }
          >
            {"Yes, Cancel"}
          </LoadingButton>}
      />
    </>
  )
}
