// next
import { useState, useEffect, useMemo } from 'react'
// next
import * as Yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  Box,
  useTheme,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  FormHelperText,
} from '@mui/material'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import Iconify from '@sentry/components/iconify'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSkeleton,
  TablePaginationCustom,
} from '@sentry/components/table'
import { fetchGetAssessments } from '@ku/services/assessment'
import { useSnackbar } from 'notistack'
import { addDays, format } from 'date-fns'
import { LoadingButton } from '@mui/lab';
import EquipmentScheduleCreateRow from '@ku/components/Equipment/EquipmentScheduleCreateRow'
import { Avatar } from '@mui/material'
import FormProvider from '@sentry/components/hook-form/FormProvider'
import { Controller, useForm, ErrorOption } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@mui/x-date-pickers'
import { RHFAutocomplete, RHFSelect, RHFTextField } from '@sentry/components/hook-form'
import { get, isEmpty } from 'lodash'
import { fetchGetEquipmentRead, fetchPostEquipmentUnavailableCreate } from '@ku/services/equipment'


const mockTableData: IV1PostEquipmentRead[] =
  [{
    eqId: "ABC123",
    eqStatus: "available",
    eqCode: "EQ001",
    eqName: "Power Drill",
    eqBrand: "DeWalt",
    eqModel: "DCD771C2",
    eqDescription: "This powerful drill is perfect for heavy-duty projects and can handle all types of materials.",
    eqPicture: [
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: 1548435200, // April 26, 2022
    eqUpdatedAt: 1949577600, // April 9, 2022
    eqAvascheDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    eqAvascheTimes: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    eqTypePerson: [
      {
        eqpscheTypePerson: "Residential",
        eqsches: [
          {
            eqpscheSubOption: null,
            eqpscheChecked: "Yes",
            eqpscheName: "Hourly rate",
            eqpscheDescription: null,
            eqpscheUnitPrice: 50,
            eqpscheUnitPer: "hour",
            eqsubsches: null
          }
        ]
      },
      {
        eqpscheTypePerson: "Commercial",
        eqsches: [
          {
            eqpscheSubOption: null,
            eqpscheChecked: "Yes",
            eqpscheName: "Hourly rate",
            eqpscheDescription: null,
            eqpscheUnitPrice: 100,
            eqpscheUnitPer: "hour",
            eqsubsches: null
          },
        ]
      }]
  }, {
    eqId: "ABC124",
    eqStatus: "Unavailable",
    eqCode: "EQ001",
    eqName: "DeWalt",
    eqBrand: "DeWalt",
    eqModel: "DCD771C2",
    eqDescription: "This powerful drill is perfect for heavy-duty projects and can handle all types of materials.",
    eqPicture: [
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: 1448435200, // April 26, 2022
    eqUpdatedAt: 1649577600, // April 9, 2022
    eqAvascheDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    eqAvascheTimes: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    eqTypePerson: [
      {
        eqpscheTypePerson: "Residential",
        eqsches: [
          {
            eqpscheSubOption: null,
            eqpscheChecked: "Yes",
            eqpscheName: "Hourly rate",
            eqpscheDescription: null,
            eqpscheUnitPrice: 50,
            eqpscheUnitPer: "hour",
            eqsubsches: null
          }
        ]
      },
      {
        eqpscheTypePerson: "Commercial",
        eqsches: [
          {
            eqpscheSubOption: null,
            eqpscheChecked: "Yes",
            eqpscheName: "Hourly rate",
            eqpscheDescription: null,
            eqpscheUnitPrice: 100,
            eqpscheUnitPer: "hour",
            eqsubsches: null
          },
        ]
      }]
  }, {
    eqId: "ABC125",
    eqStatus: "Temporary Unavailable",
    eqCode: "EQ001",
    eqName: "ABC124 Drill",
    eqBrand: "DeWalt",
    eqModel: "DCD771C2",
    eqDescription: "This powerful drill is perfect for heavy-duty projects and can handle all types of materials.Temporary UnavailableTemporary Unavailable",
    eqPicture: [
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg",
        eqpicSort: 1
      },
      {
        eqpicLink: "https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg",
        eqpicSort: 2
      }
    ],
    eqCreatedAt: 1648435200, // April 26, 2022
    eqUpdatedAt: 1649577600, // April 9, 2022
    eqAvascheDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    eqAvascheTimes: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    eqTypePerson: [
      {
        eqpscheTypePerson: "Residential",
        eqsches: [
          {
            eqpscheSubOption: null,
            eqpscheChecked: "Yes",
            eqpscheName: "Hourly rate",
            eqpscheDescription: null,
            eqpscheUnitPrice: 50,
            eqpscheUnitPer: "hour",
            eqsubsches: null
          }
        ]
      },
      {
        eqpscheTypePerson: "Commercial",
        eqsches: [
          {
            eqpscheSubOption: null,
            eqpscheChecked: "Yes",
            eqpscheName: "Hourly rate",
            eqpscheDescription: null,
            eqpscheUnitPrice: 100,
            eqpscheUnitPer: "hour",
            eqsubsches: null
          },
        ]
      }]
  }]


const TABLE_HEAD = [
  { id: 'name', label: 'Equipment', align: 'left' },
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
  const [dataDetail, setDataDetail] = useState<IV1PostEquipmentRead>()

  const [filterSearchEquipment, setFilterSearchEquipment] = useState('');
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  const [isErrorSelectEquipment, setIsErrorSelectEquipment] = useState(false)

  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()

  useEffect(() => {
    if (isErrorSelectEquipment && selected.length > 0) {
      setIsErrorSelectEquipment(false)
    }
  }, [selected])

  const EquipmentScheduleScheme = Yup.object().shape({
    date: Yup.date().nullable().required('Date is require'),
    time: Yup.string().required('Time is require'),
  })
  const defaultValues: FormValuesProps = {
    date: get(dataDetail, 'eqUpdatedAt', addDays(new Date(), 1)),
    time: get(dataDetail, 'eqAvascheTimes[0]', 'Afternoon (13:00 - 22:00)').toString(),
  }
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EquipmentScheduleScheme),
    defaultValues,
  })
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods



  const TIME_OPTIONS = [
    'Ealry morning (7:00 - 12:59)',
    'Afternoon (13:00 - 22:00)',
    'Full day (7:00 - 22:00)',
  ];
  useEffect(() => {
    GetEquipmentRead()
  }, [])

  const GetEquipmentRead = async () => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
      page: page,
      limit: rowsPerPage,
      eqId: '',
      eqStatus: '',
      eqSearch: filterSearchEquipment,
      eqSortName: false,
      eqSortCode: false,
    }
    await fetchGetEquipmentRead(query).then(response => {
      if (response.code === 200) {
        setTableData(mockTableData)
        const dataSelect = ['ABC124', 'ABC123']
        setSelected(dataSelect)
        // setStatusStat(response.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const PostEquipmentCreate = async (data: FormValuesProps) => {
    const ArrayNumber = selected.map(numString => parseInt(numString))
    const query: IV1PostEquipmentUnavailableCreate = {
      date: Date.now(),
      times: [],
      eqId: ArrayNumber,
      status: ''
    }
    console.log("selected", selected)
    console.log("query", query)
    await fetchPostEquipmentUnavailableCreate(query).then(response => {
      if (response.code === 200) {
        reset()
        setSelected([])
        push(MERGE_PATH(EQUIPMENT_PATH, '/schedule'))
        enqueueSnackbar(`Updated schedule of ${format(get(data, 'date', addDays(new Date(), 1)), 'dd MMM yyyy')} (${(get(data, 'time', 'Afternoon (13:00 - 22:00)')).split(' (', 1)}).`)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const handleViewRow = (id: string) => {
    push(MERGE_PATH(EQUIPMENT_PATH, 'schedule/detail', id))
  };
  const handleFilterSearchEquipment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearchEquipment(event.target.value);
    clearTimeout(countDown);
    setCountDown(
      setTimeout(() => {
        GetEquipmentRead()
      }, 1000)
    );
  }
  const handleOnclickRemove = () => {
    // reset()
    setSelected([])
  }
  const onSubmit = async (data: FormValuesProps) => {
    if (!isErrorSelectEquipment) {
      console.log("onSubmit", data)
      try {
        PostEquipmentCreate(data)

      } catch (error) {
        // console.error(error)
        const errorOptions: ErrorOption = {
          message: 'errorResponse.data || errorResponse.devMessage',
        }
        setError('afterSubmit', errorOptions)
      }
    }
  }

  const isNotFound = (!tableData.length)

  const RenderChips = (): JSX.Element => {
    return (
      <Box sx={{ mx: 3, mb: 2 }}>
        {isErrorSelectEquipment && <FormHelperText sx={{ color: theme.palette.error.main, ml: 2, my: 1 }}>Please select equipment at lest 1 item</FormHelperText>}
        {selected.map((id) => {
          const findData = tableData.find(i => i.eqId === id)
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
              name: `${format(get(dataDetail, 'eqUpdatedAt', (new Date())), 'dd MMM yyyy')} (${get(dataDetail, 'eqAvascheTimes[0]', 'Afternoon (13:00 - 22:00)').toString()})`,
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
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => get(row, 'eqId', ''))
                  )
                }
              />

              <TableBody>
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row ? (
                      <EquipmentScheduleCreateRow
                        key={get(row, 'eqId', '')}
                        row={row}
                        selected={selected.includes(get(row, 'eqId', ''))}
                        onSelectRow={() => onSelectRow(get(row, 'eqId', ''))}
                        onViewRow={() => handleViewRow(get(row, 'eqId', ''))}
                      />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} />
                    )
                  )}


                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom

            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
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
