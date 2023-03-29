import { useState, useEffect } from 'react'
// next
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Tab,
  Tabs,
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from '@mui/material'
import { ACCOUNT_PATH, ASSESSMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
// components
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@sentry/components/table'

import AccountSupervisorRow from '@ku/components/Account/AccountSupervisorRow'
import { fetchGetAssessments } from '@ku/services/assessment'
import AccountSupervisorToolsbar from '@ku/components/Account/AccountSupervisorToolsbar'
import { get, isEmpty } from 'lodash'
import { fetchGetMemberRead, fetchGetMemberStatusStats, fetchPostMemberDelete } from '@ku/services/account'

const TABLE_HEAD = [
  { id: 'accountName', label: 'Account Name', align: 'left' },
  { id: 'department', label: 'Department', align: 'left', },
  { id: 'studentID', label: 'Student ID', align: 'left', },
  { id: 'creditLimit', label: 'Credit Limit', align: 'left', width: 120 },
  { id: 'bookLimit', label: 'Book Limit', align: 'left', width: 120 },
  { id: 'contactNumber', label: 'Contact Number', align: 'left', width: 160 },
  { id: 'accountExpiry', label: 'Account Expiry', align: 'left', width: 150 },
  { id: 'status', label: 'Status', align: 'left', },
  { id: 'button', label: '', align: 'left', },
]
const mockStatusStat = {
  memberCountAll: 4,
  memberCountActive: 2,
  memberCountInactive: 1,
  memberCountLocked: 1,
}
const mockTableData2: IV1RespGetMemberRead[] = [
  {
    uId: 12345,
    uTitle: 'Mr',
    uFirstName: 'John',
    uSurname: 'Doe',
    uAddress: '123 Main St, Anytown USA',
    uPhoneNumber: '0854888882',
    authId: 67890,
    authEmail: 'johndoe@example.com',
    authAccountStatus: 'Active',
    authIsPdpaAccept: true,
    authIsVerifyEmail: true,
    authIsAdvisorApprove: true,
    authAdvisorStatus: 'approved',
    authPermission: 'member',
    uiId: 54321,
    uiTypePerson: 'student',
    uiDepartment: 'Computer Science',
    uiPosition: null,
    uiStudentId: '1579900542880',
    uiCardExpireDate: new Date('2024-05-31'),
    uiCardPicture: 'https://example.com/card.png',
    uiPersonPicture: 'https://example.com/person.png',
    uiAdvisorCode: null,
    uiAdvisorId: 98765,
    uiAdvisorName: 'Jane Smith',
    uiCreditLimit: 1000,
    uiCreditUsed: 500,
    uiBookingLimit: 10,
    uiBookingUsed: 2,
  },
  {
    uId: 123456,
    uTitle: 'Mr',
    uFirstName: 'John',
    uSurname: 'Doe',
    uAddress: '123 Main St, Anytown USA',
    uPhoneNumber: '0854888882',
    authId: 67890,
    authEmail: 'johndoe@example.com',
    authAccountStatus: 'Locked',
    authIsPdpaAccept: true,
    authIsVerifyEmail: true,
    authIsAdvisorApprove: true,
    authAdvisorStatus: 'approved',
    authPermission: 'member',
    uiId: 54321,
    uiTypePerson: 'student',
    uiDepartment: 'Computer Science',
    uiPosition: null,
    uiStudentId: '1579900542880',
    uiCardExpireDate: new Date('2024-05-31'),
    uiCardPicture: 'https://example.com/card.png',
    uiPersonPicture: 'https://example.com/person.png',
    uiAdvisorCode: null,
    uiAdvisorId: 98765,
    uiAdvisorName: 'Jane Smith',
    uiCreditLimit: 1000,
    uiCreditUsed: 1500,
    uiBookingLimit: 10,
    uiBookingUsed: 2,
  },
  {
    uId: 123457,
    uTitle: 'Mr',
    uFirstName: 'John',
    uSurname: 'Doe',
    uAddress: '123 Main St, Anytown USA',
    uPhoneNumber: '0854888882',
    authId: 67890,
    authEmail: 'johndoe@example.com',
    authAccountStatus: 'Inactive',
    authIsPdpaAccept: true,
    authIsVerifyEmail: true,
    authIsAdvisorApprove: true,
    authAdvisorStatus: 'approved',
    authPermission: 'member',
    uiId: 54321,
    uiTypePerson: 'student',
    uiDepartment: 'Computer Science',
    uiPosition: null,
    uiStudentId: '1579900542880',
    uiCardExpireDate: new Date('2024-05-31'),
    uiCardPicture: 'https://example.com/card.png',
    uiPersonPicture: 'https://example.com/person.png',
    uiAdvisorCode: null,
    uiAdvisorId: 98765,
    uiAdvisorName: 'Jane Smith',
    uiCreditLimit: 1000,
    uiCreditUsed: 500,
    uiBookingLimit: 10,
    uiBookingUsed: 10,
  },
]
AccountSupervisorList.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function AccountSupervisorList() {
  const { push } = useRouter()
  const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
    defaultOrderBy: 'createDate',
  }) // TODO: please change createDate

  const [tableData, setTableData] = useState<IV1RespGetMemberRead[]>([])
  const [StatusStat, setStatusStat] = useState<IV1RespGetMemberStatusStats>(null)
  const [filterStudentID, setFilterStudentID] = useState('')
  const [filterEmail, setFilterEmail] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [countDown, setCountDown] = useState<NodeJS.Timeout>();
  const denseHeight = dense ? 56 : 76

  const isFiltered = filterName !== ''
  const isNotFound = !tableData.length && !!filterName
  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: get(StatusStat, 'memberCountAll', 0) },
    {
      value: 'pending',
      label: 'pending',
      color: 'info',
      count: get(StatusStat, 'memberCountInactive', 0)
      ,
    },
    {
      value: 'active', label: 'Active', color: 'success', count: get(StatusStat, 'memberCountActive', 0)
    },

    {
      value: 'locked', label: 'Locked', color: 'error', count: get(StatusStat, 'memberCountLocked', 0)
    },
  ] as const

  useEffect(() => {
    GetMemberStatusStats()
    GetMemberRead()
  }, [])

  const GetMemberStatusStats = async () => {
    await fetchGetMemberStatusStats().then(response => {
      if (response.code === 200) {
        setStatusStat(mockStatusStat)
        // setStatusStat(response.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const GetMemberRead = async () => {
    const query: IV1QueryGetMemberRead & IV1QueryPagination = {
      page: page,
      limit: rowsPerPage,
      authPermission: '',
      authEmail: '',
      uiStudentId: '',
      fullName: '',
      authAccountStatus: '',
    }
    await fetchGetMemberRead(query)
      .then(response => {
        if (response.code === 200) {
          setTableData(mockTableData2)
          // setTableData(response.data)
        }
      }).catch(err => {
        console.log(err)
      })
  }


  const handleCountdown = (value: string, key: string) => {
    setPage(0)
    clearTimeout(countDown);
    setCountDown(
      setTimeout(() => {
        console.log(key, ":", value)
      }, 1000)
    );
  }

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0)
    setFilterStatus(newValue)
    console.log("filterStatus", filterStatus)
  }

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setFilterName(value);
    handleCountdown(filterName, name)
  }
  const handleFilterEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setFilterEmail(value)
    handleCountdown(filterEmail, name)
  }
  const handleFilterStudentID = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target
    setFilterStudentID(value);
    handleCountdown(filterStudentID, name)
  }

  const handleViewRow = (id: number) => {
    push(MERGE_PATH(ACCOUNT_PATH, 'detail', id.toString()))
  }
  const handleRemoveRow = (id: number) => {
    console.log("id", id)
    const PostMemberDelete = async () => {
      const query: IV1PostMemberDelete = {
        uId: id
      }
      await fetchPostMemberDelete(query)
        .then(response => {
          if (response.code === 200) {
            // setTableData(mockTableData2)
            // setTableData(response.data)
          }
        }).catch(err => {
          console.log(err)
        })
    }
    PostMemberDelete()
  }
  // const handleResetFilter = () => {
  //     setFilterName('')
  // }

  return (
    <>
      <Head>
        <title> Accounts | KU</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Accounts"
          links={[
            {
              name: 'Accounts',
              href: ACCOUNT_PATH,
            },
            {
              name: 'List',
            },
          ]}

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

          <Divider />
          <AccountSupervisorToolsbar
            filterStudentID={filterStudentID}
            onFilterStudentID={handleFilterStudentID}
            filterEmail={filterEmail}
            onFilterEmail={handleFilterEmail}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                />

                <TableBody>
                  {!isEmpty(tableData) && tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <AccountSupervisorRow
                          key={get(row, 'uId', 0)}
                          row={row}
                          onViewRow={() => handleViewRow(get(row, 'uId', 0))}
                          onRemove={() => handleRemoveRow(get(row, 'uId', 0))}
                        />
                      )
                    })}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
          />
        </Card>
      </Container>


    </>
  )
}
