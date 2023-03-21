import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from '@sentry/components/iconify/Iconify';
// components


// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

type Props = {
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

export default function EquipmentScheduleToolsbar({
  filterStartDate,
  filterEndDate,
  onFilterStartDate,
  onFilterEndDate,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <DatePicker
        label="Start date"
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth

          />
        )}
      />
      <DatePicker
        label="End date"
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth

          />
        )}
      />

    </Stack>
  );
}
