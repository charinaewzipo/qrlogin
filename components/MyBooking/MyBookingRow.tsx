import { TableRow, TableCell, Typography, IconButton, MenuItem, Stack } from '@mui/material'
import { fDate } from '@sentry/utils/formatTime'
import Label, { LabelColor } from '@sentry/components/label'
import { useState } from 'react'
import Iconify from '@sentry/components/iconify'
import MenuPopover from '@sentry/components/menu-popover'
import { get, lowerCase, upperFirst } from 'lodash'
import Image from '@sentry/components/image'
import { fCurrencyBaht } from '@ku/utils/formatNumber'

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
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const listMenuPopover = {
        quotation:{
            action: ()=>{console.log("Download Quotation");},
            label: <><Iconify icon="ic:round-insert-drive-file" /> Download Quotation</>,
        },
        cancelBooking:{
            action: ()=>{console.log("Cancel Booking");onRemove()},
            label: <><Iconify icon="eva:trash-2-outline" /> Cancel Booking</>,
        },
        invoice:{
            action: ()=>{console.log("Download Invoice");},
            label: <><Iconify icon="ic:baseline-verified" /> Download Invoice</>,
        },
        receipt:{
            action: ()=>{console.log("Download Receipt");},
            label: <><Iconify icon="material-symbols:receipt" />Download Receipt</>,
        },
        qrCode:{
            action: ()=>{console.log("Payment QR Code");},
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
        times.map((time, i) => `${time}:00-${time}:59${i < times.length - 1 ? ', ' : ''}`)

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                role="none"
                onClick={onViewRow}
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
                            >{`No: ${row.eqId}`}</Typography>
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell align="left">
                    {fDate(row.bookCreatedAt)}
                </TableCell>
                <TableCell align="left">{renderBookingTime(row.eqRtimTimes)}</TableCell>
                <TableCell align="right">{fCurrencyBaht(row.eqPriceSubTotal)}</TableCell>
                <TableCell align="right">{fCurrencyBaht(row.payTotal)}</TableCell>
                <TableCell align="left">
                    <Label color={getBookingStatusLabelColor()}>{upperFirst(lowerCase(row.bookStatus))}</Label>
                </TableCell>
                <TableCell align="right">
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
