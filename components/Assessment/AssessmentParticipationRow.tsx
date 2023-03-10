import { TableRow, TableCell, Stack, Typography, Link } from '@mui/material'
import { fDate } from '@sentry/utils/formatTime'
import Label from '@sentry/components/label'

type Props = {
    row: IAssessmentParticipation
    onViewUser: VoidFunction
}

export default function AssessmentParticipationRow({ row, onViewUser }: Props) {
    const { id, name, email, position, department, accountExpiry, assessDate, status } = row

    return (
        <>
            <TableRow hover tabIndex={-1} role="none">
                <TableCell align="left">{id}</TableCell>
                <TableCell align="left">
                    <Stack>
                        <Link
                            noWrap
                            color="inherit"
                            variant="subtitle2"
                            onClick={onViewUser}
                            sx={{ cursor: 'pointer' }}
                        >
                            {name}
                        </Link>
                        <Typography variant="body2" color="text.disabled">
                            {email}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="left">
                    <Stack>
                        <Typography variant="subtitle2" color="inherit">
                            {position}
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                            {department}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="left">{accountExpiry && fDate(accountExpiry)}</TableCell>
                <TableCell align="left">{assessDate && fDate(assessDate)}</TableCell>
                <TableCell align="left">
                    <Label color={status === 'Done' ? 'success' : 'warning'}>{status}</Label>
                </TableCell>
            </TableRow>
        </>
    )
}
