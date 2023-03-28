// @mui
import { BOOKING_PATH, MERGE_PATH } from '@ku/constants/routes';
import { Box, Card, Typography, Stack } from '@mui/material';
import Image from '@sentry/components/image/Image';
import Label from '@sentry/components/label/Label';
import { useRouter } from 'next/router';

// routes


// ----------------------------------------------------------------------

type Props = {
  product: IBookingProduct;
};

export default function BookingCard({ product }: Props) {
  const { name, cover, status, category, id } = product;
  const { push } = useRouter()
  const handleClick = () => {
    push(MERGE_PATH(BOOKING_PATH, id))
  }
  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <Image
        disabledEffect
        alt={name}
        src={cover}
        ratio="1/1"
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box>
          <Label color={status === 'Available' ? 'success' : 'warning'}>{status}</Label>
        </Box>
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography variant="subtitle1">{(name)}</Typography>
          <Label variant='outlined'>{category}</Label>
        </Stack>
      </Stack>
    </Card>

  );
}
