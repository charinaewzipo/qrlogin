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
const mockTableData: IAccountUser[] = [
    {
        id: "27658a79-ac6c-4003-b927-23b260840201",
        name: "Eleanor PenaEleanor PenaEleanor Pena",
        email: "eleanor.pena@ku.ac.thEleanor PenaEleanor Pena",
        permission: "User",
        studentID: "1579900542880",
        supervisorName: "Anna YesmanEleanor PenaEleanor Pena",
        creditLimit: 0,
        bookLimit: 0,
        phone: "0854888882",
        expiredate: new Date().toString(),
        status: "Active"
    },
    {
        id: "27658a79-ac6c-4003-b927-23b260840208",
        name: "Eleanor PenaEleanor",
        email: "eleanor.pena@ku.ac.thEleanor ",
        permission: "User",
        studentID: "1579900542880",
        supervisorName: "Anna ",
        creditLimit: 0,
        bookLimit: 0,
        phone: "0854888882",
        expiredate: new Date().toString(),
        status: "Active"
    },
    {
        id: "34658a79-ac6c-4003-b927-23b261840208",
        name: "Eleanor Pena",
        email: "eleanor.pena@ku.ac.th",
        permission: "Supervisor",
        studentID: "1579900542881",
        supervisorName: "",
        creditLimit: 21000,
        bookLimit: 10,
        phone: "0854888882",
        expiredate: "",
        status: "Inactive"
    },
    {
        id: "37558a79-ac6c-4003-b927-23b360840208",
        name: "Eleanor Pena",
        email: "eleanor.pena@ku.ac.th",
        permission: "Finance",
        studentID: "1579900542820",
        supervisorName: "",
        creditLimit: 0,
        bookLimit: 0,
        phone: "0854888882",
        expiredate: new Date().toString(),
        status: "Locked"
    },
    {
        id: "11658a79-ac6c-4003-b927-53b260840208",
        name: "Eleanor Pena",
        email: "eleanor.pena@ku.ac.th",
        permission: "Admin",
        studentID: "1579900542480",
        supervisorName: "Anna Yesman",
        creditLimit: 0,
        bookLimit: 10,
        phone: "0854888882",
        expiredate: new Date().toString(),
        status: "Active"
    },

]

AccountAdminList.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function AccountAdminList() {
    const { enqueueSnackbar } = useSnackbar()
    const { push } = useRouter()
    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'createDate',
    }) // TODO: please change createDate

    const [tableData, setTableData] = useState<IAccountUser[]>([])
    const [filterStudentID, setFilterStudentID] = useState('')
    const [filterEmail, setFilterEmail] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterRole, setFilterRole] = useState('All');
    const [countDown, setCountDown] = useState<NodeJS.Timeout>();
    const denseHeight = dense ? 56 : 76

    const isFiltered = filterName !== ''
    const isNotFound = !tableData.length && !!filterName

    const getLengthByStatus = (status: string) =>
        tableData.filter((item) => item.status === status).length

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'active', label: 'Active', color: 'success', count: getLengthByStatus('Active') },
        {
            value: 'inactive',
            label: 'Inactive',
            color: 'warning',
            count: getLengthByStatus('Inactive'),
        },
        { value: 'locked', label: 'Locked', color: 'error', count: getLengthByStatus('Locked') },
    ] as const

    useEffect(() => {
        getAssessmentList()
    }, [])

    const getAssessmentList = async () => {
        // TODO: Add filter parameter
        const response = await fetchGetAssessments()
        if (response.data) {
            setTableData(mockTableData)
            // setTableData(response.data)
        }
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

    const handleViewRow = (id: string) => {
        push(MERGE_PATH(ACCOUNT_PATH, 'detail', id))
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
                                    {tableData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <AccountAdminRow
                                                    key={row.id}
                                                    row={row}
                                                    onViewRow={() => handleViewRow(row.id)}
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
