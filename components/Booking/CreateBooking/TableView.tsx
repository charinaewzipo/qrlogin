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
    Checkbox,
    TextField,
    Radio,
} from '@mui/material'
import { fCurrencyBaht, fNumber } from '@ku/utils/formatNumber'
import React, { useEffect, useState } from 'react'
import { cloneDeep, findIndex, get, isNumber, isUndefined, sum } from 'lodash'
import numeral from 'numeral'

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
    notIncluding: 'Not including',
    cancel: 'Cancel',
    totalEstimated: 'Total Estimated',
}

const RowDetailStyle = styled(TableRow)(({ theme }) => ({
	boxShadow: `0px 1px 0px 0px ${theme.palette.divider}`
}))

const RowResultStyle = styled(TableRow)(({ theme }) => ({
	boxShadow: '0px 0px transparent',
	'& td': {
	  	paddingTop: theme.spacing(1),
	  	paddingBottom: theme.spacing(1),
		'&:last-child': {
			paddingRight: 0
		}
	},
}))

interface ITableViewProps {
	bookingData: IV1RespGetBookingMeRead
    selectedHours: number
    onChangeData: (data: IV1BookingEquipmentPrice[]) => void
}

function TableView({ bookingData, selectedHours, onChangeData }: ITableViewProps) {
    const [bookingPriceRow, setBookingPriceRow] = useState<IV1BookingEquipmentPrice[]>()

    useEffect(() => {
        setBookingPriceRow(formatPriceObject())
    }, [])

    useEffect(() => {
        onChangeData(bookingPriceRow)
    }, [bookingPriceRow])

    useEffect(() => {
        refreshAllRowWithHrUnit()
    }, [selectedHours])

    const refreshAllRowWithHrUnit = () => {
        const allRowWithHrUnit: { index: number; subIndex: number }[] = []
        for (const [index, price] of bookingData.eqPrices.entries()) {
            if (price.eqpUnitPer.toLowerCase() === 'hr') {
                allRowWithHrUnit.push({ index: index, subIndex: null })
            }
            for (const [subIndex, subPrice] of price.eqsubPrice.entries()) {
                if (subPrice.eqsubpUnitPer.toLowerCase() === 'hr') {
                    allRowWithHrUnit.push({ index: index, subIndex: subIndex })
                }
            }
        }

        for (const { index, subIndex } of allRowWithHrUnit) {
            if (getIsChecked(index, subIndex)) {
                handleQuantity(`${selectedHours}`, index, subIndex)
            }
        }
    }

    const getSubTotal = () => {
        const allRowPrice: { index: number; subIndex: number; unitprice: number }[] = []
        for (const [index, price] of bookingData.eqPrices.entries()) {
            allRowPrice.push({ index: index, subIndex: null, unitprice: price.eqpUnitPrice })
            for (const [subIndex, subPrice] of price.eqsubPrice.entries()) {
                allRowPrice.push({
                    index: index,
                    subIndex: subIndex,
                    unitprice: subPrice.eqsubpUnitPrice,
                })
            }
        }
        console.log(allRowPrice);
        
        for (const { index, subIndex, unitprice } of allRowPrice) {
            const qty = getQuantity(index, subIndex)
            if (qty > 0) {
                qty * unitprice
            }
        }
        const total = allRowPrice.map(({ index, subIndex, unitprice }) => {
            const qty = getQuantity(index, subIndex)
            if (qty > 0) {
                return qty * unitprice
            }
        })
        console.log(total);
        return sum(total)
    }

    const getIsChecked = (index: number, subIndex?: number) => {
        const subIndexPath = `${index}.eqsubPrice.${subIndex}.eqsubpIsChecked`
        const getPath = isNumber(subIndex) ? subIndexPath : `${index}.eqpscheIsChecked`
        const isChecked = get(bookingPriceRow, getPath, false)
        return isChecked
    }

    const getQuantity = (index: number, subIndex?: number) => {
        const subIndexPath = `${index}.eqsubPrice.${subIndex}.eqsubpQuantity`
        const getPath = isNumber(subIndex) ? subIndexPath : `${index}.eqpQuantity`
        const qty = get(bookingPriceRow, getPath, 0)
        return qty
    }

    const getDefaultQty = (index: number, subIndex?: number) => {
        const subIndexPath = `eqPrices.${index}.eqsubPrice.${subIndex}.eqsubpUnitPer`
        const getPath = isNumber(subIndex) ? subIndexPath : `eqPrices.${index}.eqpUnitPer`
        const unit: string = get(bookingData, getPath, '')
        switch (unit.toLowerCase()) {
            case 'hr':
                return selectedHours
            case 'booking':
                return 1

            default:
                return 1
        }
    }

    const handleCheckbox = (index: number, subIndex?: number) => {
        const priceAll = cloneDeep(bookingPriceRow)
        if (isNumber(subIndex)) {
            priceAll[index].eqsubPrice[subIndex].eqsubpIsChecked = !getIsChecked(index, subIndex)
            if (!getIsChecked(index, subIndex)) {
                priceAll[index].eqsubPrice[subIndex].eqsubpQuantity = getDefaultQty(index, subIndex)
            } else {
                priceAll[index].eqsubPrice[subIndex].eqsubpQuantity = 0
            }
        } else {
            priceAll[index].eqpscheIsChecked = !getIsChecked(index)
            if (!getIsChecked(index)) {
                priceAll[index].eqpQuantity = getDefaultQty(index)
            } else {
                priceAll[index].eqpQuantity = 0
            }
        }

        setBookingPriceRow(priceAll)
    }

    const handleRadiobutton = (index: number, subIndex: number) => {
        if (getIsChecked(index, subIndex)) return
        const priceAll = cloneDeep(bookingPriceRow)
        priceAll[index].eqsubPrice.forEach((sub) => {
            sub.eqsubpIsChecked = false
            sub.eqsubpQuantity = 0
        })
        priceAll[index].eqsubPrice[subIndex].eqsubpIsChecked = true
        priceAll[index].eqsubPrice[subIndex].eqsubpQuantity = getDefaultQty(index, subIndex)

        setBookingPriceRow(priceAll)
    }

    const handleQuantity = (qty: string, index: number, subIndex?: number) => {
        const nQty = numeral(qty).value()
        const priceAll = cloneDeep(bookingPriceRow)
        if (isNumber(subIndex)) {
            priceAll[index].eqsubPrice[subIndex].eqsubpQuantity = nQty
        } else {
            priceAll[index].eqpQuantity = nQty
        }

        setBookingPriceRow(priceAll)
    }

    const formatPriceObject = (): IV1BookingEquipmentPrice[] => {
        const priceObject = bookingData.eqPrices.map((price, index) => {
            const subpriceObject: IV1BookingEquipmentSubPrice[] = price.eqsubPrice.map(
                (sub, subIndex) => {
                    const isSubDefaultCheck = ['DEFAULT', 'FIXED'].includes(sub.eqsubpChecked)
                    return {
                        eqsubpscheId: sub.eqsubpId,
                        eqsubpIsChecked: isSubDefaultCheck,
                        eqsubpQuantity: isSubDefaultCheck ? getDefaultQty(index, subIndex) : 0,
                    }
                }
            )
            const isDefaultCheck = ['DEFAULT', 'FIXED'].includes(price.eqpChecked)
            return {
                eqpscheId: price.eqpId,
                eqpscheIsChecked: isDefaultCheck,
                eqpQuantity:
                    price.eqsubPrice.length > 0 && isDefaultCheck ? 0 : getDefaultQty(index),
                eqsubPrice: subpriceObject || [],
            }
        })
        return priceObject
    }

    return (
        <Paper elevation={3} sx={{ borderRadius: 2, p: 5 }}>
            <Stack>
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
                                <TableCell width={20} />
                                <TableCell>{constant.description}</TableCell>
                                <TableCell width={'12%'} align="left">
                                    {constant.Qty}
                                </TableCell>
                                <TableCell align="right">{constant.unitPrice}</TableCell>
                                <TableCell align="right">{constant.total}</TableCell>
                            </RowDetailStyle>
                        </TableHead>
                        <TableBody>
                            {bookingData.eqPrices.map((price, index) => (
                                <React.Fragment key={`booking-price-eqpEqId-${price.eqpEqId}`}>
                                    <RowDetailStyle>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                disabled={price.eqpChecked === 'FIXED'}
                                                checked={getIsChecked(index)}
                                                onClick={() => handleCheckbox(index)}
                                            />
                                        </TableCell>
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
                                        {price.eqsubPrice.length === 0 ? (
                                            <>
                                                <TableCell align="right">
                                                    <TextField
                                                        size="small"
                                                        label={constant.Qty}
                                                        disabled={['hr', 'booking'].includes(
                                                            price.eqpUnitPer.toLowerCase()
                                                        )}
                                                        onChange={(e) =>
                                                            handleQuantity(e.target.value, index)
                                                        }
                                                        value={getQuantity(index)}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {`${fCurrencyBaht(price.eqpUnitPrice)}/${
                                                        price.eqpUnitPer
                                                    }`}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {fCurrencyBaht(getQuantity(index) * price.eqpUnitPrice)}
                                                </TableCell>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </RowDetailStyle>
                                    {price.eqsubPrice.map((subPrice, subIndex) => (
                                        <RowDetailStyle
                                            key={`booking-sub-price-eqpEqId-${subPrice.eqsubpId}`}
                                        >
                                            <TableCell />
                                            <TableCell>
                                                <Stack direction="row" alignItems="center">
                                                    <div>
                                                        {price.eqpSubOption === 'AT_LEAST_ONE' ? (
                                                            <Checkbox
                                                                disabled={
                                                                    subPrice.eqsubpChecked ===
                                                                    'FIXED'
                                                                }
                                                                checked={getIsChecked(
                                                                    index,
                                                                    subIndex
                                                                )}
                                                                onClick={() =>
                                                                    handleCheckbox(index, subIndex)
                                                                }
                                                            />
                                                        ) : (
                                                            <Radio
                                                                disabled={
                                                                    subPrice.eqsubpChecked ===
                                                                    'FIXED'
                                                                }
                                                                checked={getIsChecked(
                                                                    index,
                                                                    subIndex
                                                                )}
                                                                onClick={() =>
                                                                    handleRadiobutton(
                                                                        index,
                                                                        subIndex
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                    <Stack ml={2}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                        >
                                                            {subPrice.eqsubpName}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle1"
                                                            mb={0}
                                                        >
                                                            {subPrice.eqsubpDescription}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    label={constant.Qty}
                                                    disabled={['hr', 'booking'].includes(
                                                        price.eqpUnitPer.toLowerCase()
                                                    )}
                                                    onChange={(e) =>
                                                        handleQuantity(
                                                            e.target.value,
                                                            index,
                                                            subIndex
                                                        )
                                                    }
                                                    value={getQuantity(index, subIndex)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                {`${fCurrencyBaht(subPrice.eqsubpUnitPrice)}/${
                                                    subPrice.eqsubpUnitPer
                                                }`}
                                            </TableCell>
                                            <TableCell align="right">
                                                {fCurrencyBaht(getQuantity(index, subIndex) * subPrice.eqsubpUnitPrice)}
                                            </TableCell>
                                        </RowDetailStyle>
                                    ))}
                                </React.Fragment>
                            ))}

                            <RowResultStyle>
                                <TableCell colSpan={3} />
                                <TableCell align="right">
                                    <Box sx={{ mt: 2 }} />
                                    <Typography>{constant.subTotal}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ mt: 2 }} />
                                    <Typography whiteSpace='nowrap'>
                                        {fCurrencyBaht(getSubTotal())}
                                    </Typography>
                                </TableCell>
                            </RowResultStyle>
                            <RowResultStyle>
                                <TableCell colSpan={3} />
                                <TableCell align="right">
                                    <Typography>{constant.oTCharge}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {constant.notIncluding}
                                    </Typography>
                                </TableCell>
                            </RowResultStyle>
                            <RowResultStyle>
                                <TableCell colSpan={3} />
                                <TableCell align="right">
                                    <Typography>{constant.discount}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {constant.notIncluding}
                                    </Typography>
                                </TableCell>
                            </RowResultStyle>
                            <RowResultStyle>
                                <TableCell colSpan={3} />
                                <TableCell align="right">
                                    <Typography>{constant.fees}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {constant.notIncluding}
                                    </Typography>
                                </TableCell>
                            </RowResultStyle>
                            <RowResultStyle>
                                <TableCell colSpan={3} />
                                <TableCell align="right">
                                    <Typography variant="h6">{constant.totalEstimated}</Typography>
                                </TableCell>
                                <TableCell align="right" width={140}>
                                    <Typography variant="h6" whiteSpace='nowrap'>
                                        {fCurrencyBaht(getSubTotal())}
                                    </Typography>
                                </TableCell>
                            </RowResultStyle>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Paper>
    )
}

export default TableView
