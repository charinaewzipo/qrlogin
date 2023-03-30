import { TableRow, TableCell, Box } from '@mui/material'
import Label from '@sentry/components/label'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import { get, isEmpty } from 'lodash'
import { useTheme } from '@mui/material'
import { formatPhoneNumber } from '@ku/utils/formatNumber'

type Props = {
    row: IV1RespGetMemberRead
    onViewRow: VoidFunction
}
const styledTextOverFlow = {
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
}
export default function AccountAdminRow({ row, onViewRow }: Props) {

    const theme = useTheme()
    const name = `${get(row, 'uFirstName', '')} ${get(row, 'uSurname', '')}`

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                role="none"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell align="left">
                    <Box>
                        <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, maxWidth: 135 }}>{name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', ...styledTextOverFlow, maxWidth: 135 }}> {get(row, 'authEmail', '')}</Typography>
                    </Box>
                </TableCell>
                <TableCell align="left"> <Typography variant="body2" >{get(row, 'authPermission', '')}</Typography></TableCell>
                <TableCell align="left"> <Typography variant="body2" sx={{ color: 'text.disabled' }} >{get(row, 'uiStudentId', '')}</Typography></TableCell>
                <TableCell align="left"> <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, maxWidth: 110 }}>{get(row, 'uiAdvisorName', '')}</Typography></TableCell>

                <TableCell align="right">
                    <Box>
                        <Typography variant="body2" sx={{ color: get(row, 'uiCreditUsed', 0) >= get(row, 'uiCreditLimit', 0) ? theme.palette.error.dark : 'text.disabled' }}>{get(row, 'uiCreditUsed', 0).toLocaleString()} B</Typography>
                        <Typography variant="body2">{`/ ${get(row, 'uiCreditLimit', 0)} B`} </Typography>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box
                        sx={{ display: 'flex', ...styledTextOverFlow, maxWidth: 110 }}
                    >
                        <Typography variant="body2" sx={{ color: get(row, 'uiBookingUsed', 0) >= get(row, 'uiBookingLimit', 0) ? theme.palette.error.dark : 'text.primary' }} >{`${get(row, 'uiBookingUsed', 0)} `} </Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', pl: 0.5 }}> {`/ ${get(row, 'uiBookingLimit', 0)} Time `}</Typography>
                    </Box>

                </TableCell>

                <TableCell align="left">{formatPhoneNumber(get(row, 'uPhoneNumber', ''))}</TableCell>
                <TableCell align="left">
                    {format((get(row, 'uiCardExpireDate', new Date())), 'dd MMM yyyy')}
                </TableCell>

                <TableCell align="left">
                    <Label color={row.authAccountStatus === 'Active' ? 'success' : row.authAccountStatus === 'Inactive' ? 'warning' : 'error'}>{get(row, 'authAccountStatus', '')}</Label>
                </TableCell>
            </TableRow>
        </>
    )
}
