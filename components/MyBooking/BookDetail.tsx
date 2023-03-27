import { LoadingButton } from '@mui/lab'
import { Stack, Paper, Typography, Divider, Grid } from '@mui/material'
import Label from '@sentry/components/label'

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
    bookNo: number
    eqName: string
    bookstatus: TBookStatus
    bookDate: string
    bookTime: Date[]
    duration: string
    bookName: string
    onDownloadQuotation: () => void
    onDownloadInvoice: () => void
    onPaymentQRCode: () => void
    onCancelBooking: () => void
}
function BookDetail(props: IBookDetailProps) {
    return (
        <Stack spacing={5}>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                <Typography gutterBottom variant="h6">
                    {constant.bookSummary}
                </Typography>
                <Grid container rowGap={2} mt={6}>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingNo}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {props.bookNo}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.equipmentName}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {props.eqName}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.status}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <Label color="info" sx={{ mr: 1 }}>
                                {props.bookstatus}
                            </Label>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingDate}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {props.bookDate}
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
                            {props.duration}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookName}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {props.bookName}
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
