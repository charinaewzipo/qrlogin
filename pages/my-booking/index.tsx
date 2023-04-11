// next
import Head from 'next/head'
import AuthorizedLayout from '@ku/layouts/authorized'
import { Box, Card, Container, Divider, Tab, Table, TableBody, TableContainer, Tabs, Typography, useTheme } from '@mui/material'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { useEffect, useState } from 'react'
import { emptyRows, getComparator, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@sentry/components/table'
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import ConfirmDialog from '@ku/components/ConfirmDialog'
import { get, isEmpty, lowerCase } from 'lodash'
import palette from '@sentry/theme/palette'
import { LoadingButton } from '@mui/lab'
import MyBookingRow from '@ku/components/MyBooking/MyBookingRow'
import BookingToolsbar from '@ku/components/MyBooking/Table/BookingToolsbar'
import { fTimestamp } from '@sentry/utils/formatTime'
import { useRouter } from 'next/router'
import { MERGE_PATH, MY_BOOKING_PATH } from '@ku/constants/routes'

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
const mockData2: IV1RespGetBookingMeRead = {
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
    bookStatus: 'WAITING_FOR_PAYMENT_CONFIRM',
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
    { id: 'estimatedCost', label: 'Estimated Cost', align: 'right', width: 140 },
    { id: 'totalPaid', label: 'Total Paid', align: 'right', width: 120 },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'menu', label: '', align: 'left', width: 80 },
]

MyBookingList.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export default function MyBookingList() {
    const theme = useTheme()
    const router = useRouter()
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<IV1RespGetBookingMeRead[]>([])
    const [openPleaseContact, setOpenPleaseContact] = useState(false)

    const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
    const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
    const [filterName, setFilterName] = useState('')
    const [detailUser, setDetailUser] = useState(null)

    const permissionMe = 'Finance'

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
        onChangeRowsPerPage,
    } = useTable()

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        permission: permissionMe,
        filterName,
        filterStatus,
        filterStartDate,
        filterEndDate,
    })

    const denseHeight = dense ? 56 : 76

    const isFiltered = filterName !== ''

    useEffect(() => {
        // setTimeout(()=>{ getAssessmentList('Done') },2000)
        setTableData([mockData, mockData2, mockData, mockData, mockData, mockData, mockData])
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
        setFilterEndDate(null)
        setFilterStartDate(null)
    }

    const handleRemove = (data: IV1RespGetBookingMeRead) => {
        setDetailUser(data)
        setOpenPleaseContact(true)
    }
    const handleViewRow = (bookId: string) => {
        router.push({ pathname: MERGE_PATH(MY_BOOKING_PATH, bookId)})
    }

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'pending', label: 'Pending', color: 'warning', count: getLengthByStatus('PENDING') },
        { value: 'confirm', label: 'Confirm', color: 'success', count: getLengthByStatus('CONFIRM')},
        { value: 'waiting', label: 'Waiting for Payment', color: 'secondary', count: getLengthByStatus('WAITING_FOR_PAYMENT') + getLengthByStatus('WAITING_FOR_PAYMENT_CONFIRM')},
        { value: 'cancelled', label: 'Cancelled', color: 'default', count: getLengthByStatus('CANCELED')},
        { value: 'finish', label: 'Finish', color: 'default', count: getLengthByStatus('FINISH')},
    ] as const

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
                            filterStartDate={filterStartDate}
                            filterEndDate={filterEndDate}
                            onFilterName={handleFilterName}
                            onResetFilter={handleResetFilter}
                            onFilterStartDate={(newValue) => {
                                setFilterStartDate(newValue)
                            }}
                            onFilterEndDate={(newValue) => {
                                setFilterEndDate(newValue)
                            }}
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
                                        {dataFiltered
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <MyBookingRow
                                                    key={row.bookId}
                                                    row={row}
                                                    onViewRow={() => {
                                                        handleViewRow(String(row.bookId))
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

                                        <TableNoData isNotFound={isEmpty(dataFiltered)} />
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </TableContainer>

                        <TablePaginationCustom
                            count={dataFiltered.length}
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

// ----------------------------------------------------------------------

function applyFilter({
    inputData,
    comparator,
    permission,
    filterName,
    filterStatus,
    filterStartDate,
    filterEndDate,
}: {
    inputData: IV1RespGetBookingMeRead[]
    comparator: (a: any, b: any) => number
    permission: string
    filterName: string
    filterStatus: string
    filterStartDate: Date | null
    filterEndDate: Date | null
}) {
    const stabilizedThis = inputData.map((el, index) => [el, index] as const)

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    inputData = stabilizedThis.map((el) => el[0])

    if (filterName) {
        inputData = inputData.filter(
            (booking) =>
                booking.eqName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                String(booking.bookId).toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        )
    }

    if (filterStatus !== 'all') {
        //   inputData = inputData.filter((booking) => booking.bookStatus.toLowerCase().includes(filterStatus.toLowerCase()))
        if (filterStatus === 'waiting')
            inputData = inputData.filter(
                (booking) =>
                    booking.bookStatus === 'WAITING_FOR_PAYMENT' ||
                    booking.bookStatus === 'WAITING_FOR_PAYMENT_CONFIRM'
            )
        else
            inputData = inputData.filter(
                (booking) => lowerCase(booking.bookStatus) === filterStatus.toLowerCase()
            )
    }

    if (filterStartDate) {
        inputData = inputData.filter(
            (booking) => fTimestamp(booking.bookCreatedAt) >= fTimestamp(filterStartDate)
        )
    }

    if (filterEndDate) {
        inputData = inputData.filter(
            (booking) => fTimestamp(booking.bookCreatedAt) <= fTimestamp(filterEndDate)
        )
    }

    return inputData
}
