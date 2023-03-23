import { Stack, InputAdornment, TextField, MenuItem, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from '@sentry/components/iconify/Iconify';
// components


// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

type Props = {
  filterDate: Date | null;
  onFilterDate: (value: Date | null) => void;
  optionsRole: string[];
  filterTime: string
  onFilterTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearchEquipment: string;
  onFilterSearchEquipment: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EquipmentScheduleCreateToolsbar({
  filterDate,
  onFilterDate,
  optionsRole,
  filterTime,
  onFilterTime,
  filterSearchEquipment,
  onFilterSearchEquipment,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'column' }} sx={{ py: 2.5, px: 3 }}>
      <DatePicker
        label="Date *"
        value={filterDate}
        onChange={onFilterDate}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ width: "50%" }}
          />
        )}
      />
      <TextField
        fullWidth
        select
        label="Time *"
        value={filterTime}
        onChange={onFilterTime}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ px: 2 }}>
        <TextField
          fullWidth
          name='Search equipement'
          value={filterSearchEquipment}
          onChange={onFilterSearchEquipment}
          placeholder="Search equipement"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={20} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

    </Stack>
  );
}
