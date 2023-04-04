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
} from '@mui/material'
import { ACCOUNT_PATH, MERGE_PATH } from '@ku/constants/routes'
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
} from '@sentry/components/table'
import AccountAdminRow from '@ku/components/Account/AccountAdminRow'
import { fetchGetAssessments } from '@ku/services/assessment'
import { useSnackbar } from 'notistack'
import AccountAdminToolsbar from '@ku/components/Account/AccountAdminToolsbar'
import { fetchGetMemberRead, fetchGetMemberStatusStats } from '@ku/services/account'
import { get, isEmpty } from 'lodash'


const TABLE_HEAD = [
    { id: 'accountName', label: 'Account Name', align: 'left' },
    { id: 'privilege', label: 'Privilege', align: 'left', },
    { id: 'studentID', label: 'Student/Staff ID', align: 'left' },
    { id: 'supervisorName', label: 'Supervisor Name', align: 'left', width: 152 },
    { id: 'creditLimit', label: 'Credit Limit', align: 'left', },
    { id: 'bookLimit', label: 'Book Limit', align: 'left' },
    { id: 'contactNumber', label: 'Contact Number', align: 'left', },
    { id: 'accountExpiry', label: 'Account Expiry', align: 'left', },
    { id: 'status', label: 'Status', align: 'left', },
]
const ROLE_OPTIONS = [
    'All',
    'Admin',
    'Finance',
    'Supervisor',
    'User',

];
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
AccountAdminList.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function AccountAdminList() {
    const { enqueueSnackbar } = useSnackbar()
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
    const [filterRole, setFilterRole] = useState('All');
    const [countDown, setCountDown] = useState<NodeJS.Timeout>();
    const denseHeight = dense ? 56 : 76

    const isFiltered = filterName !== ''
    const isNotFound = !tableData.length && !!filterName
    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: get(StatusStat, 'memberCountAll', 0) },
        {
            value: 'active', label: 'Active', color: 'success', count: get(StatusStat, 'memberCountActive', 0)
        },
        {
            value: 'inactive',
            label: 'Inactive',
            color: 'warning',
            count: get(StatusStat, 'memberCountInactive', 0)
            ,
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
    const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = event.target
        setFilterRole(value);
        handleCountdown(filterRole, name)
    };
    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
        console.log("filterStatus", filterStatus)
    }

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setFilterName(value)
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
                    heading={'Accounts'}
                    links={[
                        {
                            name: 'Accounts',
                            href: ACCOUNT_PATH,
                        },
                        {
                            name: 'List',
                        },
                    ]}
                    action={
                        <NextLink href={MERGE_PATH(ACCOUNT_PATH, 'create')} passHref>
                            <Button
                                variant="contained"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                            >
                                Create an account
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

                    <Divider />


                    <AccountAdminToolsbar
                        filterRole={filterRole}
                        onFilterRole={handleFilterRole}

                        filterStudentID={filterStudentID}
                        onFilterStudentID={handleFilterStudentID}

                        filterEmail={filterEmail}
                        onFilterEmail={handleFilterEmail}

                        filterName={filterName}
                        onFilterName={handleFilterName}

                        optionsRole={ROLE_OPTIONS}
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
                                                <AccountAdminRow
                                                    key={get(row, 'uId', 0)}
                                                    row={row}
                                                    onViewRow={() => handleViewRow(get(row, 'uId', 0))}
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
