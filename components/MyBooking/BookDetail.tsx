import { useCallback } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Stack, TextField, Paper, Typography, Divider, Grid } from '@mui/material'
import FormProvider, { RHFTextField } from '@sentry/components/hook-form'
import { CustomFile, RejectionFiles, Upload } from '@sentry/components/upload'
import { cloneDeep } from 'lodash'
import { DatePicker } from '@mui/x-date-pickers'
import { useDropzone } from 'react-dropzone'
import Label from '@sentry/components/label'

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
    onCancel: () => void
    errorMsg: string
	status: string
}
function BookDetail(props: IBookDetailProps) {
    return (
        <Stack spacing={5}>
            {!!props.errorMsg && <Alert severity="error">{props.errorMsg}</Alert>}
            <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                <Typography gutterBottom variant="h6">
                    {constant.bookSummary}
                </Typography>
				<Grid container rowGap={2} mt={6}>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.bookingNo}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						0115245
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.equipmentName}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						Coating Material (CM1)
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.status}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						<Label color='info' sx={{ mr: 1 }}>
						Waiting for payment
                        </Label>
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.bookingDate}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						19/08/2022
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.bookingTime}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						<Label color='info' sx={{ mr: 1 }}>
							18:00 - 18:59
                        </Label>
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.duration}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						2 Hrs.
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography gutterBottom variant="subtitle2" color="text.secondary">
							{constant.bookName}
						</Typography>
						<Typography gutterBottom variant="subtitle1">
						Jennarong Saenpaeng
						</Typography>
					</Grid>
				</Grid>
				<Divider sx={{ mx: -3, mt: 3 }} />
            <Stack flexDirection="row" justifyContent="right" gap={2} mt={3}>
                <LoadingButton
                    type="button"
                    variant="text"
                    size="large"
                    onClick={props.onCancel}
                    color="error"
                >
                    {constant.cancelBooking}
                </LoadingButton>
                <LoadingButton
                    type="button"
                    variant="contained"
                    size="large"
                    onClick={props.onCancel}
                >
                    {constant.downloadQuotation}
                </LoadingButton>
                <LoadingButton
                    type="button"
                    variant="contained"
                    size="large"
                    onClick={props.onCancel}
                    color="info"
                >
                    {constant.downloadInvoice}
                </LoadingButton>
                <LoadingButton
                    type="button"
                    variant="contained"
                    size="large"
                    onClick={props.onCancel}
                    color="inherit"
                >
                    {constant.paymentQRCode}
                </LoadingButton>
            </Stack>
            </Paper>
        </Stack>
    )
}

export default BookDetail
