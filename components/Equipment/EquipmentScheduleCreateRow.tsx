import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Box } from '@mui/material';
import Image from '@sentry/components/image/Image';
import Label from '@sentry/components/label/Label';
// utils
import { format } from 'date-fns'
import { get, isEmpty } from 'lodash';

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
export default function EquipmentScheduleCreateRow({
  row,
  selected,
  onSelectRow,
  onViewRow,

}: Props) {

  return (
    <TableRow hover selected={selected} key={get(row, 'eqId', '-1')} onClick={onViewRow} sx={{ cursor: 'pointer' }}>
      <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Image
            disabledEffect
            alt={get(row, 'eqName', '')}
            src={get(row, 'eqPicture[0].eqpicLink', '')}
            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }} >
            <Typography variant="subtitle2" noWrap sx={{ ...styledTextOverFlow, width: 800 }} >
              {`${get(row, 'eqName', '')} (${get(row, 'eqCode', '')})`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", ...styledTextOverFlow, width: 800 }}>
              {get(row, 'eqDescription', '')}
            </Typography>
          </Box>
        </Box>

      </TableCell>


    </TableRow>
  );
}
