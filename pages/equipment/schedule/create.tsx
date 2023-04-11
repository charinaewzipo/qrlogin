// next
import { useState, useEffect, useMemo } from 'react'
// next
import * as Yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
import { addDays, formatISO, isValid } from 'date-fns'
import { LoadingButton } from '@mui/lab';
import EquipmentScheduleCreateRow from '@ku/components/Equipment/EquipmentScheduleCreateRow'
import { Avatar } from '@mui/material'
import FormProvider from '@sentry/components/hook-form/FormProvider'
import { Controller, ErrorOption, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@mui/x-date-pickers'
import { RHFAutocomplete } from '@sentry/components/hook-form'
import { fetchGetEquipmentRead, fetchPostEquipmentUnavailableCreate } from '@ku/services/equipment'
import { get, isEmpty, isNull, isUndefined } from 'lodash'
import messages from '@ku/constants/response'


const TIME_OPTIONS = [
  'Ealry morning (7:00 - 12:59)',
  'Afternoon (13:00 - 22:00)',
  'Full day (7:00 - 22:00)',
];
const TABLE_HEAD = [
  { id: 'eqName', label: 'Equipment', align: 'left' },
];
type FormValuesProps = {
  date: Date | null,
  time: string,
  afterSubmit?: string
}

EquipmentScheduleCreatePage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function EquipmentScheduleCreatePage() {
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

  const [tableData, setTableData] = useState<IV1PostEquipmentRead[]>([])
  const [tableAllData, setTableAllData] = useState<IV1PostEquipmentRead[]>([])
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('');
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  const [isErrorSelectEquipment, setIsErrorSelectEquipment] = useState(false)
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [isSelectAllRows, setIsSelectAllRows] = useState(false)
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()

  useEffect(() => {
    if (isErrorSelectEquipment && selected.length > 0) {
      setIsErrorSelectEquipment(false)
    }
  }, [selected])

  useEffect(() => {
    clearTimeout(countDown);
    setCountDown(
      setTimeout(() => {
        GetEquipmentRead()
      }, 1000)
    );
  }, [page, rowsPerPage, filterSearchEquipment])

  const EquipmentScheduleScheme = Yup.object().shape({
    date: Yup.date().min(new Date(), 'Please choose future date').nullable().typeError('Invalid Date').required('Date is require'),
    time: Yup.string().required('Time is require'),
  })
  const defaultValues: FormValuesProps = useMemo(
    () => ({
      date: null,
      time: '',
    }),
    []
  )
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EquipmentScheduleScheme),
    defaultValues,
  })
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods

  const GetEquipmentRead = (isSortName: boolean = false) => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
      page: page + 1,
      limit: rowsPerPage,
      eqId: '',
      eqStatus: '',
      eqSearch: filterSearchEquipment,
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
        setTableData(get(response, 'data.dataList', []))
        setTotalRecord(get(response, 'data.totalRecord', 0))
      }
    }).catch(err => {
      const errorMessage = get(messages, err.code, messages[0])
      enqueueSnackbar(errorMessage, { variant: 'error' })
    })
  }
  const PostEquipmentCreate = (data: FormValuesProps) => {
    const mapTimeToArray = () => {
      if (data.time === 'Ealry morning (7:00 - 12:59)') {
        return [7, 8, 9, 10, 11, 12]
      } else if (data.time === 'Afternoon (13:00 - 22:00)') {
        return [13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      } else return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    }
    const ArrayEqID = selected.map(numString => parseInt(numString))
    const query: IV1PostEquipmentUnavailableCreate = {
      date: !isNull(data.date) && isValid(data.date) ? formatISO(data.date) : null,
      times: mapTimeToArray(),
      eqId: ArrayEqID,
      // status: "PENDING",
    }

    fetchPostEquipmentUnavailableCreate(query).then(response => {
      if (response.code === responseCode.OK_CODE) {
        reset()
        setSelected([])
        push(MERGE_PATH(EQUIPMENT_PATH, 'schedule'))
        enqueueSnackbar('Create schedule success.')
      }
    }).catch(err => {
      const errorMessage = get(messages, err.code, messages[0])
      const errorOptions: ErrorOption = {
        message: errorMessage
      }
      setError('afterSubmit', errorOptions)
    })
  }
  const handleViewRow = (id: string) => {
    onSelectRow(id)
  };
  const handleFilterSearchEquipment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setFilterSearchEquipment(event.target.value);
  }
  const handleOnclickCancel = () => {
    reset()
    setSelected([])
  }

  const onSubmit = async (data: FormValuesProps) => {
    if (!isErrorSelectEquipment) {
      PostEquipmentCreate(data)

    }
  }

  const RenderChips = (): JSX.Element => {
    return (
      <Box sx={{ mx: 3, mb: 2 }}>
        {isErrorSelectEquipment && <FormHelperText sx={{ color: theme.palette.error.main, ml: 2, my: 1 }}>Please select equipment at lest 1 item</FormHelperText>}
        {selected.map((id) => {
          const Data = isSelectAllRows ? tableAllData : tableData
          const findData = Data.find(i => i.eqId === id)
          return (
            <>
              {!isEmpty(findData) &&
                <Chip
                  size='small'
                  avatar={<Avatar alt={get(findData, 'eqName', '')} src={get(findData, 'eqPicture[0].eqpicLink', '')} />}
                  label={get(findData, 'eqName', '')}
                  key={id}
                  sx={{ m: 0.5 }}
                  color='primary'
                  onDelete={() => onSelectRow(id)}
                />
              }
            </>
          )
        })}
      </Box>
    )
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
              href: MERGE_PATH(EQUIPMENT_PATH, 'schedule'),
            },
            {
              name: 'Create',
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
                  disablePortal
                  disableClearable
                  isOptionEqualToValue={(option, value) => option === value}
                  options={TIME_OPTIONS.map((option) => option)}
                  onChange={(event, newValue) => {
                    onChange(() => setValue('time', `${newValue}`))
                  }
                  }
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
          <RenderChips />
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
                    GetEquipmentRead(order === 'asc')
                    onSort(id)
                  }
                }}
                onSelectAllRows={(checked) => {
                  const getEQ2All = (isChecked: boolean) => {
                    const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
                      page: 1, limit: 9999999,
                      eqSortName: false, eqSortCode: false,
                    }
                    fetchGetEquipmentRead(query).then(response => {
                      if (response.code === responseCode.OK_CODE) {
                        setIsSelectAllRows(true)
                        setTableAllData(get(response, 'data.dataList', []))
                        onSelectAllRows(isChecked, get(response, 'data.dataList', []).map((row) => get(row, 'eqId', '')))
                      }
                    }).catch(err => {
                      const errorMessage = get(messages, err.code, messages[0])
                      enqueueSnackbar(errorMessage, { variant: 'error' })
                    })
                  }
                  if (checked || (!checked && !isEmpty(selected) && selected.length !== totalRecord)) {
                    getEQ2All(true)
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
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

          <Stack justifyContent={'flex-end'} direction={'row'} spacing={2} sx={{ my: 3, mx: 3 }}>
            <LoadingButton
              size="medium"
              variant="contained"
              color='inherit'
              onClick={handleOnclickCancel}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              onClick={() => {
                if (selected.length === 0) {
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
