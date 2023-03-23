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

export default function EquipmentScheduleCreateRow({
  row,
  selected,
  onSelectRow,
  onViewRow,

}: Props) {
  const theme = useTheme();

  const { name, cover, id } = row;

  // const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  // const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setOpenMenuActions(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpenMenuActions(null);
  // };

  return (
    <TableRow hover selected={selected} key={id} >
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center' }}
          onClick={onViewRow}
        >
          <Image
            disabledEffect
            alt={name}
            src={cover}
            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }} >
            <Typography variant="subtitle2" noWrap >
              {name}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
              {name}
            </Typography>
          </Box>
        </Box>

      </TableCell>


    </TableRow>
  );
}
