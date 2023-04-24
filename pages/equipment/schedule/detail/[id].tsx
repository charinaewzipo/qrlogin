import React, { useRef } from 'react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import * as Yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getTimeOfDay } from '@ku/utils/formatDate'
import {
  Table,
  TableBody,
  Container,
  TableContainer,
  Box,
  useTheme,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  FormHelperText,
} from '@mui/material'
import responseCode from '@ku/constants/responseCode'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import Iconify from '@sentry/components/iconify'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TableSkeleton,
  TablePaginationCustom,
} from '@sentry/components/table'
import { useSnackbar } from 'notistack'
import { addDays, format, isValid } from 'date-fns'
import { LoadingButton } from '@mui/lab';
import EquipmentScheduleCreateRow from '@ku/components/Equipment/EquipmentScheduleCreateRow'
import { Avatar } from '@mui/material'
import FormProvider from '@sentry/components/hook-form/FormProvider'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@mui/x-date-pickers'
import { RHFAutocomplete } from '@sentry/components/hook-form'
import { debounce, get, isEmpty, isNull, isUndefined } from 'lodash'
import { fetchGetEquipmentRead, fetchGetUnAvailableSchedule, fetchPostEquipmentUnavailableUpdate } from '@ku/services/equipment'
import messages from '@ku/constants/response'
import uuidv4 from '@sentry/utils/uuidv4'
import { TIME_OPTIONS } from '@ku/constants/variables'
import { fDateTimeFormat } from '@sentry/utils/formatDateTime'

const initialDataDetail = {
  equnavascheId: -1,
  equnavascheCreatedByName: '',
  equnavascheDays: '',
  equnavascheTimes: [],
  equnavascheStatus: '',
  equnavascheCreatedAt: '',
  equnavascheUpdatedAt: '',
}
const TABLE_HEAD = [
  { id: 'eqName', label: 'Equipment', align: 'left' },
];
type FormValuesProps = {
  date: Date | null,
  time: string,
  afterSubmit?: string
}

EquipmentScheduleDetailPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
export default function EquipmentScheduleDetailPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
  } = useTable();

  const [tableData, setTableData] = useState<IV1PostEquipmentRead[]>([])
  const [tableAllData, setTableAllData] = useState<IV1PostEquipmentRead[]>([])
  const [dataScheduleDetail, setDataScheduleDetail] = useState<IV1RespGetEquipmentUnavailableSchedule>()
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('');
  const [isErrorSelectEquipment, setIsErrorSelectEquipment] = useState(false)
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()
  const router = useRouter()
  const mounted = useRef(false);
  useEffect(() => {
    if (isErrorSelectEquipment && selected.length > 0) {
      setIsErrorSelectEquipment(false)
    }
  }, [selected])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      callBackTimeout(0, rowsPerPage, filterSearchEquipment)
    }
  }, [filterSearchEquipment])

  useEffect(() => {
    setValue('date', new Date(mapDate));
    setValue('time', mapTime.label);
  }, [dataScheduleDetail])

  useEffect(() => {
    if (!isEmpty(router.query.id)) {
      GetUnAvailableSchedule()
      GetEquipmentRead(0, rowsPerPage, filterSearchEquipment)
      getEQ2All()
      return debouncedCallback.cancel
    }
  }, [router])

  const debouncedCallback = debounce((pageToGo: number, limit: number, search: string) => { GetEquipmentRead(pageToGo, limit, search) }, 1000)
  const callBackTimeout = useCallback(debouncedCallback, [])

  const mapTime = TIME_OPTIONS.find(i => i.title === getTimeOfDay(get(dataScheduleDetail, 'equnavascheTimes', [])))
  const mapDate = fDateTimeFormat(get(dataScheduleDetail, 'equnavascheDays', new Date()), 'DD MMM YYYY')

  const EquipmentScheduleScheme = Yup.object().shape({
    date: Yup.date().min(new Date(), 'Please choose future date').nullable().typeError('Invalid Date').required('Date is require'),
    time: Yup.string().required('Time is require'),
  })

  const defaultValues: FormValuesProps = useMemo(() => ({
    date: null,
    time: ''
  }), [])
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EquipmentScheduleScheme),
    defaultValues,
  })
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods

  const GetUnAvailableSchedule = () => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentUnavailableSchedule = {
      page: 1,
      limit: 1,
      equnavascheId: Number(get(router, 'query.id', -1))
    }
    Object.keys(query).forEach(key => {
      if (isNull(query[key]) || isUndefined(query[key])) {
        delete query[key]
      }
    })
    fetchGetUnAvailableSchedule(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        setDataScheduleDetail(get(response, 'data.dataList[0]', initialDataDetail))
      }
    }).catch((err) => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    })
  }
  const GetEquipmentRead = (pageToGo: number, limit: number, search: string, isSortName: boolean = false, isQuery: boolean = false) => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
      page: pageToGo + 1,
      limit: limit,
      eqId: isQuery ? get(router, 'query.id', '').toString() : '',
      eqStatus: '',
      eqSearch: search,
      eqSortName: isSortName,
      eqSortCode: false,
    }
    Object.keys(query).forEach(key => {
      if (isNull(query[key]) || isUndefined(query[key]) || query[key] === "") {
        delete query[key]
      }
    })
    fetchGetEquipmentRead(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        if (isQuery) {
          const data = get(response, 'data.dataList', [])
          const ArrayNumber = data.map(i => i.eqId)
          setSelected(ArrayNumber)
        } else {
          setTableData(get(response, 'data.dataList', []))
          setTotalRecord(get(response, 'data.totalRecord', 0))
          setPage(pageToGo)
        }
      }
    }).catch(err => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    })
  }

  const getEQ2All = () => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
      page: 1, limit: 9999999,
      eqSortName: false, eqSortCode: false,
    }
    fetchGetEquipmentRead(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        setTableAllData(get(response, 'data.dataList', []))
      }
    }).catch(err => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }).finally(() => {
      //get detail selected Equipment
      GetEquipmentRead(0, rowsPerPage, filterSearchEquipment, false, true)
    })
  }
  const PostEquipmentUpdate = (data: FormValuesProps) => {
    const mapTimePost = TIME_OPTIONS.find(i => i.label === data.time)
    const ArrayEqID = selected.map(numString => parseInt(numString))
    const query: IV1PostEquipmentUnavailableUpdate = {
      equnavascheId: Number(get(router, 'query.id', -1)),
      date: !isNull(data.date) && isValid(data.date) ? fDateTimeFormat(data.date, 'YYYY-MM-DDT00:00:00') : null,
      times: mapTimePost.value,
      eqId: ArrayEqID,
    }
    fetchPostEquipmentUnavailableUpdate(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        reset()
        setSelected([])
        push(MERGE_PATH(EQUIPMENT_PATH, '/schedule'))
        enqueueSnackbar(`Updated schedule of ${format(get(data, 'date', addDays(new Date(), 1)), 'dd MMM yyyy')} (${(get(data, 'time', 'Afternoon (13:00 - 22:00)')).split(' (', 1)}).`)
      }
    }).catch(err => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    })
  }
  const handleViewRow = (id: string) => {
    onSelectRow(id)
  };
  const handleFilterSearchEquipment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearchEquipment(event.target.value);
  }
  const handleOnclickRemove = () => {
    setSelected([])
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(event.target.value, 10)
    setRowsPerPage(limit)
    GetEquipmentRead(0, limit, filterSearchEquipment)
  }
  const onSubmit = (data: FormValuesProps) => {
    if (!isErrorSelectEquipment) {
      PostEquipmentUpdate(data)
    }
  }
  const RenderChips = useMemo(() => {
    return (
      <Box sx={{ mx: 3, mb: 2 }}>
        {isErrorSelectEquipment && <FormHelperText sx={{ color: theme.palette.error.main, ml: 2, my: 1 }}>Please select equipment at lest 1 item</FormHelperText>}
        {selected.map((id, index) => {
          const findData = tableAllData.find(i => i.eqId === id)
          return (
            <React.Fragment key={index}>
              {!isEmpty(findData) &&
                <Chip
                  size='small'
                  avatar={<Avatar alt={get(findData, 'eqName', '')} src={`${get(findData, 'eqPicture[0].eqpicLink', '')}?${uuidv4()}`} />}
                  label={get(findData, 'eqName', '')}
                  key={`${id}`}
                  sx={{ m: 0.5 }}
                  color='primary'
                  onDelete={() => onSelectRow(id)}
                />
              }
            </React.Fragment>
          )
        })}
      </Box>
    )
  }, [selected])
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
              href: MERGE_PATH(EQUIPMENT_PATH, 'schedule'),
            },
            {
              name: `${mapDate} (${mapTime.title})`,
            },
          ]}
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.afterSubmit && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.afterSubmit.message}
            </Alert>
          )}
          <Stack spacing={2} direction={{ xs: 'column', md: 'column' }} sx={{ py: 2.5, px: 3 }}>
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Date *"
                  inputFormat="dd MMM yyyy"
                  minDate={addDays(new Date(), 1)}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "50%" }}
                      {...params}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <RHFAutocomplete
                  name="time"
                  fullWidth
                  value={value}
                  defaultValue={mapTime.label}
                  disablePortal
                  disableClearable
                  options={TIME_OPTIONS.map((option) => option.label)}
                  onChange={(event, newValue) => {
                    setValue('time', `${newValue}`)
                  }}
                  renderInput={(params) => (
                    <TextField {...params}
                      label="Time"
                      error={!!error}
                      helperText={error ? error.message : null} />
                  )}
                />
              )}
            />
          </Stack>
          {RenderChips}
          <Box sx={{ px: 4, py: 2 }}>
            <TextField
              fullWidth
              name='Search equipement'
              value={filterSearchEquipment}
              onChange={handleFilterSearchEquipment}
              placeholder="Search equipement"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={20} sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
            <Table>
              <TableHeadCustom
                sx={{ "& th": { backgroundColor: 'background.neutral', color: theme.palette.text.secondary } }}
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={selected.length}
                numSelected={selected.length}
                onSort={(id) => {
                  if (id === 'eqName') {
                    GetEquipmentRead(page, rowsPerPage, filterSearchEquipment, order === 'asc')
                    onSort(id)
                  }
                }}
                onSelectAllRows={(checked) => {
                  if (checked || (!checked && !isEmpty(selected) && selected.length !== totalRecord)) {
                    onSelectAllRows(checked, tableAllData.map((row) => get(row, 'eqId', '')))
                  } else {
                    onSelectAllRows(checked, tableData.map((row) => get(row, 'eqId', '')))
                  }

                }}
              />

              <TableBody>
                {!isEmpty(tableData) &&
                  tableData.map((row, index) =>
                    row ? (
                      <EquipmentScheduleCreateRow
                        key={get(row, 'eqId', '')}
                        row={row}
                        selected={selected.includes(get(row, 'eqId', ''))}
                        onSelectRow={() => onSelectRow(get(row, 'eqId', ''))}
                        onViewRow={() => handleViewRow(get(row, 'eqId', ''))}
                      />
                    ) : (
                      !isEmpty(tableData) && <TableSkeleton key={index} />
                    )
                  )}
                <TableNoData isNotFound={isEmpty(tableData)} />
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={totalRecord}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => GetEquipmentRead(page, rowsPerPage, filterSearchEquipment)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Stack justifyContent={'flex-end'} direction={'row'} spacing={2} sx={{ my: 3, mx: 3 }}>
            <LoadingButton
              size="medium"
              color='error'
              onClick={handleOnclickRemove}
            >
              Remove
            </LoadingButton>
            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              onClick={() => {
                if (!selected.length) {
                  setIsErrorSelectEquipment(true)
                }
              }}
            >
              Create Schedules
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>

    </>
  )
}
