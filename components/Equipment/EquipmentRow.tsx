// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, Box } from '@mui/material';
import Label from '@sentry/components/label/Label';
// utils
import { format } from 'date-fns'
import { get } from 'lodash';
import { ImageComponent } from '../Image';

// ----------------------------------------------------------------------

type Props = {
  row: IV1PostEquipmentRead;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
};
const styledTextOverFlow = {
  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
}
export default function EquipmentRow({
  row,
  selected,
  onSelectRow,
  onViewRow,

}: Props) {
  const theme = useTheme();
  const getUTCDate = (dateString = Date.now()) => {
    const date = new Date(dateString);
  
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  };
  
  return (
    <TableRow hover selected={selected} key={get(row, 'eqId', '')} onClick={onViewRow} sx={{ cursor: 'pointer' }} >
      <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center' }}

        >
          {/* <Image
            disabledEffect
            alt={get(row, 'eqName', '')}
            src={get(row,'eqPicture[0].eqpicLink','')}
            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
          /> */}
          <ImageComponent
            src={get(row,'eqPicture[0].eqpicLink','')}
            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
            <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, width: 350 }}>
              {`${get(row, 'eqName', '')} (${get(row, 'eqCode', '')})`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", ...styledTextOverFlow, width: 350 }}>
              {get(row, 'eqDescription', '')}
            </Typography>
          </Box>
        </Box>

      </TableCell>

      <TableCell> {format(getUTCDate(get(row, 'eqCreatedAt', '')), 'dd MMM yyyy HH:mm')}</TableCell>
      <TableCell> {format(getUTCDate(get(row, 'eqUpdatedAt', '')), 'dd MMM yyyy HH:mm')}</TableCell>

      <TableCell align="left">
        <Label
          color={
            (get(row, 'eqStatus', '') === 'UNAVAILABLE' && 'default') ||
            (get(row, 'eqStatus', '') === 'TEMPORARY_UNAVAILABLE' && 'warning') ||
            'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {get(row, 'eqStatus', '')}
        </Label>
      </TableCell>
    </TableRow>
  );
}
