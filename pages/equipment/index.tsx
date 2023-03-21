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


const mockDataTable: IEquipmentUser[] = [{
  id: "27658a79-ac6c-4003-b927-23b260840201",
  name: "Eleanor PenaEleanor PenaEleanor Pena",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg',
  createdAt: new Date().toString(),
  lastestUpdate: new Date().toString(),
  status: "Available"
},
{
  id: "27658a79-ac6c-4003-b927-23b260840201",
  name: "Coating Material (CM1)",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_2.jpg',
  createdAt: new Date(1994, 12, 10).toString(),
  lastestUpdate: new Date(1924, 12, 10).toString(),
  status: "Unavailable"
},
{
  id: "27658a79-ac6c-4003-b927-23b260840201",
  name: "Material coating descriptions",
  cover: 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_3.jpg',
  createdAt: new Date(1995, 12, 10).toString(),
  lastestUpdate: new Date(1944, 12, 10).toString(),
  status: "Temporary Unavailable"
}
]

const TABLE_HEAD = [
  { id: 'equipment', label: 'Equipment', align: 'left', width: 350 },
  { id: 'createdAt', label: 'Create at', align: 'left', width: 150 },
  { id: 'latestUpdate', label: 'Latest update', align: 'left', width: 150 },
  { id: 'status', label: 'Status', align: 'left', width: 150 },
];
const ROLE_OPTIONS = [
  'all',
  'Available',
  'Unavailable',
  'Temporary Unavailable',
];
EquipmentList.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
export default function EquipmentList() {
  const {
    dense,
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
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [tableData, setTableData] = useState<IEquipmentUser[]>([])
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const theme = useTheme()
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
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };
  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };
  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };
  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
  };
  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
  };
  function applySortFilter({
    tableData,
    comparator,
    filterName,
  }: {
    tableData: IEquipmentUser[];
    comparator: (a: any, b: any) => number;
    filterName: string;
  }) {
    const stabilizedThis = tableData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
      tableData = tableData.filter(
        (item: Record<string, any>) =>
          item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }

    return tableData;
  }
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const isNotFound = (!dataFiltered.length && !!filterName)

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
            },
          ]}
          action={<>

            <NextLink href={MERGE_PATH(EQUIPMENT_PATH, 'manage')} passHref>
              <Button
                variant="contained"
                color='info'
                startIcon={<Iconify icon="eva:clock-fill" />}
                sx={{
                  bgcolor: "#1890FF",
                  mr: 1
                }}
              >
                Manage Available Schedules
              </Button>
            </NextLink>

            <NextLink href={MERGE_PATH(EQUIPMENT_PATH, 'create')} passHref >
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create Equipment
              </Button>
            </NextLink></>
          }
        />
        <Card>
          <EquipmentToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />
          <Tabs
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant='subtitle2'>Equipment List</Typography>
          </Tabs>
          {/* <Divider /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedAction
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  action={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table>
                <TableHeadCustom
                  sx={{ "& th": { backgroundColor: 'background.paper', color: theme.palette.text.primary } }}
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
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
                        <EquipmentRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.name)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} />
                      )
                    )}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />
                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
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
