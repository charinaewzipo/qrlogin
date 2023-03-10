import { Button, TableRow, TableCell, Box } from '@mui/material'
import { fDate } from '@sentry/utils/formatTime'
import Label from '@sentry/components/label'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import { isEmpty } from 'lodash'
import { useTheme } from '@mui/material'
import { formatPhoneNumber } from '@ku/utils/formatNumber'

type Props = {
    row: IAccountUser
    onViewRow: VoidFunction
    // onCopyLink: VoidFunction
}
const styledTextOverFlow = {
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
}
export default function InvoiceTableRow({ row, onViewRow }: Props) {
    const { name, email, permission, studentID, supervisorName, creditLimit, bookLimit, phone, expiredate, status } = row
    const theme = useTheme()
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
                        <Typography variant="body2" sx={{ color: 'text.disabled', ...styledTextOverFlow, maxWidth: 135 }}> {email}</Typography>
                    </Box>
                </TableCell>
                <TableCell align="left"> <Typography variant="body2" >{permission}</Typography></TableCell>
                <TableCell align="left"> <Typography variant="body2" sx={{ color: 'text.disabled' }} >{studentID}</Typography></TableCell>
                <TableCell align="left"> <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, maxWidth: 110 }}>{supervisorName}</Typography></TableCell>

                <TableCell align="right">
                    <Box>
                        <Typography variant="body2" sx={{ color: creditLimit > 15000 ? theme.palette.error.dark : 'text.disabled' }}>{creditLimit.toLocaleString()} B</Typography>
                        <Typography variant="body2">/ 15,000 B </Typography>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box
                        sx={{ display: 'flex', ...styledTextOverFlow, maxWidth: 110 }}
                    >
                        <Typography variant="body2" sx={{ color: bookLimit === 10 ? theme.palette.error.dark : 'text.primary' }} >{`${bookLimit} `} </Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', pl: 0.5 }}> / 10 Time </Typography>
                    </Box>

                </TableCell>

                <TableCell align="left">{formatPhoneNumber(phone)}</TableCell>
                <TableCell align="left">
                    {!isEmpty(expiredate) && format(new Date(expiredate), 'dd MMM yyyy')}
                </TableCell>

                <TableCell align="left">
                    <Label color={status === 'Active' ? 'success' : status === 'Inactive' ? 'warning' : 'error'}>{status}</Label>
                </TableCell>
            </TableRow>
        </>
    )
}
