// @mui

import { Box, Card, Grid, Typography } from "@mui/material";
import { get } from "lodash";
import Label from "@sentry/components/label/Label";
import { format } from "date-fns";

type Props = {
  book: IV1RespGetBookingMeRead & IV1TablePayments;
  // loading: boolean;
  // showLoadMore: boolean;
  // onLoadmore: () => void;
};

export default function BookingSummary({ book }: Props) {
  return (
    <>
      <Card sx={{ pt: 5, px: 5 }}>
        <Typography variant="h6" sx={{ color: 'text.primary', pb: 5 }}>
          Book summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} >
            <Typography paragraph variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Booking no
            </Typography>

            <Typography variant="subtitle1">{get(book, 'eqCode', '')}</Typography>
          </Grid>

          <Grid item xs={12} sm={4} >
            <Typography paragraph variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Equipment name
            </Typography>

            <Typography variant="subtitle1">{`${get(book, 'eqName', '')} (${get(book, 'eqModel', '')})`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} ></Grid>
          <Grid item xs={12} sm={4} >
            <Typography paragraph variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Booking date
            </Typography>

            <Typography variant="subtitle1">{format(new Date(get(book, 'eqCreatedAt', new Date())), 'dd/MM/yyyy')}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} >
            <Typography paragraph variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Booking time
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} sx={{ gap: 1 }}>
              <Label color={'info'} >18:00 - 18:59</Label>
              <Label color={'info'} >18:00 - 18:59</Label>
            </Box>

            {/* <Label color={'info'}>{get(book, 'authAccountStatus', '')}</Label> */}
          </Grid>
          <Grid item xs={12} sm={4} >
            <Typography paragraph variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Duration
            </Typography>
            {/* <Typography variant="subtitle1">{book.eqCreatedAt}</Typography> */}
            <Typography variant="subtitle1">2 Hrs.</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
            <Typography paragraph variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Book name
            </Typography>

            <Typography variant="subtitle1">{get(book, 'eqName', '')}</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
