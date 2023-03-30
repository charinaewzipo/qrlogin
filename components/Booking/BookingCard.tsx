// @mui
import { BOOKING_PATH, MERGE_PATH } from '@ku/constants/routes';
import { Box, Card, Typography, Stack } from '@mui/material';
import Image from '@sentry/components/image/Image';
import Label from '@sentry/components/label/Label';
import { get } from 'lodash';
import { useRouter } from 'next/router';

// routes


// ----------------------------------------------------------------------

type Props = {
  product: IV1RespGetBookingMeRead & IV1TablePayments;
};

export default function BookingCard({ product }: Props) {

  const { push } = useRouter()
  const handleClick = () => {
    push(MERGE_PATH(BOOKING_PATH, get(product, 'eqId', '').toString()))
  }
  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <Image
        disabledEffect
        alt={get(product, 'eqName', '')}
        src={get(product, 'eqPictures[0].eqpicLink', '')}
        ratio="1/1"
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box>
          <Label color={get(product, 'eqStatus', '') === 'Available' ? 'success' : 'warning'}>{get(product, 'eqStatus', '')}</Label>
        </Box>
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography variant="subtitle1">{(get(product, 'eqName', ''))}</Typography>
          <Label variant='outlined'>{get(product, 'eqBrand', '')}</Label>
        </Stack>
      </Stack>
    </Card>

  );
}
