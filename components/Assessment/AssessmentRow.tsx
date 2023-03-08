import { Button, TableRow, TableCell } from '@mui/material'
import { fDate } from '@sentry/utils/formatTime'
import Label from '@sentry/components/label'

type Props = {
    row: IAssessment
    onViewRow: VoidFunction
    onCopyLink: VoidFunction
}

export default function InvoiceTableRow({ row, onViewRow, onCopyLink }: Props) {
    const { assessmentDateFrom, assessmentDateTo, name, status } = row

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                role="none"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell align="left">{`${assessmentDateFrom && fDate(assessmentDateFrom)}${
                    assessmentDateTo && ` - ${fDate(assessmentDateTo)}`
                }`}</TableCell>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">
                    <Button
                        color="info"
                        variant="text"
                        onClick={(e) => {
                            e.stopPropagation()
                            onCopyLink()
                        }}
                    >
                        Copy Link
                    </Button>
                </TableCell>
                <TableCell align="left">
                    <Label color={status === 'Active' ? 'success' : 'warning'}>{status}</Label>
                </TableCell>
            </TableRow>
        </>
    )
}
