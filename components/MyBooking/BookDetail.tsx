import { LoadingButton } from '@mui/lab'
import { Stack, Paper, Typography, Divider, Grid } from '@mui/material'
import Label, { LabelColor } from '@sentry/components/label'

const constant = {
    bookSummary: 'Book summary',
    bookingNo: 'Booking no',
    equipmentName: 'Equipment name',
    status: 'Status',
    bookingDate: 'Booking date',
    bookingTime: 'Booking time',
    duration: 'Duration',
    bookName: 'Book name',
    downloadQuotation: 'Download Quotation',
    downloadInvoice: 'Download Invoice',
    paymentQRCode: 'Payment QR Code',
    cancelBooking: 'Cancel Booking',
    waitingForPaymentConfirm: 'Waiting for payment confirm',
    finish: 'Finish',
    pending: 'Pending',
    confirm: 'Confirm',
    cancel: 'Cancel',
}
interface IBookDetailProps {
    bookingData: IV1RespGetBookingMeRead
    onDownloadQuotation: () => void
    onDownloadInvoice: () => void
    onPaymentQRCode: () => void
    onCancelBooking: () => void
}
function BookDetail(props: IBookDetailProps) {

    const getBookingStatusLabelColor = (): LabelColor => {
        switch (props.bookingData.bookStatus) {
            case 'PENDING':
                return 'warning'
            case 'CONFIRM':
                return 'success'
            case 'WATTING_FOR_PAYMENT':
                return 'info'
            case 'WATTING_FOR_PAYMENT_CONFIRM':
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
                <Grid container rowGap={2} mt={6}>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingNo}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {props.bookingData.bookId}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.equipmentName}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {props.bookingData.eqName}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.status}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <Label color={getBookingStatusLabelColor()} sx={{ mr: 1 }}>
                                {props.bookingData.bookStatus}
                            </Label>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingDate}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            19/08/2022
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingTime}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <Label color="info" sx={{ mr: 1 }}>
                                18:00 - 18:59
                            </Label>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.duration}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {/* {props.bookingData.duration} */}
                            2 Hrs.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookName}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {/* {props.bookingData.bookName} */}
                            Jennarong Saenpaeng
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mx: -3, mt: 3 }} />
                <Stack flexDirection="row" justifyContent="right" gap={2} mt={3}>
                    <LoadingButton
                        type="button"
                        variant="text"
                        size="large"
                        onClick={props.onCancelBooking}
                        color="error"
                    >
                        {constant.cancelBooking}
                    </LoadingButton>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={props.onDownloadQuotation}
                    >
                        {constant.downloadQuotation}
                    </LoadingButton>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={props.onDownloadInvoice}
                        color="info"
                    >
                        {constant.downloadInvoice}
                    </LoadingButton>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={props.onPaymentQRCode}
                        color="inherit"
                    >
                        {constant.paymentQRCode}
                    </LoadingButton>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default BookDetail
