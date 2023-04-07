// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Button } from '@mui/material';
import Label from '@sentry/components/label/Label';
// utils
import { format } from 'date-fns'
import { get, isEmpty, noop } from 'lodash';
import Iconify from '@sentry/components/iconify/Iconify';
import { getTimeOfDay } from '@ku/utils/formatDate';
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
  const theme = useTheme();



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

          {format(new Date(get(row, 'equnavascheDays', new Date())), 'dd MMM yyyy')}

        </Typography> </TableCell>
        <TableCell align="left"> <Typography variant="body2" >{getTimeOfDay(get(row, 'equnavascheTimes', []))}</Typography></TableCell>
        <TableCell align="left"> <Typography variant="body2" >{get(row, 'equnavascheCreatedByName', '')}</Typography></TableCell>

        <TableCell align="left">
          {format(new Date(get(row, 'equnavascheCreatedAt', new Date())), 'dd MMM yyyy  HH:mm:ss')}
        </TableCell>

        <TableCell align="left">
          <Label color={get(row, 'equnavascheStatus', '') === 'PENDING' ? 'warning' : 'default'}>{get(row, 'equnavascheStatus', '').toLocaleLowerCase()}</Label>
        </TableCell>
        <TableCell align="left">

          {get(row, 'equnavascheStatus', '') === 'PENDING' && <Button
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
