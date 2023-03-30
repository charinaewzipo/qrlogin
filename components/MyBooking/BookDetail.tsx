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
function BookDetail({
    bookingData,
    onDownloadQuotation,
    onDownloadInvoice,
    onPaymentQRCode,
    onCancelBooking,
}: IBookDetailProps) {
    const getBookingStatusLabelColor = (): LabelColor => {
        switch (bookingData.bookStatus) {
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
    const renderButtonCancelBooking = () => (
        <LoadingButton
            type="button"
            variant="text"
            size="large"
            onClick={onCancelBooking}
            color="error"
        >
            {constant.cancelBooking}
        </LoadingButton>
    )
    const renderButtonDownloadQuotation = () => (
        <LoadingButton type="button" variant="contained" size="large" onClick={onDownloadQuotation}>
            {constant.downloadQuotation}
        </LoadingButton>
    )
    const renderButtonDownloadInvoice = () => (
        <LoadingButton
            type="button"
            variant="contained"
            size="large"
            onClick={onDownloadInvoice}
            color="info"
        >
            {constant.downloadInvoice}
        </LoadingButton>
    )
    const renderButtonPaymentQRCode = () => (
        <LoadingButton
            type="button"
            variant="contained"
            size="large"
            onClick={onPaymentQRCode}
            color="inherit"
        >
            {constant.paymentQRCode}
        </LoadingButton>
    )
    
    return (
        <Stack spacing={5}>
            <Paper elevation={9} sx={{ borderRadius: 2, p: 3 }}>
                <Typography gutterBottom variant="h6">
                    {constant.bookSummary}
                </Typography>
                <Grid container rowGap={2} mt={6}>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingNo}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {bookingData.bookId}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.equipmentName}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {bookingData.eqName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.status}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <Label color={getBookingStatusLabelColor()} sx={{ mr: 1 }}>
                                {bookingData.bookStatus}
                            </Label>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingDate}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            19/08/2022
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.bookingTime}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <Label color="info" sx={{ mr: 1 }}>
                                18:00 - 18:59
                            </Label>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.duration}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {/* {bookingData.duration} */}2 Hrs.
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
                </Grid>
                <Divider sx={{ mx: -3, mt: 3 }} />
                <Stack flexDirection="row" justifyContent="right" gap={2} mt={3}>
                    {{
                        PENDING: <>{renderButtonDownloadQuotation()}</>,
                        CONFIRM: (
                            <>
                                {renderButtonCancelBooking()}
                                {renderButtonDownloadQuotation()}
                            </>
                        ),
                        WATTING_FOR_PAYMENT: (
                            <>
                                {renderButtonDownloadQuotation()}
                                {renderButtonDownloadInvoice()}
                                {renderButtonPaymentQRCode()}
                            </>
                        ),
                        WATTING_FOR_PAYMENT_CONFIRM: (
                            <>
                                {renderButtonDownloadQuotation()}
                                {renderButtonDownloadInvoice()}
                            </>
                        ),
                        FINISH: (
                            <>
                                {renderButtonDownloadQuotation()}
                                {renderButtonDownloadInvoice()}
                            </>
                        ),
                    }[bookingData.bookStatus] || <></>}
                </Stack>
            </Paper>
        </Stack>
    )
}

export default BookDetail
