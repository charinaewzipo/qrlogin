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
	Box,
	styled,
} from '@mui/material'
import Logo from '../Logo'
import Iconify from '@sentry/components/iconify'
import Label from '@sentry/components/label'
import { fCurrency, fCurrencyBaht, fNumber } from '@ku/utils/formatNumber'

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
    paymentMethod: 'Payment method',
	paymentList: 'Cash / Bank transfer / QR code',
    cost: 'Cost',
    date: 'Date',
    subTotal: 'Sub Total',
    oTCharge: 'OT Charge',
    discount: 'Discount',
    fees: 'Fees',
    cancel: 'Cancel',
}

const RowDetailStyle = styled(TableRow)(({ theme }) => ({
	boxShadow: `0px 1px 0px 0px ${theme.palette.divider}`
}));
const RowResultStyle = styled(TableRow)(({ theme }) => ({
	boxShadow: '0px 0px transparent',
	'& td': {
	  	paddingTop: theme.spacing(1),
	  	paddingBottom: theme.spacing(1),
		'&:last-child': {
			paddingRight: 0
		}
	},
}));
interface ITableViewProps {
	bookingData: IV1RespGetBookingMeRead
    onDownloadAsPdf: () => void
}

function TableView({ bookingData, onDownloadAsPdf}: ITableViewProps) {
    return (
        <Stack>
            <Paper elevation={3} sx={{ borderRadius: 2, p: 5, pb: 0 }}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Logo logoType="full" />
                    <Stack alignItems="end" spacing={1}>
                        <LoadingButton
                            type="button"
                            variant="text"
                            onClick={onDownloadAsPdf}
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
                                th: {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            aria-label="PaymentTableView"
                        >
                            <TableHead>
                                <RowDetailStyle>
                                    <TableCell>{constant.description}</TableCell>
                                    <TableCell align="right">{constant.Qty}</TableCell>
                                    <TableCell align="right">{constant.unitPrice}</TableCell>
                                    <TableCell align="right">{constant.total}</TableCell>
                                </RowDetailStyle>
                            </TableHead>
                            <TableBody>
                                {bookingData.eqPrices.map((price) => (
                                    <>
                                        <RowDetailStyle
                                            key={`booking-price-eqpEqId-${price.eqpEqId}`}
                                        >
                                            <TableCell>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                >
                                                    {price.eqpName}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle1" mb={0}>
                                                    {price.eqpDescription}
                                                </Typography>
                                            </TableCell>
                                            {price.eqSubPrice.length === 0 ? (
                                                <>
                                                    <TableCell align="right">
                                                        {fNumber(price.eqpQuantity)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {`${fCurrencyBaht(price.eqpUnitPrice)}/${
                                                            price.eqpUnitPer
                                                        }`}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {fCurrencyBaht(price.eqpTotal)}
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </RowDetailStyle>
                                        {price.eqSubPrice.map((subPrice) => (
                                            <RowDetailStyle
                                                key={`booking-sub-price-eqpEqId-${subPrice.eqsubpId}`}
                                            >
                                                <TableCell>
                                                    <Typography
                                                        gutterBottom
                                                        variant="subtitle2"
                                                        color="text.secondary"
                                                        ml={6}
                                                    >
                                                        {subPrice.eqsubpName}
                                                    </Typography>
                                                    <Typography
                                                        gutterBottom
                                                        variant="subtitle1"
                                                        mb={0}
                                                        ml={6}
                                                    >
                                                        {subPrice.eqsubpDescription}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {fNumber(subPrice.eqsubpQuantity)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {`${fCurrencyBaht(price.eqpUnitPrice)}/${
                                                        price.eqpUnitPer
                                                    }`}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {fCurrencyBaht(price.eqpTotal)}
                                                </TableCell>
                                            </RowDetailStyle>
                                        ))}
                                    </>
                                ))}

                                <RowResultStyle>
                                    <TableCell colSpan={2} />
                                    <TableCell align="right">
                                        <Box sx={{ mt: 2 }} />
                                        <Typography>{constant.subTotal}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ mt: 2 }} />
                                        <Typography>
                                            {fCurrencyBaht(bookingData.eqPriceSubTotal)}
                                        </Typography>
                                    </TableCell>
                                </RowResultStyle>
                                <RowResultStyle>
                                    <TableCell colSpan={2} />
                                    <TableCell align="right">
                                        <Typography>{constant.oTCharge}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ color: 'error.main' }}>
                                            {fCurrencyBaht(bookingData.payOt)}
                                        </Typography>
                                    </TableCell>
                                </RowResultStyle>
                                <RowResultStyle>
                                    <TableCell colSpan={2} />
                                    <TableCell align="right">
                                        <Typography>{constant.discount}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            {fCurrencyBaht(bookingData.payDiscount)}
                                        </Typography>
                                    </TableCell>
                                </RowResultStyle>
                                <RowResultStyle>
                                    <TableCell colSpan={2} />
                                    <TableCell align="right">
                                        <Typography>{constant.fees}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            {fCurrencyBaht(bookingData.payFees)}
                                        </Typography>
                                    </TableCell>
                                </RowResultStyle>
                                <RowResultStyle>
                                    <TableCell colSpan={2} />
                                    <TableCell align="right">
                                        <Typography variant="h6">{constant.total}</Typography>
                                    </TableCell>
                                    <TableCell align="right" width={140}>
                                        <Typography variant="h6">
                                            {fCurrencyBaht(bookingData.payTotal)}
                                        </Typography>
                                    </TableCell>
                                </RowResultStyle>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Divider sx={{ mt: 3 }} />
                <Grid container>
                    <Grid item xs={12} md={9} sx={{ py: 3 }}>
                        <Typography variant="body2" whiteSpace='pre'>{constant.remark}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
                        <Typography variant="subtitle2">{constant.paymentMethod}</Typography>
                        <Typography variant="body2">{constant.paymentList}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Stack>
    )
}

export default TableView
