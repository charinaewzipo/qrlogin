import { fetchGetAssessments } from '@ku/services/assessment'
import { Card, Divider, Stack, Tab, Table, TableBody, TableContainer, Tabs, Typography } from '@mui/material'
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@sentry/components/table'
import { useState, useEffect } from 'react'
import AssessmentRow from '../Assessment/AssessmentRow'
import { useSnackbar } from 'notistack'
import { isEmpty } from 'lodash'
import AssessmentToolsbar from './AssessmentToolsbar'

const TABLE_HEAD = [
    { id: 'date', label: 'Assessment date', align: 'left', width: 212 },
    { id: 'name', label: 'Assessment', align: 'left' },
    { id: 'link', label: 'Link', align: 'left', width: 118 },
    { id: 'status', label: 'Status', align: 'left', width: 140 },
]

export default function UserSupervise() {
    const { enqueueSnackbar } = useSnackbar()
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<IAssessment[]>([])
    const [filterName, setFilterName] = useState('')

    const isFiltered = filterName !== ''

    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'createDate',
    }) // TODO: please change createDate
    const denseHeight = dense ? 56 : 76

    useEffect(() => {
        setTimeout(()=>{
            getAssessmentList('Done')
        },2000)
    }, [])

    useEffect(() => {
        console.log("filterStatus",filterStatus);
        getAssessmentList(filterStatus)
    }, [filterStatus])

    const getAssessmentList = async (query:string) => {
        // TODO: Add filter parameter
        const response = await fetchGetAssessments()
        console.log("query",query);
        
        if (response.data) {
            setTableData(response.data)
        }
    }
    
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

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'Active', label: 'Pending', color: 'warning', count: getLengthByStatus('paid') },
        { value: 'Inactive', label: 'Complete', color: 'default', count: getLengthByStatus('unpaid'),
        },
    ] as const

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setFilterName(event.target.value)
    }
    const handleResetFilter = () => {
        setFilterName('')
    }

    return (
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

            <AssessmentToolsbar
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
                                    <AssessmentRow
                                        key={row.id}
                                        row={row}
                                        onViewRow={() => {
                                            // handleViewRow(row.id)
                                        }}
                                        onCopyLink={() => handleCopyLink(row.link)}
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
    )
}
