import { LoadingButton } from '@mui/lab'
import { Stack, Paper, Typography, Divider, Grid } from '@mui/material'
import Label, { LabelColor } from '@sentry/components/label'
import { format } from 'date-fns'
import { lowerCase } from 'lodash'

const constant = {
    bookSummary: 'Book summary',
    status: 'Status',
    bookingDate: 'Booking date',
    bookingTime: 'Booking time',
    duration: 'Duration',
    credit: 'Credit',
    bookName: 'Book name',
    bookNow: 'Book now',
    confirm: 'Confirm',
    cancel: 'Cancel',
}
interface IBookSummaryProps {
    bookingData: IV1RespGetBookingMeRead
    onBook: () => void
    onCancelBooking: () => void
    selectedDate: Date
    selectedTime: number[]
}
function BookSummary({
    bookingData,
    onBook,
    onCancelBooking,
    selectedDate,
    selectedTime,
}: IBookSummaryProps) {
    const getBookingStatusLabelColor = (): LabelColor => {
        switch (bookingData.bookStatus) {
            case 'PENDING':
                return 'warning'
            case 'CONFIRM':
                return 'success'
            case 'WAITING_FOR_PAYMENT':
                return 'info'
            case 'WAITING_FOR_PAYMENT_CONFIRM':
                return 'info'
            case 'FINISH':
                return 'default'

            default:
                return 'default'
        }
    }
    return (
        <Stack spacing={5}>
            <Paper elevation={9} sx={{ borderRadius: 2, p: 3 }}>
                <Typography gutterBottom variant="h6">
                    {constant.bookSummary}
                </Typography>
                <Grid container spacing={2} mt={6}>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingDate}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {format(new Date(selectedDate), 'dd/MM/yyyy')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingTime}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {selectedTime.sort((a, b) => a - b).map((time) => (
                                <Label key={`${time}-booking-time`} color="info" sx={{ mr: 1, mb: 1 }}>
                                    {`${time}:00 - ${time}:59`}
                                </Label>
                            ))}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.duration}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {selectedTime.length} Hrs.
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookName}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {/* {bookingData.bookName} */}
                            Jennarong Saenpaeng
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.status}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <Label color={getBookingStatusLabelColor()} sx={{ mr: 1 }}>
                                {lowerCase(bookingData.bookStatus)}
                            </Label>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.credit}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {`0 / 15,000 B`}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mx: -3, mt: 3 }} />
                <Stack flexDirection="row" justifyContent="right" gap={2} mt={3}>
                    <LoadingButton
                        type="button"
                        variant='contained'
                        size="large"
                        onClick={onBook}
                    >
                        {constant.bookNow}
                    </LoadingButton>
                    <LoadingButton
                        type="button"
                        variant="outlined"
                        size="large"
                        onClick={onCancelBooking}
                        color="inherit"
                    >
                        {constant.cancel}
                    </LoadingButton>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default BookSummary
