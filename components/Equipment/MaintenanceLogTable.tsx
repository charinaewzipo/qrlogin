import { LoadingButton } from '@mui/lab'
import { get } from 'lodash'
import {
    Stack,
    Typography,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import {
    useTable,
    TableNoData,
    TableHeadCustom,
} from '@sentry/components/table'
import Scrollbar from '@sentry/components/scrollbar'
import MaintenanceLogRow from './MaintenanceLogRow'
import { useEffect } from 'react'

interface Props {
    maintenanceLogsData: IV1GetEquipmentMaintenanceRead[]
    totalRecord: number
    onClickAddLogs: () => void
    onPageChange?: (page: number, limit: number) => void
}
function MaintenanceLogTable({
    maintenanceLogsData,
    totalRecord,
    onClickAddLogs,
    onPageChange,
}: Props) {
    const TABLE_HEAD = [
        { id: 'Date', label: 'Date', align: 'left' },
        { id: 'Cost', label: 'Cost', align: 'right' },
        { id: 'File', label: 'File', align: 'center' },
        { id: 'Descriptions', label: 'Descriptions', align: 'left' },
        { id: 'Create date', label: 'Create date', align: 'left' },
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

    const theme = useTheme()
    const {
        isReady,
    } = useRouter()

    useEffect(() => {
        if (!isReady) return
        onPageChange(page, rowsPerPage)
    }, [page, rowsPerPage, isReady])

    const isNotFound = !maintenanceLogsData.length
    return (
        <Stack gap={8}>
            <Stack sx={{ mt: 12 }} flexDirection="row" justifyContent="space-between">
                <Typography variant="h5">Maintenance Logs</Typography>
                <Stack flexDirection="row" gap={2}>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="info"
                        onClick={onClickAddLogs}
                    >
                        Add Maintenance Logs
                    </LoadingButton>
                </Stack>
            </Stack>

            <Paper elevation={8} sx={{ borderRadius: 2 }}>
                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Scrollbar>
                        <Table
                            sx={{
                                minWidth: 650,
                                'thead > tr > th': {
                                    color: theme.palette.text.primary,
                                },
                                th: {
                                    backgroundColor: 'transparent',
                                },
                                tr: {
                                    boxShadow: `0px 1px 0px 0px ${theme.palette.divider}`,
                                    'th:first-child, td:first-child': { pl: 3 },
                                },
                            }}
                        >
                            <TableHeadCustom
                                headLabel={TABLE_HEAD}
                                rowCount={maintenanceLogsData.length}
                            />

                            <TableBody>
                                {maintenanceLogsData
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <MaintenanceLogRow
                                                key={get(row, 'equnavascheId', -1)}
                                                row={row}
                                            />
                                        )
                                    })}

                                <TableNoData isNotFound={isNotFound} />
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
                <TablePagination
                    sx={{ borderTop: `2px solid ${theme.palette.divider}` }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRecord}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                />
            </Paper>
        </Stack>
    )
}

export default MaintenanceLogTable
