import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Box } from '@mui/material';
import Image from '@sentry/components/image/Image';
import Label from '@sentry/components/label/Label';
// utils
import { format } from 'date-fns'
import { isEmpty } from 'lodash';

// ----------------------------------------------------------------------

type Props = {
  row: IEquipmentUser;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function EquipmentRow({
  row,
  selected,
  onSelectRow,
  onViewRow,

}: Props) {
  const theme = useTheme();

  const { name, cover, createdAt, lastestUpdate, status, id } = row;

  // const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  // const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setOpenMenuActions(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpenMenuActions(null);
  // };

  return (
    <TableRow hover selected={selected} key={id} onClick={onViewRow} sx={{ cursor: 'pointer' }} >
      <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center' }}

        >
          <Image
            disabledEffect
            alt={name}
            src={cover}
            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
            <Typography variant="subtitle2" noWrap >
              {name}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
              {name}
            </Typography>
          </Box>
        </Box>

      </TableCell>

      <TableCell> {!isEmpty(createdAt) && format(new Date(createdAt), 'dd MMM yyyy HH:mm')}</TableCell>
      <TableCell> {!isEmpty(lastestUpdate) && format(new Date(lastestUpdate), 'dd MMM yyyy HH:mm')}</TableCell>

      <TableCell align="left">
        <Label
          color={
            (status === 'Unavailable' && 'default') ||
            (status === 'Temporary Unavailable' && 'warning') ||
            'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
