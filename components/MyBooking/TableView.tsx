import { LoadingButton } from '@mui/lab'
import {
    Stack,
    Paper,
    Divider,
    Typography,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Grid,
} from '@mui/material'
import Logo from '../Logo'
import Iconify from '@sentry/components/iconify'
import Label from '@sentry/components/label'

const constant = {
    description: 'Description',
    quotation: 'QUOTATION',
    invoice: 'INVOICE',
    Qty: 'Qty',
    unitPrice: 'Unit price',
    total: 'Total',
    downloadAsPDF: 'Download as PDF',
    remark: 'Remark\nThis is a user remark. If not have an remark hide this section',
    notes: 'NOTES\nThis price is estimated price not actual price.',
    paymentMethod: 'Payment method\nCash / Bank transfer / QR code',
    cost: 'Cost',
    date: 'Date',
    subTotal: 'Sub Total',
    oTCharge: 'OT Charge',
    discount: 'Discount',
    fees: 'Fees',
    cancel: 'Cancel',
}
interface ITableViewProps {
    onDownloadAsPdf: () => void
}

function TableView(props: ITableViewProps) {
    return (
        <Stack spacing={5}>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 5 }}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Logo logoType="full" />
                    <Stack alignItems="end" spacing={1}>
                        <LoadingButton
                            type="button"
                            variant="text"
                            onClick={props.onDownloadAsPdf}
                            color="info"
                        >
                            <Iconify icon="ant-design:file-pdf-filled" mr={1} width={18} />
                            {constant.downloadAsPDF}
                        </LoadingButton>
                        <Label color="info">INVOICE</Label>
                    </Stack>
                </Stack>
                <Stack mt={5}>
                    <TableContainer>
                        <Table
                            sx={{
                                minWidth: 650,
                                tr: {
                                    boxShadow: (theme) =>
                                        `0px 1px 0px 0px ${theme.palette.divider}`,
                                },
                                th: {
                                    backgroundColor: 'transparent',
                                },
                                'th, td': {
                                    padding: 3,
                                },
                            }}
                            aria-label="PaymentTableView"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>{constant.description}</TableCell>
                                    <TableCell align="right">{constant.Qty}</TableCell>
                                    <TableCell align="right">{constant.unitPrice}</TableCell>
                                    <TableCell align="right">{constant.total}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            color="text.secondary"
                                        >
                                            Coating Material
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" mb={0}>
                                            Starndard options
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">2</TableCell>
                                    <TableCell align="right">2,500 B/hr.</TableCell>
                                    <TableCell align="right">5,000 B</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            color="text.secondary"
                                        >
                                            Coating Material
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" mb={0}>
                                            Starndard options
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">2</TableCell>
                                    <TableCell align="right">2,500 B/hr.</TableCell>
                                    <TableCell align="right">5,000 B</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Grid container rowGap={2} justifyContent="flex-end" textAlign="right">
                    <Grid item xs={2}>
                        <Typography gutterBottom variant="body1" color="text.secondary">
                            {constant.subTotal}
                        </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Typography gutterBottom variant="body1">
                            9,000 B
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowGap={2} justifyContent="flex-end" textAlign="right">
                    <Grid item xs={2}>
                        <Typography gutterBottom variant="body1" color="text.secondary">
                            {constant.oTCharge}
                        </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Typography gutterBottom variant="body1">
                            9,000 B
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowGap={2} justifyContent="flex-end" textAlign="right">
                    <Grid item xs={2}>
                        <Typography gutterBottom variant="body1" color="text.secondary">
                            {constant.discount}
                        </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Typography gutterBottom variant="body1">
                            9,000 B
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowGap={2} justifyContent="flex-end" textAlign="right">
                    <Grid item xs={2}>
                        <Typography gutterBottom variant="body1" color="text.secondary">
                            {constant.fees}
                        </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Typography gutterBottom variant="body1">
                            9,000 B
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowGap={2} justifyContent="flex-end" textAlign="right">
                    <Grid item xs={2}>
                        <Typography gutterBottom variant="h6" color="text.secondary">
                            {constant.total}
                        </Typography>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Typography gutterBottom variant="h6">
                            9,000 B
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 3 }} />
                <Stack flexDirection="row" justifyContent="right" gap={2} mt={3}></Stack>
            </Paper>
        </Stack>
    )
}

export default TableView
