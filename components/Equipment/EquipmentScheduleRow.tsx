// @mui
import { TableRow, TableCell, Typography, Button } from '@mui/material';
import Label from '@sentry/components/label/Label';
// utils
import { get, noop } from 'lodash';
import Iconify from '@sentry/components/iconify/Iconify';
import { getTimeOfDay } from '@ku/utils/formatDate';
import { fDateTimeFormat } from '@sentry/utils/formatDateTime';
// ----------------------------------------------------------------------
type Props = {
  row: IV1RespGetEquipmentUnavailableSchedule
  onViewRow: VoidFunction
  onRemove?: VoidFunction
}
export default function EquipmentScheduleRow({
  row,
  onViewRow,
  onRemove
}: Props) {
  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="none"
        onClick={onViewRow}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell align="left"><Typography variant="body2" >
          {fDateTimeFormat(get(row, 'equnavascheDays', ''), 'DD MMM YYYY')}
        </Typography> </TableCell>
        <TableCell align="left"> <Typography variant="body2" >{getTimeOfDay(get(row, 'equnavascheTimes', []))}</Typography></TableCell>
        <TableCell align="left"> <Typography variant="body2" >{get(row, 'equnavascheCreatedByName', '')}</Typography></TableCell>
        <TableCell align="left">
          {fDateTimeFormat(get(row, 'equnavascheCreatedAt', ''), 'DD MMM YYYY hh:mm:ss')}

        </TableCell>
        <TableCell align="left">
          <Label color={get(row, 'equnavascheStatus', '') === 'PENDING' ? 'warning' : 'default'}>{get(row, 'equnavascheStatus', '').toLocaleLowerCase()}</Label>
        </TableCell>
        <TableCell align="left">
          {get(row, 'equnavascheStatus', '') === 'PENDING'
            ? <Button
              color="error"
              sx={{ flexShrink: 0 }}
              onClick={(e) => {
                e.stopPropagation()
                onRemove ? onRemove() : noop
              }}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Cancel
            </Button> :
            <Button
              sx={{ color: 'transparent' }}
            >
              hide
            </Button>}
        </TableCell>
      </TableRow>
    </>
  );
}
