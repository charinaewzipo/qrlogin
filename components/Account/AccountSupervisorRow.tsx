import { Button, TableRow, TableCell, Box } from '@mui/material'
import { fDate } from '@sentry/utils/formatTime'
import Label from '@sentry/components/label'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import { isEmpty } from 'lodash'
import { useTheme } from '@mui/material'
import { formatPhoneNumber } from '@ku/utils/formatNumber'
import Iconify from '@sentry/components/iconify/Iconify'

type Props = {
    row: IAccountUser
    onViewRow: VoidFunction
    // onCopyLink: VoidFunction
}

const styledTextOverFlow = {
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
}
export default function InvoiceTableRow({ row, onViewRow }: Props) {
    const { name, email, department, major, studentID, supervisorName, creditLimit, bookLimit, phone, expiredate, status } = row
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
                        <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, maxWidth: 115 }}>{name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', ...styledTextOverFlow, maxWidth: 115 }}> {email}</Typography>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box>
                        <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, maxWidth: 110 }}>{department}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', ...styledTextOverFlow, maxWidth: 110 }}> {major}</Typography>
                    </Box>
                </TableCell>
                <TableCell align="left"> <Typography variant="body2" sx={{ color: 'text.disabled' }} >{studentID}</Typography></TableCell>


                <TableCell align="right">
                    <Box>
                        <Typography variant="body2" sx={{ color: creditLimit > 15000 ? theme.palette.error.dark : 'text.disabled' }}>{creditLimit.toLocaleString()} B</Typography>
                        <Typography variant="body2">/ 15,000 B </Typography>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box
                        sx={{ display: 'flex' }}
                    >

                        <Typography variant="body2" sx={{ color: bookLimit === 10 ? theme.palette.error.dark : 'text.primary' }} >{`${bookLimit}`}<br /> </Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', pl: 0.5 }}> / 10 Time </Typography>
                    </Box>

                </TableCell>

                <TableCell align="left">{formatPhoneNumber(phone)}</TableCell>
                <TableCell align="left">
                    {!isEmpty(expiredate) && format(new Date(expiredate), 'dd MMM yyyy')}
                </TableCell>

                <TableCell align="left">
                    <Label color={status === 'Active' ? 'success' : status === 'Pending' ? 'info' : 'error'}>{status}</Label>
                </TableCell>

                <TableCell align="left">


                    <Button
                        color="error"
                        sx={{ flexShrink: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                    >
                        Remove
                    </Button>
                </TableCell>
            </TableRow>
        </>
    )
}
