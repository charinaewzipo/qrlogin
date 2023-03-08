import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tab, Tabs, Card, Table, Divider, TableBody, TableContainer } from '@mui/material'
import { ACCOUNT_PATH, MERGE_PATH } from '@ku/constants/routes'
// components
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import {
    useTable,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TablePaginationCustom,
} from '@sentry/components/table'
import AssessmentParticipationRow from '@ku/components/Assessment/AssessmentParticipationRow'
import { fetchGetAssessmentPaticipation } from '@ku/services/assessment'
import AssessmentParticipationToolsbar from './AssessmentParticipationToolsbar'

const TABLE_HEAD = [
    { id: 'id', label: 'ID', align: 'left', width: 120 },
    { id: 'name', label: 'Account name', align: 'left' },
    { id: 'position', label: 'Position/Department', align: 'left' },
    { id: 'accountExpiry', label: 'Account Expiry', align: 'left', width: 140 },
    { id: 'assessDate', label: 'Assess date', align: 'left', width: 120 },
    { id: 'status', label: 'Status', align: 'left', width: 110 },
]

export default function AssessmentParticipatingList() {
    const {
        push,
        query: { id },
    } = useRouter()
    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'name',
    }) // TODO: please change createDate

    const [tableData, setTableData] = useState<IAssessmentParticipation[]>([])
    const [filterID, setFilterID] = useState('')
    const [filterEmail, setFilterEmail] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    const isFiltered = filterID !== '' || filterEmail !== '' || filterName !== ''

    const isNotFound =
        (!tableData.length && !!filterName) ||
        (!tableData.length && !!filterID) ||
        (!tableData.length && !!filterEmail)

    const getLengthByStatus = (status: string) =>
        tableData.filter((item) => item.status === status).length

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        { value: 'done', label: 'Assess', color: 'success', count: getLengthByStatus('done') },
        {
            value: 'pending',
            label: 'Unassess',
            color: 'warning',
            count: getLengthByStatus('pending'),
        },
    ] as const

    useEffect(() => {
        getAssessmentPaticipationList()
    }, [])

    const getAssessmentPaticipationList = async () => {
        // TODO: Add filter parameter
        const response = await fetchGetAssessmentPaticipation(`${id}`)
        if (response.data) {
            setTableData(response.data)
        }
    }

    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
    }

    const handleFilterID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setFilterID(event.target.value)
    }

    const handleFilterEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setFilterEmail(event.target.value)
    }

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setFilterName(event.target.value)
    }

    const handleViewUser = (id: string) => {
        push(MERGE_PATH(ACCOUNT_PATH, 'detail', id))
    }

    const handleResetFilter = () => {
        setFilterName('')
        setFilterID('')
        setFilterEmail('')
    }

    return (
        <Card sx={{ mt: 6 }}>
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

            <AssessmentParticipationToolsbar
                isFiltered={isFiltered}
                filterID={filterID}
                filterEmail={filterEmail}
                filterName={filterName}
                onFilterID={handleFilterID}
                onFilterEmail={handleFilterEmail}
                onFilterName={handleFilterName}
                onResetFilter={handleResetFilter}
            />

            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                    <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                        <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length} />

                        <TableBody>
                            {tableData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <AssessmentParticipationRow
                                        key={row.id}
                                        row={row}
                                        onViewUser={() => handleViewUser(row.id)}
                                    />
                                ))}

                            <TableEmptyRows
                                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                            />

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
    )
}
