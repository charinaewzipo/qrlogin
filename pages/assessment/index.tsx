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
import { ASSESSMENT_PATH, MERGE_PATH } from '@ku/constants/routes'
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
import AssessmentToolsbar from '@ku/components/Assessment/AssessmentToolsbar'
import AssessmentRow from '@ku/components/Assessment/AssessmentRow'
import { fetchGetAssessments } from '@ku/services/assessment'
import { useSnackbar } from 'notistack'

const TABLE_HEAD = [
    { id: 'date', label: 'Assessment date', align: 'left', width: 212 },
    { id: 'name', label: 'Assessment', align: 'left' },
    { id: 'link', label: 'Link', align: 'left', width: 118 },
    { id: 'status', label: 'Status', align: 'left', width: 140 },
]

AssessmentPage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function AssessmentPage() {
    const { enqueueSnackbar } = useSnackbar()
    const { push } = useRouter()

    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'createDate',
    }) // TODO: please change createDate

    const [tableData, setTableData] = useState<IAssessment[]>([])
    const [filterName, setFilterName] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    const denseHeight = dense ? 56 : 76

    const isFiltered = filterName !== ''
    const isNotFound = !tableData.length && !!filterName

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

    useEffect(() => {
        getAssessmentList()
    }, [])

    const getAssessmentList = async () => {
        // TODO: Add filter parameter
        const response = await fetchGetAssessments()
        if (response.data) {
            setTableData(response.data)
        }
    }

    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
    }

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setFilterName(event.target.value)
    }

    const handleViewRow = (id: string) => {
        push(MERGE_PATH(ASSESSMENT_PATH, 'detail', id))
    }

    const handleCopyLink = (link: string) => {
        // TODO: Handle this
        console.log('handleCopyLink...')
        enqueueSnackbar('Copied.', { variant: 'default', action: () => <></> })
    }

    const handleResetFilter = () => {
        setFilterName('')
    }

    return (
        <>
            <Head>
                <title> Assessments | KU</title>
            </Head>

            <Container>
                <CustomBreadcrumbs
                    heading="Assessments"
                    links={[
                        {
                            name: 'Assessments',
                            href: ASSESSMENT_PATH,
                        },
                        {
                            name: 'List',
                        },
                    ]}
                    action={
                        <NextLink href={MERGE_PATH(ASSESSMENT_PATH, 'create')} passHref>
                            <Button
                                variant="contained"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                            >
                                Create Assessment
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
                                                onViewRow={() => handleViewRow(row.id)}
                                                onCopyLink={() => handleCopyLink(row.link)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={denseHeight}
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
            </Container>
        </>
    )
}
