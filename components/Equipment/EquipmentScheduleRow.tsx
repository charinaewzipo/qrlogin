// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Button } from '@mui/material';
import Label from '@sentry/components/label/Label';
// utils
import { format } from 'date-fns'
import { isEmpty, noop } from 'lodash';
import Iconify from '@sentry/components/iconify/Iconify';
// ----------------------------------------------------------------------

type Props = {
  row: IEquipmentSchedule
  onViewRow: VoidFunction
  onRemove?: VoidFunction
}

export default function EquipmentScheduleRow({
  row,
  onViewRow,
  onRemove
}: Props) {
  const theme = useTheme();
  const { activeDate, time, createBy, createAt, status, id } = row;
  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="none"
        onClick={onViewRow}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell align="left"><Typography variant="body2" > {!isEmpty(activeDate) && format(new Date(activeDate), 'dd MMM yyyy')}</Typography> </TableCell>
        <TableCell align="left"> <Typography variant="body2" >{time}</Typography></TableCell>
        <TableCell align="left"> <Typography variant="body2" >{createBy}</Typography></TableCell>

        <TableCell align="left">
          {!isEmpty(createAt) && format(new Date(createAt), 'dd MMM yyyy  HH:mm:ss')}
        </TableCell>

        <TableCell align="left">
          <Label color={status === 'Pending' ? 'warning' : 'default'}>{status}</Label>
        </TableCell>
        <TableCell align="left">

          {status === 'Pending' && <Button
            color="error"
            sx={{ flexShrink: 0 }}
            onClick={(e) => {
              e.stopPropagation()
              onRemove ? onRemove() : noop
            }}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Cancel
          </Button>}

        </TableCell>
      </TableRow>
    </>
  );
}
