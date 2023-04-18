// next
import Head from 'next/head'
import AuthorizedLayout from '@ku/layouts/authorized'
import { Box, Card, Container, Divider, IconButton, Stack, Tab, Table, TableBody, TableContainer, Tabs, Tooltip, Typography, useTheme } from '@mui/material'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { useEffect, useState } from 'react'
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, TableSelectedAction, useTable } from '@sentry/components/table'
import Label from '@sentry/components/label'
import BookingToolsbar from '@ku/components/Account/TableAccountDetail/BookingToolsbar'
import Scrollbar from '@sentry/components/scrollbar'
import ConfirmDialog from '@ku/components/ConfirmDialog'
import { get, isEmpty } from 'lodash'
import palette from '@sentry/theme/palette'
import { LoadingButton } from '@mui/lab'
import BookingReportRow from '@ku/components/BookingReport/BookingReportRow'
import Image from '@sentry/components/image/Image'

const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'equipement', label: 'Equipement', align: 'left' },
    { id: 'bookingDate', label: 'Booking Date', align: 'left' },
    { id: 'requestDate', label: 'Request Date', align: 'left' },
    { id: 'paymentDate', label: 'Payment Date', align: 'left' },
    { id: 'price', label: 'Price', align: 'right' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'menu', label: '', align: 'left', width: 80 },
]

const MockData:IBooking[] = [{
    id: "0001",
    no: "170400061",
    name: "Eleanor Pena",
    time:'09:00 - 09:59',
    equipement: "CM1",
    bookingDate: "15 May 2022",
    requestDate: "15 May 2022",
    paymentDate: "15 May 2022",
    price : "45,000.00 B",
    status: 'Confirm'
},{
    id: "0002",
    no: "170400061",
    name: "Eleanor Pena",
    time:'09:00 - 09:59',
    equipement: "CM1",
    bookingDate: "15 May 2022",
    requestDate: "15 May 2022",
    paymentDate: "15 May 2022",
    price : "45,000.00 B",
    status: 'Pending'
},{
    id: "0003",
    no: "170400061",
    name: "Eleanor Pena",
    time:'09:00 - 09:59',
    equipement: "CM1",
    bookingDate: "15 May 2022",
    requestDate: "15 May 2022",
    paymentDate: "15 May 2022",
    price : "45,000.00 B",
    status: 'Waiting for payment'
},{
    id: "0004",
    no: "170400061",
    name: "Eleanor Pena",
    time:'09:00 - 09:59',
    equipement: "CM1",
    bookingDate: "15 May 2022",
    requestDate: "15 May 2022",
    paymentDate: "15 May 2022",
    price : "45,000.00 B",
    status: 'Finish'
},{
    id: "0005",
    no: "170400061",
    name: "Eleanor Pena",
    time:'09:00 - 09:59',
    equipement: "CM1",
    bookingDate: "15 May 2022",
    requestDate: "15 May 2022",
    paymentDate: "15 May 2022",
    price : "45,000.00 B",
    status: 'Finish'
}]

BookingReportPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
export default function BookingReportPage() {
    const theme = useTheme()
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<IBooking[]>([])
    const [openPleaseContact, setOpenPleaseContact] = useState(false)

    const [filterName, setFilterName] = useState('')
    const [detailUser, setDetailUser] = useState(null)

    const permissionMe : PERMISSION = 'Finance'

    const {
        order,
        orderBy,
        dense,
        page,
        rowsPerPage,
        selected,
        onSort,
        onSelectRow,
        onSelectAllRows,
        setPage,
        onChangePage,
        onChangeRowsPerPage
    } = useTable({
        defaultOrderBy: 'no',
    }) // TODO: please change createDate

    const denseHeight = dense ? 56 : 76

    const isFiltered = filterName !== ''

    useEffect(() => {
        // setTimeout(()=>{ getAssessmentList('Done') },2000)
        setTableData(MockData)
    }, [])

    const getLengthByStatus = (status: string) =>
        tableData.filter((item) => item.status === status).length

    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
    }

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setFilterName(event.target.value)
    }
    const handleResetFilter = () => {
        setFilterName('')
    }

    const handleRemove = (data:IBooking) => {
        setDetailUser(data)
        setOpenPleaseContact(true)
    }

    const TabsAdmin = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'pending', label: 'Pending', color: 'warning', count: getLengthByStatus('paid') },
        { value: 'confirm', label: 'Confirm', color: 'success', count: getLengthByStatus('unpaid')},
        { value: 'waiting', label: 'Waiting for Payment', color: 'secondary', count: getLengthByStatus('unpaid')},
        { value: 'cancelled', label: 'Cancelled', color: 'default', count: getLengthByStatus('unpaid')},
        { value: 'finish', label: 'Finish', color: 'default', count: getLengthByStatus('unpaid')},
    ] as const

    const TabsFinance = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'waiting', label: 'Waiting for Payment', color: 'secondary', count: getLengthByStatus('unpaid')},
        { value: 'finish', label: 'Finish', color: 'default', count: getLengthByStatus('unpaid')},
    ] as const

    const TABS = permissionMe==='Finance'?TabsFinance:TabsAdmin
    
    return (
        <>
            <Head>
                <title> Booking Report | KU </title>
            </Head>

            <Container>
                <Box
                    sx={{
                        overflow: 'visible',
                        position: 'relative',
                        bgcolor: 'background.default',
                    }}
                >
                    <CustomBreadcrumbs
                        heading="Booking Report"
                        links={[{ name: 'Booking status' }, { name: "List" }]}
                    />
                    <Card>
                        <Tabs
                            value={filterStatus}
                            onChange={handleFilterStatus}
                            sx={{ px: 2, bgcolor: 'background.neutral' }}
                        >
                            {TABS.map((tab) => (
                                <Tab
                                    key={tab.value}
                                    value={tab.value}
                                    label={tab.label}
                                    iconPosition="end"
                                    icon={ <Label color={tab.color} sx={{ mr: 1 }}> {tab.count} </Label> }
                                />
                            ))}
                        </Tabs>

                        <Divider />

                        <BookingToolsbar
                            isFiltered={isFiltered}
                            filterName={filterName}
                            onFilterName={handleFilterName}
                            onResetFilter={handleResetFilter}
                        />

                        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                            <TableSelectedAction
                                dense={dense}
                                numSelected={selected.length}
                                rowCount={tableData.length}
                                sx={{ "& .MuiCheckbox-root": { display:'none' } }}
                                onSelectAllRows={(checked) => onSelectAllRows( checked, tableData.map((row) => row.id) ) }
                                action={
                                    <Stack direction="row">
                                        <Tooltip title="Export selected to excel">
                                            <IconButton color="primary" onClick={ ()=>{ console.log("123132") } }>
                                            {/* <Iconify icon="ic:round-send" /> */}
                                            <Image
                                                disabledEffect
                                                alt={'excel'}
                                                src={'assets/icons/files/ic_file_excel.svg'}
                                                sx={{ width: 24, height: 24 }}
                                            />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                }
                            />
                            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                sx={{ "& th": { color: theme.palette.text.primary } }}
                                headLabel={[{ id: 'bookingList', label: 'Booking List', align: 'left' }]} />
                            </Table>
                        </TableContainer>

                        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                            <Scrollbar>
                                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                    <TableHeadCustom
                                        sx={{ "& th": { backgroundColor: 'background.paper', color: theme.palette.text.primary } }}
                                        headLabel={TABLE_HEAD}
                                        rowCount={tableData.length}
                                        order={order}
                                        orderBy={orderBy}
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
                                        {tableData
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <BookingReportRow
                                                    key={row.id}
                                                    row={row}
                                                    selected={selected.includes(row.id)}
                                                    onSelectRow={() => onSelectRow(row.id)}
                                                    onViewRow={() => {
                                                        // handleViewRow(row.id)
                                                    }}
                                                    onRemove={()=>handleRemove(row)}
                                                />
                                            ))
                                        }

                                        <TableEmptyRows
                                            height={denseHeight}
                                            emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                        />

                                        <TableNoData isNotFound={isEmpty(tableData)} />
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
                </Box>
                <ConfirmDialog
                    open={openPleaseContact}
                    textCancel="No, I’m not sure"
                    colorButton='inherit'
                    onClose={() => { setOpenPleaseContact(false) }}
                    title="Are you sure!"
                    content={
                        <Box>
                            {[
                                { sx: { mb: 0 }, text: `To cancel booking number ${get(detailUser,"no","")}` },
                                { sx: { mt: 2 }, text: `Booking number ${get(detailUser,"no","")}` },
                                { sx: { mb: 0 }, text: `Coating Material (${get(detailUser,"equipement","")})` },
                                { sx: { mb: 0 }, text: `At ${get(detailUser,"bookingDate","")} ${get(detailUser,"time","")}` },
                                { sx: { my: 2 }, text: `Remark: after you cancelled booking, you can not recover this booking.` },

                            ].map((i, index) => (
                                <Typography
                                    key={'contact' + index}
                                    variant="body1"
                                    sx={{
                                        ...{ color: (theme) => palette(theme.palette.mode).text.secondary },
                                        ...i.sx,
                                    }}
                                >
                                    {i.text}
                                </Typography>
                            ))}
                        </Box>
                    }
                    action={<LoadingButton
                        fullWidth
                        color='error'
                        size="large"
                        type="button"
                        variant="contained"
                        onClick={() => { setOpenPleaseContact(false) }}
                    >
                        {"Yes, Cancel"}
                    </LoadingButton>}
                />
            </Container>
        </>
    )
}
