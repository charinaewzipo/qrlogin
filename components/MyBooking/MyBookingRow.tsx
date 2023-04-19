import { TableRow, TableCell, Typography, IconButton, MenuItem, Stack, Box } from '@mui/material'
import { fDateTimeFormat } from '@sentry/utils/formatDateTime'
import Label, { LabelColor } from '@sentry/components/label'
import { useState } from 'react'
import Iconify from '@sentry/components/iconify'
import MenuPopover from '@sentry/components/menu-popover'
import { get, lowerCase, upperFirst } from 'lodash'
import Image from '@sentry/components/image'
import { fCurrencyBaht } from '@ku/utils/formatNumber'
import { PDFDownloadLink } from '@react-pdf/renderer'
import InvoicePDF from '../Invoice/InvoicePaymentPDF'

type Props = {
    row: IV1RespGetBookingMeRead
    onViewRow: VoidFunction
    onRemove?: VoidFunction
}

const styledTextOverFlow = {
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
}

export default function MyBookingRow({ row, onViewRow, onRemove }: Props) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget)
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleOnClickRow = (event: React.MouseEvent<HTMLElement>) => {
        onViewRow()
    }
    const listMenuPopover = {
        quotation: {
            action: () => { console.log("Download Quotation"); },
            label: <><Iconify icon="ic:round-insert-drive-file" />Download Quotation</>,
        },
        cancelBooking: {
            action: () => { console.log("Cancel Booking"); onRemove() },
            label: <><Iconify icon="eva:trash-2-outline" />Cancel Booking</>,
        },
        invoice: {
            action: () => { console.log("Download Invoice"); },
            label:
                <PDFDownloadLink
                    document={<InvoicePDF />}
                    fileName={'ทดสอบ123'}
                    style={{ textDecoration: 'none' }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Iconify icon="ic:baseline-verified" /> Download Invoice
                    </Box>
                </PDFDownloadLink>,
        },
        receipt: {
            action: () => { console.log("Download Receipt"); },
            label: <><Iconify icon="material-symbols:receipt" />Download Receipt</>,
        },
        qrCode: {
            action: () => { console.log("Payment QR Code"); },
            label: <><Iconify icon="material-symbols:receipt" />Payment QR Code</>,
        },
    }

    const menuPopoverByStatus: { [key in TBookStatus] } = {
        PENDING: [listMenuPopover.quotation, listMenuPopover.cancelBooking],
        CONFIRM: [listMenuPopover.quotation, listMenuPopover.cancelBooking],
        WAITING_FOR_PAYMENT: [
            listMenuPopover.quotation,
            listMenuPopover.invoice,
            listMenuPopover.qrCode,
        ],
        WAITING_FOR_PAYMENT_CONFIRM: [listMenuPopover.quotation, listMenuPopover.invoice],
        FINISH: [listMenuPopover.quotation, listMenuPopover.invoice],
        CANCELED: [listMenuPopover.quotation, listMenuPopover.cancelBooking],
    }
    const getBookingStatusLabelColor = (): LabelColor => {
        switch (row.bookStatus) {
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
    const renderBookingTime = (times: number[]) =>
        times.map((time, i) =>
            <Typography whiteSpace='pre' component='span' variant="body2">
                {`${time}:00 - ${time}:59${i < times.length - 1 ? `, ` : ''}`}
            </Typography>
        )

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                role="none"
                onClick={handleOnClickRow}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Image
                            src={row.eqPictures[0].eqpicLink}
                            sx={{ width: 64, height: 64, borderRadius: 1.5 }}
                        />
                        <Stack>
                            <Typography variant="subtitle2">{`${row.eqName} (${row.eqCode})`}</Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {`No: ${row.eqId}`}
                            </Typography>
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell align="left">{fDateTimeFormat(row.bookCreatedAt, 'DD MMM YYYY')}</TableCell>
                <TableCell align="left">
                    <Stack direction='row' flexWrap='wrap'>
                        {renderBookingTime(row.eqRtimTimes)}
                    </Stack>
                </TableCell>
                <TableCell align="right">{fCurrencyBaht(row.eqPriceSubTotal)}</TableCell>
                <TableCell align="right">{fCurrencyBaht(row.payTotal)}</TableCell>
                <TableCell align="left">
                    <Label color={getBookingStatusLabelColor()}>
                        {upperFirst(lowerCase(row.bookStatus))}
                    </Label>
                </TableCell>
                <TableCell
                    align="right"
                    onClick={(e) => {
                        if (get(e.target, 'tagName', 'TD') !== 'TD') {
                            e.preventDefault()
                            e.stopPropagation()
                            e.nativeEvent.stopImmediatePropagation()
                        }
                    }}
                >
                    <IconButton
                        size="large"
                        color={openPopover ? 'inherit' : 'default'}
                        onClick={handleOpenPopover}
                    >
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>

                    <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
                        {get(menuPopoverByStatus, row.bookStatus, []).map((i) => (
                            <MenuItem
                                onClick={i.action}
                                sx={
                                    i === listMenuPopover.cancelBooking
                                        ? { color: 'error.main' }
                                        : {}
                                }
                            >
                                {i.label}
                            </MenuItem>
                        ))}
                    </MenuPopover>
                </TableCell>
            </TableRow>
        </>
    )
}
