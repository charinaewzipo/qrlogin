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

import Iconify from '@sentry/components/iconify'
import Scrollbar from '@sentry/components/scrollbar'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TableSelectedAction,
  TableSkeleton,
  getComparator,
} from '@sentry/components/table'

import EquipmentToolbar from '@ku/components/Equipment/EquipmentToolsbar'
import EquipmentRow from '@ku/components/Equipment/EquipmentRow'
import Image from '@sentry/components/image/Image'
import { fetchGetEquipmentRead } from '@ku/services/equipment'
import { debounce, get, isEmpty } from 'lodash'


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
    eqDescription: "This powerful drill is perfect for heavy-duty projects and can handle all types of materials.",
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
  { id: 'eqName', label: 'Equipment', align: 'left', width: 350 },
  { id: 'eqCreatedAt', label: 'Create at', align: 'left', width: 150 },
  { id: 'eqUpdatedAt', label: 'Latest update', align: 'left', width: 150 },
  { id: 'eqStatus', label: 'Status', align: 'left', width: 150 },
];
const ROLE_OPTIONS = [
  'all',
  'Available',
  'Unavailable',
  'Temporary Unavailable',
];
EquipmentList.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function EquipmentList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setRowsPerPage,
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
  const [totalRecord, setTotalRecord] = useState<number>(0)


  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  
  const [selectAll, setSelectAll] = useState(false);

  const theme = useTheme()
  const { push } = useRouter()

  useEffect(() => {
    GetEquipmentRead(filterRole, rowsPerPage, 0, filterName)
    return debouncedCallback.cancel
  }, [])

  const GetEquipmentRead = (status: string, limit: number, pageToGo: number, keyword: string) => {
    const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
      page: pageToGo + 1,
      limit: limit,
      eqId: '',
      eqStatus: status.toUpperCase().replace(" ","_").replace("ALL",""),
      eqSearch: keyword,
      eqSortName: false,
      eqSortCode: false,
    }
    fetchGetEquipmentRead(query).then(response => {
      console.log("response ",response);
      console.log("data ",response.data.dataList);
      
      if (response.code === 200000) {
        setTableData(response.data.dataList)
        setPage(pageToGo)
        setTotalRecord(response.data.totalRecord || 0)
        
        // setTableData(mockTableData)
        // setTotalRecord(100)
        // setPage(0)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const debouncedCallback = debounce((status: string, limit: number, pageToGo: number, keyword: string) => {GetEquipmentRead(status, limit, pageToGo, keyword)}, 1000)
  const callBackTimeout = useCallback(debouncedCallback,[])

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    callBackTimeout(filterRole, rowsPerPage, 0, filterName)
  };
  const handleExportRows = (id: string[]) => {
    console.log("exportRows", id)
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    const role = event.target.value
    setFilterRole(role);
    GetEquipmentRead(role, rowsPerPage, 0, filterName)
  };
  const handleViewRow = (id: string) => {
    push(MERGE_PATH(EQUIPMENT_PATH, 'detail', id))
  };
  function applySortFilter({
    tableData,
    comparator,
    // filterName,
  }: {
    tableData: IV1PostEquipmentRead[];
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
    // filterName,
  });
  const isNotFound = (!tableData.length && !!filterName)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(event.target.value, 10)
    setRowsPerPage(limit)
    GetEquipmentRead(filterRole, limit, 0, filterName)
  }

  console.log("selected",selected);
  

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

            <NextLink href={MERGE_PATH(EQUIPMENT_PATH, 'schedule')} passHref>
              <Button
                variant="contained"
                color='info'
                startIcon={<Iconify icon="eva:clock-fill" />}
                sx={{
                  bgcolor: 'info.main',
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

          {/* <Divider /> */}
          <Scrollbar>

            <TableContainer sx={{ minWidth: 960, position: 'relative', overflow: 'unset' }}>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  sx={{ "& th": { color: theme.palette.text.primary } }}
                  headLabel={[{ id: 'equipmentList', label: 'Equipment List', align: 'left' }]} />
              </Table>
              <TableSelectedAction
                sx={{ "& .MuiCheckbox-root": { display: 'none' } }}
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={() =>{}}
                action={
                  <Tooltip title="Export selected to excel">
                    <IconButton color="primary" onClick={() => handleExportRows(selected)}>
                      <Image
                        disabledEffect
                        alt={'excel'}
                        src={'assets/icons/files/ic_file_excel.svg'}
                        sx={{ width: 24, height: 24 }}
                      />
                    </IconButton>
                  </Tooltip>
                }
              />
            </TableContainer>

            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  sx={{ "& th": { backgroundColor: 'background.paper', color: theme.palette.text.primary } }}
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={selectAll?totalRecord:tableData.length}
                  numSelected={selected.length}
                  onSort={(id)=>{
                    console.log("id",id);
                    if (id === 'eqName') {
                      GetEquipmentRead(filterRole, rowsPerPage, page, filterName)
                    }
                    // eqName
                    // onSort
                  }}
                  onSelectAllRows={(checked) =>{
                    
                    if (checked) {
                      setSelectAll(true)
                      const query: IV1QueryPagination & IV1QueryGetEquipmentRead = {
                        page: page + 1,
                        limit: 9999999,
                        eqId: '',
                        eqStatus: filterRole.toUpperCase().replace(" ","_").replace("ALL",""),
                        eqSearch: filterName,
                        eqSortName: false,
                        eqSortCode: false,
                      }
                      fetchGetEquipmentRead(query).then(response => {
                        if (response.code === 200000) { onSelectAllRows( checked, response.data.dataList.map((row) => get(row, 'eqId', '')) ) }
                      }).catch(err => {
                        console.log(err)
                      })
                    }else{
                      onSelectAllRows( checked, tableData.map((row) => get(row, 'eqId', '')) )
                    }
                    
                  }}
                />
                <TableBody>
                  {!isEmpty(dataFiltered) && dataFiltered
                    .map((row, index) =>
                      row ? (
                        <EquipmentRow
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
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRecord}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => GetEquipmentRead(filterRole, rowsPerPage, page, filterName)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

    </>
  )
}
