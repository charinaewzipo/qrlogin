// next
import Head from 'next/head'
import AuthorizedLayout from '@ku/layouts/authorized'
import { Box, Card, Container, Divider, Tab, Table, TableBody, TableContainer, Tabs, Typography, useTheme } from '@mui/material'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { useEffect, useState } from 'react'
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@sentry/components/table'
import Label from '@sentry/components/label'
import BookingToolsbar from '@ku/components/Account/TableAccountDetail/BookingToolsbar'
import Scrollbar from '@sentry/components/scrollbar'
import ConfirmDialog from '@ku/components/ConfirmDialog'
import { get, isEmpty } from 'lodash'
import palette from '@sentry/theme/palette'
import { LoadingButton } from '@mui/lab'
import MyBookingRow from '@ku/components/MyBooking/MyBookingRow'
  
const mockData: IV1RespGetBookingMeRead = {
    eqId: 1,
    eqCreateBy: 1,
    eqStatus: "Available",
    eqCode: "EQ001",
    eqName: "Laptop",
    eqBrand: "Apple",
    eqModel: "MacBook Pro",
    eqDescription: "Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals Powerful laptop for professionals",
    eqPictures: [
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg",
            eqpicSort: 2,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1-square_medium.jpg",
            eqpicSort: 1,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1-square_medium.jpg",
            eqpicSort: 3,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg",
            eqpicSort: 4,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1-square_medium.jpg",
            eqpicSort: 5,
        },
        {
            eqpicLink: "https://media-cdn.bnn.in.th/209500/MacBook_Pro_13-inch_Space_Gray_2-square_medium.jpg",
            eqpicSort: 6,
        },
    ],
    eqCreatedAt: '2023-03-13T16:21:30.894Z',
    eqUpdatedAt: '2023-03-16T16:21:30.894Z',
    eqPrices: [
        {
            eqpId: 1,
            eqpEqId: 1,
            eqpTypePerson: "member",
            eqpSubOption: "basic",
            eqpChecked: "yes",
            eqpIsChecked: true,
            eqpName: "Basic membership",
            eqpDescription: "Access to basic features",
            eqpQuantity: 1,
            eqpTotal: 100,
            eqpUnitPrice: 100,
            eqpUnitPer: "month",
            eqpCreatedAt: '2023-03-13T16:21:30.894Z',
            eqpUpdatedAt: '2023-03-15T16:21:30.894Z',
            eqSubPrice: [
                {
                    eqsubpId: 1,
                    eqsubpChecked: "no",
                    eqsubpName: "Premium membership",
                    eqsubpDescription: "Access to premium features",
                    eqsubpUnitPrice: 200,
                    eqsubpUnitPer: "month",
                    eqsubpQuantity: 1,
                    eqsubpTotal: 200,
                    eqsubpCreatedAt: '2023-03-13T16:21:30.894Z',
                    eqsubpUpdatedAt: '2023-03-13T16:21:30.894Z',
                },
            ],
        },
        {
            eqpId: 2,
            eqpEqId: 2,
            eqpTypePerson: "member",
            eqpSubOption: "basic",
            eqpChecked: "yes",
            eqpIsChecked: true,
            eqpName: "Basic membership",
            eqpDescription: "Access to basic features",
            eqpQuantity: 1,
            eqpTotal: 100,
            eqpUnitPrice: 100,
            eqpUnitPer: "month",
            eqpCreatedAt: '2023-03-13T16:21:30.894Z',
            eqpUpdatedAt: '2023-03-15T16:21:30.894Z',
            eqSubPrice: [],
        },
    ],
    eqPriceSubTotal: 100,
    bookId: 123,
    bookOwner: 1,
    bookAdvisor: 2,
    bookStatus: 'WAITING_FOR_PAYMENT',
    payOt: 0,
    payDiscount: 10,
    payFees: 0,
    payTotal: 100,
    bookCreatedAt: '2023-03-13T16:21:30.894Z',
    eqRtimDays: '2023-03-13T16:21:30.894Z',
    eqRtimTimes: [8, 10, 14],
};
const TABLE_HEAD = [
    { id: 'booking', label: 'Booking', align: 'left', width: 200 },
    { id: 'bookingDate', label: 'Booking Date', align: 'left', width: 150 },
    { id: 'bookingTime', label: 'Booking Time', align: 'left' },
    { id: 'estimatedCost', label: 'Estimated Cost', align: 'left' },
    { id: 'totalPaid', label: 'Total Paid', align: 'right', width: 100 },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'menu', label: '', align: 'left', width: 80 },
]

BookingReportPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export default function BookingReportPage() {
    const theme = useTheme()
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<IV1RespGetBookingMeRead[]>([])
    const [openPleaseContact, setOpenPleaseContact] = useState(false)

    const [filterName, setFilterName] = useState('')
    const [detailUser, setDetailUser] = useState(null)

    const permissionMe : IAccountUserPermission = 'Finance'

    const {
        order,
        orderBy,
        dense,
        page,
        rowsPerPage,
        selected,
        onSort,
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
        setTableData([mockData, mockData, mockData, mockData, mockData, mockData])
    }, [])

    const getLengthByStatus = (status: TBookStatus) =>
        tableData.filter((item) => item.bookStatus === status).length

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

    const handleRemove = (data: IV1RespGetBookingMeRead) => {
        setDetailUser(data)
        setOpenPleaseContact(true)
    }

    const TabsAdmin = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'pending', label: 'Pending', color: 'warning', count: getLengthByStatus('PENDING') },
        { value: 'confirm', label: 'Confirm', color: 'success', count: getLengthByStatus('CONFIRM')},
        { value: 'waiting', label: 'Waiting for Payment', color: 'secondary', count: getLengthByStatus('WAITING_FOR_PAYMENT')},
        { value: 'cancelled', label: 'Cancelled', color: 'default', count: getLengthByStatus('CANCELED')},
        { value: 'finish', label: 'Finish', color: 'default', count: getLengthByStatus('FINISH')},
    ] as const

    const TabsFinance = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'waiting', label: 'Waiting for Payment', color: 'secondary', count: getLengthByStatus('WAITING_FOR_PAYMENT')},
        { value: 'finish', label: 'Finish', color: 'default', count: getLengthByStatus('FINISH')},
    ] as const

    const TABS = permissionMe==='Finance'?TabsFinance:TabsAdmin
    
    return (
        <>
            <Head>
                <title>My Booking | KU</title>
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
                        heading="My Booking"
                        links={[{ name: 'My Booking' }, { name: 'List' }]}
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
                                    icon={
                                        <Label color={tab.color} sx={{ mr: 1 }}>
                                            {' '}
                                            {tab.count}{' '}
                                        </Label>
                                    }
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

                        <TableContainer sx={{ position: 'relative', overflow: 'unset', p: 1 }}>
                            <Scrollbar>
                                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                    <TableHeadCustom
                                        sx={{
                                            '& th': {
                                                color: theme.palette.text.primary,
                                                '&:first-child': {
                                                    borderTopLeftRadius: theme.spacing(1),
                                                    borderBottomLeftRadius: theme.spacing(1),
                                                },
                                                '&:last-child': {
                                                    borderTopRightRadius: theme.spacing(1),
                                                    borderBottomRightRadius: theme.spacing(1),
                                                },
                                            },
                                        }}
                                        headLabel={TABLE_HEAD}
                                        rowCount={tableData.length}
                                        order={order}
                                        orderBy={orderBy}
                                        numSelected={selected.length}
                                        onSort={onSort}
                                    />

                                    <TableBody>
                                        {tableData
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <MyBookingRow
                                                    key={row.bookId}
                                                    row={row}
                                                    selected={false}
                                                    onViewRow={() => {
                                                        // handleViewRow(row.id)
                                                    }}
                                                    onRemove={() => handleRemove(row)}
                                                />
                                            ))}

                                        <TableEmptyRows
                                            height={denseHeight}
                                            emptyRows={emptyRows(
                                                page,
                                                rowsPerPage,
                                                tableData.length
                                            )}
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
                    colorButton="inherit"
                    onClose={() => {
                        setOpenPleaseContact(false)
                    }}
                    title="Are you sure!"
                    content={
                        <Box>
                            {[
                                {
                                    sx: { mb: 0 },
                                    text: `To cancel booking number ${get(detailUser, 'no', '')}`,
                                },
                                {
                                    sx: { mt: 2 },
                                    text: `Booking number ${get(detailUser, 'no', '')}`,
                                },
                                {
                                    sx: { mb: 0 },
                                    text: `Coating Material (${get(detailUser, 'equipement', '')})`,
                                },
                                {
                                    sx: { mb: 0 },
                                    text: `At ${get(detailUser, 'bookingDate', '')} ${get(
                                        detailUser,
                                        'time',
                                        ''
                                    )}`,
                                },
                                {
                                    sx: { my: 2 },
                                    text: `Remark: after you cancelled booking, you can not recover this booking.`,
                                },
                            ].map((i, index) => (
                                <Typography
                                    key={'contact' + index}
                                    variant="body1"
                                    sx={{
                                        ...{
                                            color: (theme) =>
                                                palette(theme.palette.mode).text.secondary,
                                        },
                                        ...i.sx,
                                    }}
                                >
                                    {i.text}
                                </Typography>
                            ))}
                        </Box>
                    }
                    action={
                        <LoadingButton
                            fullWidth
                            color="error"
                            size="large"
                            type="button"
                            variant="contained"
                            onClick={() => {
                                setOpenPleaseContact(false)
                            }}
                        >
                            {'Yes, Cancel'}
                        </LoadingButton>
                    }
                />
            </Container>
        </>
    )
}
