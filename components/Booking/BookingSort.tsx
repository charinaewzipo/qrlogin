import { useState } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@ku/redux';
import Iconify from '@sentry/components/iconify/Iconify';
import MenuPopover from '@sentry/components/menu-popover/MenuPopover';
// redux
type Props = {
  filterSort: string;
  onFilterSort: (event: string) => void;
}

const SORT_BY_OPTIONS = [
  { value: 'nothing', label: 'Nothing' },
  { value: 'name', label: 'Name' },
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Unavailable' },
];

export default function BookingSort({ filterSort, onFilterSort }: Props) {
  const dispatch = useDispatch();

  // const { sortBy } = useSelector((state) => state.product);

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (currentTarget: HTMLButtonElement) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value: string) => {
    handleClose();
    onFilterSort(value)
    // dispatch(sortByProducts(value));
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(event) => handleOpen(event.currentTarget)}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {filterSort === 'nothing' ? '' : filterSort}
        </Typography>
      </Button>

      <MenuPopover
        anchorEl={open}
        open={(open)}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === filterSort}
            onClick={() => handleSortBy(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
