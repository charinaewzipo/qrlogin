import { LoadingButton } from '@mui/lab'
import { Stack, Paper, Typography, Grid, Divider } from '@mui/material'
import { format, parseISO } from 'date-fns'

const constant = {
    paymentSummary: 'Payment Summary',
    paymentDate: 'Payment date',
    paymentAmount: 'Payment amount',
    billingAddress: 'Billing address',
    paymentReceiptNumber: 'Payment receipt number',
    paymentConfirmationDate: 'Payment confirmation date',
    downloadPayslip: 'Download Payslip',
    downloadReceipt: 'Download Receipt',
}
interface IPaymentSummaryProps {
    payData: IV1TablePayments
    onDownloadPayslip: () => void
    onDownloadReceipt: () => void
}
function PaymentSummary({ payData, onDownloadPayslip, onDownloadReceipt }: IPaymentSummaryProps) {
    return (
        <Stack spacing={5}>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                <Typography gutterBottom variant="h6">
                    {constant.paymentSummary}
                </Typography>
                <Grid container rowGap={2} mt={6}>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.paymentDate}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {format(
                                parseISO(payData.payCreatedAt.replace('Z', '')),
                                'dd/MM/yyyy HH:mm:ss'
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.paymentAmount}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {payData.payAmount}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.billingAddress}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {payData.payBillingAddress}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.paymentReceiptNumber}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {payData.payReceiptNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.paymentConfirmationDate}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {format(
                                parseISO(payData.payDateTime.replace('Z', '')),
                                'dd/MM/yyyy HH:mm:ss'
                            )}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mx: -3, mt: 3 }} />
                <Stack flexDirection="row" justifyContent="right" gap={2} mt={3}>
                    <LoadingButton
                        type="button"
                        variant="text"
                        size="large"
                        onClick={onDownloadPayslip}
                        color="error"
                    >
                        {constant.downloadPayslip}
                    </LoadingButton>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={onDownloadReceipt}
                    >
                        {constant.downloadReceipt}
                    </LoadingButton>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default PaymentSummary
