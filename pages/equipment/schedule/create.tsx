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
  Drawer,
  Stack,
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
import { format } from 'date-fns'

import { LoadingButton } from '@mui/lab';
import ConfirmDialog from '@ku/components/ConfirmDialog'
import { filter, get } from 'lodash'
import EquipmentScheduleCreateToolsbar from '@ku/components/Equipment/EquipmentScheduleCreateToolsbar'
import EquipmentScheduleCreateRow from '@ku/components/Equipment/EquipmentScheduleCreateRow'


const mockDataTable: IEquipmentUser[] = [{
  id: "27658a79-ac6c-4003-b927-23b260840201",
  name: "Brycen Jimenez",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg',
  createdAt: new Date().toString(),
  lastestUpdate: new Date().toString(),
  status: "Available"
},
{
  id: "27658a79-ac6c-4003-b927-23b260840202",
  name: "Coating Material (CM1)",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg',
  createdAt: new Date(1994, 12, 10).toString(),
  lastestUpdate: new Date(1924, 12, 10).toString(),
  status: "Unavailable"
},
{
  id: "27658a79-ac6c-4003-b927-23b260840203",
  name: "Material coating descriptions",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
  createdAt: new Date(1995, 12, 10).toString(),
  lastestUpdate: new Date(1944, 12, 10).toString(),
  status: "Temporary Unavailable"
}, {
  id: "27658a79-ac6c-4003-b927-23b260840204",
  name: "Aaterial coating descriptions",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
  createdAt: new Date(1995, 12, 10).toString(),
  lastestUpdate: new Date(1944, 12, 10).toString(),
  status: "Temporary Unavailable"
}
]

const TABLE_HEAD = [
  { id: 'name', label: 'Equipment', align: 'left' },

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

  const [tableData, setTableData] = useState<IEquipmentUser[]>([])

  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterTime, setFilterTime] = useState('');
  const [filterSearchEquipment, setFilterSearchEquipment] = useState('');

  const [countDown, setCountDown] = useState<NodeJS.Timeout>();

  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()

  useEffect(() => {
    getEquipmentList()
  }, [])

  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.status === status).length

  const ROLE_OPTIONS = [
    'Ealry morning (7:00 - 12:59)',
    'Afternoon (13:00 - 22:00)',
    'Full day (7:00 - 22:00)',
  ];
  const getEquipmentList = async () => {
    // TODO: Add filter parameter
    const response = await fetchGetAssessments()
    if (response.data) {
      setTableData(mockDataTable)
      // setTableData(response.data)
    }
  }

  const handleViewRow = (id: string) => {
    push(MERGE_PATH(EQUIPMENT_PATH, '/schedule/detail', id))
  };
  const handleFilterDate = (value: Date | null) => {
    setFilterDate(value);
  }
  const handleFilterSearchEquipment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearchEquipment(event.target.value);
  }
  const handleFilterTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTime(event.target.value);
  }
  const handleOnclickCancel = () => {
    console.log("cancel clicked")
  }
  const handleOnclickSubmit = () => {
    console.log("Submit clicked")
  }

  function applySortFilter({
    tableData,
    comparator,
    // filterName,
  }: {
    tableData: IEquipmentUser[];
    comparator: (a: any, b: any) => number;
    // filterName: string;
  }) {
    const stabilizedThis = tableData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    // if (filterName) {
    //   tableData = tableData.filter(
    //     (item: Record<string, any>) =>
    //       item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    //   );
    // }

    return tableData;
  }
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy)

  });
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
              href: EQUIPMENT_PATH,
            },
            {
              name: 'Create',
            },
          ]}

        />
        <Card>

          <EquipmentScheduleCreateToolsbar
            filterDate={filterDate}
            onFilterDate={handleFilterDate}
            filterTime={filterTime}
            onFilterTime={handleFilterTime}
            filterSearchEquipment={filterSearchEquipment}
            onFilterSearchEquipment={handleFilterSearchEquipment}
            optionsRole={ROLE_OPTIONS}
          />
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
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row ? (
                      <EquipmentScheduleCreateRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                      />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} />
                    )
                  )}

                <TableEmptyRows
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                />
                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
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

          <Stack justifyContent={'flex-end'} direction={'row'} spacing={2} sx={{ my: 3, mx: 3 }}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              color='inherit'
              onClick={handleOnclickCancel}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              onClick={handleOnclickSubmit}
            >
              Create Schedules
            </LoadingButton>
          </Stack>
        </Card>
      </Container>

    </>
  )
}
