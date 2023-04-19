import { Stack, Paper, Typography, Grid, Button } from '@mui/material'
import Iconify from '@sentry/components/iconify'
import { fNumber } from '@sentry/utils/formatNumber'
import QRCode from 'react-qr-code'

const constant = {
    totalPayment: 'Total payment',
    ref1: 'Ref1',
    ref2: 'Ref2',
    download: 'Download',
}
interface IQrCodeDetailProps {
    billerId: string
    totalPayment: string
    ref1: string
    ref2: string
    onDownload: () => void
}
function QrCodeDetail({ billerId, totalPayment, ref1, ref2, onDownload }: IQrCodeDetailProps) {
    const qrValue = `${billerId}\n${ref1}\n${ref2}\n${totalPayment}`
    return (
        <Stack width="34%" minWidth="300px" alignSelf="center">
            <Paper elevation={9} sx={{ borderRadius: 2, p: 3 }}>
                <Grid container rowGap={2}>
                    <Grid item xs={12}>
                        <Paper elevation={9} sx={{ borderRadius: 0, p: 1, mb: 1 }}>
                            <QRCode
                                size={256}
                                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                value={qrValue}
                                viewBox={`0 0 256 256`}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.totalPayment}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {fNumber(totalPayment)} Baht
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.ref1}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {ref1}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {constant.ref2}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {ref2}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth color="primary" variant="contained" onClick={onDownload}>
                            <Iconify icon="material-symbols:download-sharp" sx={{ mr: 1 }} />
                            {constant.download}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Stack>
    )
}

export default QrCodeDetail
        