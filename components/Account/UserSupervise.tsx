import { Card, Divider, Stack, Tab, Table, TableBody, TableContainer, Tabs, Typography } from '@mui/material'
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import { TableHeadCustom, TablePaginationCustom, useTable } from '@sentry/components/table'
import { useState, useEffect } from 'react'

const TABLE_HEAD = [
    { id: 'date', label: 'Assessment date', align: 'left', width: 212 },
    { id: 'name', label: 'Assessment', align: 'left' },
    { id: 'link', label: 'Link', align: 'left', width: 118 },
    { id: 'status', label: 'Status', align: 'left', width: 140 },
]

export default function UserSupervise() {
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<IAssessment[]>([])

    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'createDate',
    }) // TODO: please change createDate
    
    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
    }

    const getLengthByStatus = (status: string) =>
        tableData.filter((item) => item.status === status).length

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'active', label: 'Active', color: 'success', count: getLengthByStatus('paid') },
        {
            value: 'inactive',
            label: 'Inactive',
            color: 'warning',
            count: getLengthByStatus('unpaid'),
        },
    ] as const

    return (
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

            {/* <AssessmentToolsbar
                isFiltered={isFiltered}
                filterName={filterName}
                onFilterName={handleFilterName}
                onResetFilter={handleResetFilter}
            /> */}

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

                                    <>0000</>
                                    // <AssessmentRow
                                    //     key={row.id}
                                    //     row={row}
                                    //     onViewRow={() => handleViewRow(row.id)}
                                    //     onCopyLink={() => handleCopyLink(row.link)}
                                    // />
                                ))}

                            {/* <TableEmptyRows
                                height={denseHeight}
                                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                            /> */}

                            {/* <TableNoData isNotFound={isNotFound} /> */}
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
    )
}
