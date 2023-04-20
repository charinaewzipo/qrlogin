import { TableRow, TableCell, Box, Typography, Link, IconButton, MenuItem, CircularProgress, Dialog, DialogActions, Tooltip } from '@mui/material'
import { fDate } from '@sentry/utils/formatTime'
import Label from '@sentry/components/label'
import { useState } from 'react'
import Iconify from '@sentry/components/iconify'
import MenuPopover from '@sentry/components/menu-popover'
import { get } from 'lodash'
import { PDFViewer } from '@react-pdf/renderer'
import InvoicePaymentPDF from '@ku/components/Invoice/InvoicePaymentPDF'


type Props = {
    row: IBooking
    onViewRow: VoidFunction
    onRemove?: VoidFunction
}

const styledTextOverFlow = {
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
}

export default function BookingRow({ row, onViewRow, onRemove }: Props) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
    const [openPayment, setOpenPayment] = useState(false);
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const listMenuPopover = {
        quotation: {
            action: () => { console.log("Download Quotation"); },
            label: <><Iconify icon="ic:round-insert-drive-file" /> Download Quotation</>,
        },
        cancelBooking: {
            action: () => { console.log("Cancel Booking"); onRemove() },
            label: <><Iconify icon="eva:trash-2-outline" /> Cancel Booking</>,
        },
        invoice: {
            action: () => { setOpenPayment(true) },
            label:
                <><Iconify icon="ic:baseline-verified" /> Download Invoice</>

        },
        receipt: {
            action: () => { console.log("Download Receipt"); },
            label: <><Iconify icon="material-symbols:receipt" />Download Receipt</>,
        },
    }

    const menuPopoverByStatus: { [key in IBookingStatus] } = {
        Pending: [listMenuPopover.quotation, listMenuPopover.cancelBooking],
        "Waiting for payment": [listMenuPopover.quotation, listMenuPopover.invoice, listMenuPopover.cancelBooking],
        Confirm: [listMenuPopover.quotation, listMenuPopover.invoice],
        Finish: [listMenuPopover.quotation, listMenuPopover.invoice, listMenuPopover.receipt],
    }
    return (
        <>
            <Dialog fullScreen open={openPayment}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <DialogActions
                        sx={{
                            zIndex: 9,
                            padding: '12px !important',
                            boxShadow: (theme) => theme.customShadows.z8,
                        }}
                    >
                        <Tooltip title="Close">
                            <IconButton color="inherit" onClick={() => setOpenPayment(false)}>
                                <Iconify icon="eva:close-fill" />
                            </IconButton>
                        </Tooltip>
                    </DialogActions>
                    <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
                        <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                            <InvoicePaymentPDF />
                        </PDFViewer>
                    </Box>
                </Box>
            </Dialog>
            <TableRow
                hover
                tabIndex={-1}
                role="none"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell align="left">
                    <Link
                        noWrap
                        onClick={() => {
                            console.log("link");

                        }}
                        variant="body2"
                        target="_blank"
                        rel="noopener"
                        sx={{ display: 'table' }}
                    > {row.id}
                    </Link>
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>

                <TableCell align="left">{row.equipement}</TableCell>
                <TableCell align="left">
                    <Box>
                        <Typography variant="subtitle2" sx={{ ...styledTextOverFlow, maxWidth: 115 }}>{row.bookingDate}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.disabled', ...styledTextOverFlow, maxWidth: 115 }}> {row.time}</Typography>
                    </Box>
                </TableCell>
                <TableCell align="left">{row.requestDate}</TableCell>
                <TableCell align="left">{row.paymentDate}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="left">
                    <Label color={row.status === 'Confirm' ? 'success' : (row.status === 'Pending' ? 'warning' : (row.status === 'Finish' ? 'default' : 'secondary'))} >{row.status}</Label>
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
                        {
                            get(menuPopoverByStatus, row.status, []).map((i) => <MenuItem
                                onClick={i.action}
                                sx={i === listMenuPopover.cancelBooking ? { color: 'error.main' } : {}}
                            >{i.label}</MenuItem>)
                        }
                    </MenuPopover>
                </TableCell>
            </TableRow>
        </>
    )
}
