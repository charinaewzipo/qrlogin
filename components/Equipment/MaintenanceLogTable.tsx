import { ChangeEvent, useEffect, useState, useCallback } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify'
import { yupResolver } from '@hookform/resolvers/yup'
import { EQUIPMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
import { get } from 'lodash'
import {
    Alert,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
    TextField,
    CircularProgress,
    FormHelperText,
    Autocomplete,
    Box,
    Paper,
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
    TablePagination,
    useTheme,
    Drawer,
} from '@mui/material'
import { useRouter } from 'next/router'
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
import Scrollbar from '@sentry/components/scrollbar'
import EquipmentScheduleRow from '@ku/components/Equipment/EquipmentScheduleRow'
import { useSnackbar } from 'notistack'
function MaintenanceLogTable() {
    const mockDataTable: IV1RespGetEquipmentUnavailableSchedule[] = [
        {
            equnavascheId: 123,
            equnavascheCreatedByName: 'Simsimi ok',
            equnavascheDays: 'Full Day',
            equnavascheTimes: [0, 1],
            equnavascheStatus: 'PENDING',
            equnavascheCreatedAt: 1648435200,
            equnavascheUpdatedAt: 1648435200,
        },
        {
            equnavascheId: 1234,
            equnavascheCreatedByName: 'Simsimi ok',
            equnavascheDays: 'Early morning',
            equnavascheTimes: [0, 1],
            equnavascheStatus: 'PENDING',
            equnavascheCreatedAt: 1648435200,
            equnavascheUpdatedAt: 1648435200,
        },
        {
            equnavascheId: 1235,
            equnavascheCreatedByName: 'Simsimi ok',
            equnavascheDays: 'Early morning',
            equnavascheTimes: [0, 1],
            equnavascheStatus: 'PENDING',
            equnavascheCreatedAt: 1648435200,
            equnavascheUpdatedAt: 1648435200,
        },
    ]
    const mockStats = {
        upcomingCount: 2,
        finishCount: 2,
    }
    const TABLE_HEAD = [
        { id: 'Date', label: 'Date', align: 'left', width: 150 },
        { id: 'Cost', label: 'Cost', align: 'right' },
        { id: 'File', label: 'File', align: 'center', width: 250 },
        { id: 'Descriptions', label: 'Descriptions', align: 'left' , width: 250 },
        { id: 'Create date', label: 'Create date', align: 'left', width: 120 },
    ]
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
    } = useTable()

    const [tableData, setTableData] = useState<IV1RespGetEquipmentUnavailableSchedule[]>([])
    const [scheduleStats, setScheduleStats] =
        useState<IV1RespGetEquipmentUnavailableStatsSchedule>()
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [filterStatus, setFilterStatus] = useState('upcoming')
    const [filterStartDate, setFilterStartDate] = useState<Date | null>(null)
    const [filterEndDate, setFilterEndDate] = useState<Date | null>(null)
    const [countDown, setCountDown] = useState<NodeJS.Timeout>()
    const [detailSchedule, setDetailSchedule] =
        useState<IV1RespGetEquipmentUnavailableSchedule>(null)
    const theme = useTheme()
    const { enqueueSnackbar } = useSnackbar()
    const { push } = useRouter()

    const handleViewRow = (id: number) => {
        push(MERGE_PATH(EQUIPMENT_PATH, '/schedule/detail', id.toString()))
    }

    const handleOnCancel = (item: IV1RespGetEquipmentUnavailableSchedule) => {
        setDetailSchedule(item)
        setOpenConfirmModal(true)
    }
    const isNotFound = !tableData.length
    return (
        <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }}>
            <Stack>
                <Stack sx={{ mt: 5 }} flexDirection="row" justifyContent="space-between">
                    <Typography>Maintenance Logs</Typography>
                    <Stack flexDirection="row" gap={2}>
                        <LoadingButton type="submit" variant="contained" size="small">
                            Add Maintenance Logs
                        </LoadingButton>
                    </Stack>
                </Stack>

                <Stack sx={{ mt: 5 }}>
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <Scrollbar>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                />

                                <TableBody>
                                    {tableData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <EquipmentScheduleRow
                                                    key={get(row, 'equnavascheId', -1)}
                                                    row={row}
                                                    onViewRow={() =>
                                                        handleViewRow(get(row, 'equnavascheId', -1))
                                                    }
                                                    onRemove={() => handleOnCancel(row)}
                                                />
                                            )
                                        })}

                                    <TableEmptyRows
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
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
                </Stack>
            </Stack>
        </Paper>
    )
}

export default MaintenanceLogTable
