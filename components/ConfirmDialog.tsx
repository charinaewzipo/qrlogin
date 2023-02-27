// @mui
import { LoadingButton } from '@mui/lab';
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogProps, Box } from '@mui/material'

import Image from '@sentry/components/image';
// ----------------------------------------------------------------------

interface ConfirmDialogProps extends Omit<DialogProps, 'title'> {
    title: React.ReactNode
    textCancel?: React.ReactNode
    content?: React.ReactNode
    action: React.ReactNode
    open: boolean
    onClose: VoidFunction
}

export default function ConfirmDialog({
    title,
    textCancel="Cancel",
    content,
    action,
    open,
    onClose,
    ...other
}: ConfirmDialogProps) {
    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
            <Box
                component="div"
                sx={{
                    display: 'inline-flex',
                    // position: 'absolute',
                    width: 400,
                    height: 56,
                    zIndex: 9,
                    mt: { xs: 1.5, md: 5 },
                    ml: { xs: 2, md: 2 },
                }}
            >
                <Image
                    alt="Logo"
                    src={'/assets/images/logo/Logo.png'}
                    disabledEffect
                />
            </Box>
            <DialogTitle sx={{ py: 4, typography: 'h3' }}>{title}</DialogTitle>

            {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

            <DialogActions>
                {action}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    onClick={onClose}
                >
                    {textCancel}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
