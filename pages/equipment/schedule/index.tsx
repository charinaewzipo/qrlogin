// next
import { useState, useEffect, useRef } from 'react'
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
  TablePaginationCustom,
} from '@sentry/components/table'

import { useSnackbar } from 'notistack'
import { Typography } from '@mui/material'
import EquipmentScheduleRow from '@ku/components/Equipment/EquipmentScheduleRow'
import EquipmentScheduleToolsbar from '@ku/components/Equipment/EquipmentScheduleToolsbar'
import { isValid } from 'date-fns'
import { LoadingButton } from '@mui/lab';
import ConfirmDialog from '@ku/components/ConfirmDialog'
import { get, isEmpty, isNull, isUndefined } from 'lodash'
import { fetchGetUnAvailableSchedule, fetchGetUnAvailableScheduleStats, fetchPostEquipmentUnavailableDelete } from '@ku/services/equipment'
import { getTimeOfDay } from '@ku/utils/formatDate'
import messages from '@ku/constants/response'
import responseCode from '@ku/constants/responseCode'
import { AxiosError } from 'axios'
import { fDateTimeFormat } from '@sentry/utils/formatDateTime'
import { fDateTimeFormatAPI } from '@ku/utils/formatDate'
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
    rowsPerPage,
    setPage,
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
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()

  const TABS = [
    { value: 'PENDING', label: 'Upcoming', color: 'warning', count: get(scheduleStats, 'upcomingCount', 0) },
    {
      value: 'FINISH',
      label: 'Finish',
      color: 'default',
      count: get(scheduleStats, 'finishCount', 0),
    },
  ] as const


  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true
      GetUnAvailableScheduleStats()
      GetUnAvailableSchedule()
    } else {
      // do componentDidUpdate logic
      clearTimeout(countDown);
      setCountDown(
        setTimeout(() => {
          GetUnAvailableScheduleStats()
          GetUnAvailableSchedule()
        }, 1000)
      );
    }
  }, [page, rowsPerPage, filterStartDate, filterEndDate, filterStatus]);

  const GetUnAvailableScheduleStats = () => {
    fetchGetUnAvailableScheduleStats().then(response => {
      if (response.code === responseCode.OK_CODE) {
        setScheduleStats(get(response, 'data', initialScheduleStats))
      }
    }).catch((err: AxiosError) => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    })
  }
  const GetUnAvailableSchedule = () => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentUnavailableSchedule = {
      page: page + 1,
      limit: rowsPerPage,
      startTime: !isNull(filterStartDate) && isValid(filterStartDate) ? fDateTimeFormatAPI(filterStartDate) : null,
      endTime: !isNull(filterEndDate) && isValid(filterEndDate) ? fDateTimeFormatAPI(filterEndDate) : null,
      status: filterStatus as IEquipmentUnavailableStatus,
    }
    Object.keys(query).forEach(key => {
      if (isNull(query[key]) || isUndefined(query[key])) {
        delete query[key]
      }
    })
    fetchGetUnAvailableSchedule(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        setTableData(get(response, 'data.dataList', []))
        setTotalRecord(get(response, 'data.totalRecord', 0))
      }
    }).catch((err: AxiosError) => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    })
  }

  const PostEquipmentUnavailableDelete = () => {
    const query: IV1PostEquipmentUnavailableDelete = {
      equnavascheId: get(detailSchedule, 'equnavascheId', -1)
    }
    fetchPostEquipmentUnavailableDelete(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        enqueueSnackbar(`Cancelled schedule of ${fDateTimeFormat(get(detailSchedule, 'equnavascheDays', ''), 'DD MMM YYYY')} (${getTimeOfDay(get(detailSchedule, 'equnavascheTimes', []))}).`)
      }
    }).catch((err: AxiosError) => {
      enqueueSnackbar(`Failled cancel schedule of ${fDateTimeFormat(get(detailSchedule, 'equnavascheDays', ''), 'DD MMM YYYY')} (${getTimeOfDay(get(detailSchedule, 'equnavascheTimes', []))}).`, { variant: 'error' })

    }).finally(() => {
      GetUnAvailableScheduleStats()
      GetUnAvailableSchedule()
    })
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
            onChange={(event, newValue) => {
              setPage(0)
              setFilterStatus(newValue)
            }}
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
              setPage(0)
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setPage(0)
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
                    tableData.map((row) => {
                      return (
                        <EquipmentScheduleRow
                          key={get(row, 'equnavascheId', -1)}
                          row={row}
                          onViewRow={() => handleViewRow(get(row, 'equnavascheId', -1))}
                          onRemove={() => handleOnCancel(row)}
                        />
                      )
                    })}
                  <TableNoData isNotFound={isEmpty(tableData)} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={totalRecord}
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

              { sx: { mb: 0 }, text: `To cancel upcoming ${fDateTimeFormat(get(detailSchedule, 'equnavascheDays', ''), 'DD MMM YYYY')} ${getTimeOfDay(get(detailSchedule, 'equnavascheTimes', []))} schedule` },
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
