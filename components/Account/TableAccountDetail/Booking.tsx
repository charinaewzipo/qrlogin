import { fetchGetAssessments } from '@ku/services/assessment'
import { Box, Card, Divider, Stack, Tab, Table, TableBody, TableContainer, Tabs, Typography } from '@mui/material'
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@sentry/components/table'
import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { get, isEmpty } from 'lodash'
import ConfirmDialog from '@ku/components/ConfirmDialog'
import palette from '@sentry/theme/palette'
import BookingToolsbar from './BookingToolsbar'
import BookingRow from './BookingRow'
import { LoadingButton } from '@mui/lab'

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
    id: "0001",
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
    id: "0001",
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
    id: "0001",
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
    id: "0001",
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

export default function Booking() {
    const { enqueueSnackbar } = useSnackbar()
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<IBooking[]>([])
    const [openPleaseContact, setOpenPleaseContact] = useState(false)

    const [filterName, setFilterName] = useState('')
    const [detailUser, setDetailUser] = useState(null)
    
    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'createDate',
    }) // TODO: please change createDate
    const denseHeight = dense ? 56 : 76

    const isFiltered = filterName !== ''

    useEffect(() => {
        // setTimeout(()=>{
        //     getAssessmentList('Done')
        // },2000)
        setTableData(MockData)
    }, [])

    useEffect(() => {
        console.log("filterStatus",filterStatus);
        // getAssessmentList(filterStatus)
    }, [filterStatus])

    // const getAssessmentList = async (query:string) => {
    //     // TODO: Add filter parameter
    //     const response = await fetchGetAssessments()
    //     console.log("query",query);
        
    //     if (response.data) {
    //         setTableData(response.data)
    //     }
    // }
    
    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
    }

    const getLengthByStatus = (status: string) =>
        tableData.filter((item) => item.status === status).length

    const handleCopyLink = (link: string) => {
        // TODO: Handle this
        console.log('handleCopyLink...')
        enqueueSnackbar('Copied.', { variant: 'default', action: () => <></> })
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

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'pending', label: 'Pending', color: 'warning', count: getLengthByStatus('paid') },
        { value: 'confirm', label: 'Confirm', color: 'success', count: getLengthByStatus('unpaid')},
        { value: 'waiting', label: 'Waiting for Payment', color: 'secondary', count: getLengthByStatus('unpaid')},
        { value: 'cancelled', label: 'Cancelled', color: 'default', count: getLengthByStatus('unpaid')},
        { value: 'finish', label: 'Finish', color: 'default', count: getLengthByStatus('unpaid')},
    ] as const

    return (
        <>
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
                                {tab.count}
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
                                .map((row) => (
                                    <BookingRow
                                        key={row.id}
                                        row={row}
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
        </>
    )
}
