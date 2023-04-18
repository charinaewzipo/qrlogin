import { ACCOUNT_PATH, MERGE_PATH } from '@ku/constants/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Card, Divider, Stack, Tab, Table, TableBody, TableContainer, Tabs, Typography } from '@mui/material'
import Label from '@sentry/components/label'
import Scrollbar from '@sentry/components/scrollbar'
import { useSnackbar } from '@sentry/components/snackbar'
import { TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@sentry/components/table'
import palette from '@sentry/theme/palette'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ConfirmDialog from '../../ConfirmDialog'
import AccountSupervisorRow from '../AccountSupervisorRow'
import AccountSupervisorToolsbar from '../AccountSupervisorToolsbar'

const TABLE_HEAD = [
    { id: 'accountName', label: 'Account Name', align: 'left' },
    { id: 'department', label: 'Department', align: 'left', },
    { id: 'studentID', label: 'Student ID', align: 'left', },
    { id: 'creditLimit', label: 'Credit Limit', align: 'left', width: 120 },
    { id: 'bookLimit', label: 'Book Limit', align: 'left', width: 120 },
    { id: 'contactNumber', label: 'Contact Number', align: 'left', width: 160 },
    { id: 'accountExpiry', label: 'Account Expiry', align: 'left', width: 150 },
    { id: 'status', label: 'Status', align: 'left', },
    { id: 'button', label: '', align: 'left', },
  ]
const ROLE_OPTIONS = [
    'All',
    'Admin',
    'Finance',
    'Supervisor',
    'User',
];

const mockTableData: any[] = [
    {
      id: "27658a79-ac6c-4003-b927-23b260840208",
      name: "Eleanor PenaEleanor PenaEleanor PenaEleanor Pena",
      email: "eleanor.pena@ku.ac.thEleanor PenaEleanor Pena",
      permission: "User",
      studentID: "1579900542880",
      supervisorName: "Anna YesmanPenaEleanor Pen",
      creditLimit: 0,
      bookLimit: 0,
      phone: "0854888882",
      expiredate: new Date().toString(),
      status: "Active",
      department: "Master studentPenaEleanor Pen",
      major: "InformationInformationInformationPenaEleanor Pen "
    },
    {
      id: "34658a79-ac6c-4003-b927-23b261840208",
      name: "Eleanor Pena",
      email: "eleanor.pena@ku.ac.th",
      permission: "Supervisor",
      studentID: "1579900542881",
      supervisorName: "",
      creditLimit: 21000,
      bookLimit: 10,
      phone: "0854888882",
      expiredate: "",
      status: "Inactive",
      department: "Master studentstudent",
      major: "Information technical"
    },
    {
      id: "37558a79-ac6c-4003-b927-23b360840208",
      name: "Eleanor Pena",
      email: "eleanor.pena@ku.ac.th",
      permission: "Finance",
      studentID: "1579900542820",
      supervisorName: "",
      creditLimit: 0,
      bookLimit: 0,
      phone: "0854888882",
      expiredate: new Date().toString(),
      status: "Locked",
      department: "Master student",
      major: "Information technical"
    },
    {
      id: "11658a79-ac6c-4003-b927-53b260840208",
      name: "Eleanor Pena",
      email: "eleanor.pena@ku.ac.th",
      permission: "Admin",
      studentID: "1579900542480",
      supervisorName: "Anna Yesman",
      creditLimit: 0,
      bookLimit: 10,
      phone: "0854888882",
      expiredate: new Date().toString(),
      status: "Pending",
      department: "Master student",
      major: "Information technical"
    },
  
  ]

export default function UserSupervise() {
    const { enqueueSnackbar } = useSnackbar()
    const [filterStatus, setFilterStatus] = useState('all')
    const [tableData, setTableData] = useState<any[]>([])
    const { push } = useRouter()
    const [openPleaseContact, setOpenPleaseContact] = useState(false)
    const [detailUser, setDetailUser] = useState(null)

    const [filterStudentID, setFilterStudentID] = useState('')
    const [filterEmail, setFilterEmail] = useState('')
    const [filterName, setFilterName] = useState('')

    const [countDown, setCountDown] = useState<NodeJS.Timeout>();

    const { dense, page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'createDate',
    }) // TODO: please change createDate

    useEffect(() => {
        setTableData(mockTableData)
    }, [])
    
    
    const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setPage(0)
        setFilterStatus(newValue)
      }

    const handleCountdown = (value: string, key: string) => {
        setPage(0)
        clearTimeout(countDown);
        setCountDown(
            setTimeout(() => {
                console.log(key, ":", value)
            }, 1000)
        );
    }
    
    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setFilterName(value);
        handleCountdown(filterName, name)
      }
      const handleFilterEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setFilterEmail(value)
        handleCountdown(filterEmail, name)
      }
      const handleFilterStudentID = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = event.target
        setFilterStudentID(value);
        handleCountdown(filterStudentID, name)
      }
    
      const handleViewRow = (id: string) => {
        push(MERGE_PATH(ACCOUNT_PATH, 'detail', id))
      }
      const handleRemove = (data:any)=>{
        setDetailUser(data)
        setOpenPleaseContact(true)
        console.log("data",data);
      }

    const getLengthByStatus = (status: string) =>
        tableData.filter((item) => item.status === status).length

    const TABS = [
        { value: 'all', label: 'All', color: 'default', count: tableData.length },
        {
            value: 'Waiting for approve',
            label: 'Waiting for approve',
            color: 'info',
            count: getLengthByStatus('Waiting for approve'),
        },
        { value: 'active', label: 'Active', color: 'success', count: getLengthByStatus('Active') },
    
        { value: 'locked', label: 'Locked', color: 'error', count: getLengthByStatus('Locked') },
        ] as const

    return (
        <>
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

            <AccountSupervisorToolsbar
                filterStudentID={filterStudentID}
                onFilterStudentID={handleFilterStudentID}
                filterEmail={filterEmail}
                onFilterEmail={handleFilterEmail}
                filterName={filterName}
                onFilterName={handleFilterName}
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
                            .map((row) => {
                            return (
                                <AccountSupervisorRow
                                    key={row.id}
                                    row={row}
                                    onViewRow={() => handleViewRow(row.id)}
                                    onRemove={() => {
                                        handleRemove(row)
                                    }}
                                />
                            )
                            })}

                        {/* <TableEmptyRows
                            height={denseHeight}
                            emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                        />

                        <TableNoData isNotFound={isNotFound} /> */}
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
            onClose={() => {
                enqueueSnackbar(`Failled to remove ${get(detailUser,"email","")}.`,{ variant: 'error'});
                setOpenPleaseContact(false)
            }}
            colorButton="inherit"
            title="Are you sure!"
            content={
                <Box>
                    {[
                        { sx: { mb: 0 }, text: `To confirm remove ${get(detailUser,"name","")},` },
                        { sx: { mt: 2 }, text: `Mr. ${get(detailUser,"name","")} (${get(detailUser,"studentID","")})` },
                        { sx: { mb: 2 }, text: `${get(detailUser,"department","")} from SciKU Student of Dept. of ${get(detailUser,"major","")}` },
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
                onClick={() => { 
                    enqueueSnackbar(`Removed ${get(detailUser,"email","")} success.`);
                    setOpenPleaseContact(false) 
                }}
            >
                {"Yes, Remove"}
            </LoadingButton>}
        />
    </>
    )
}
