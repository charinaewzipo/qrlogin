import { useCallback } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Alert,
    Stack,
    TextField,
    Paper,
} from '@mui/material'
import FormProvider, { RHFTextField } from '@sentry/components/hook-form'
import { CustomFile, RejectionFiles, Upload } from '@sentry/components/upload'
import { cloneDeep } from 'lodash'
import { DatePicker } from '@mui/x-date-pickers'
import { useDropzone } from 'react-dropzone'

const constant = {
  descriptions: 'Descriptions',
  cost: 'Cost',
  date: 'Date',
  attachMaintenanceFile: 'Attach maintenance file',
  createMaintenanceLog: 'Create Maintenance Log',
  cancel: 'Cancel',
}
interface IPaymentSummaryProps {
    onCancel: () => void
    errorMsg: string
}
function PaymentSummary(props: IPaymentSummaryProps) {
    return (
            <Stack spacing={5}>
                {!!props.errorMsg && <Alert severity="error">{props.errorMsg}</Alert>}
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                </Paper>
                <Stack flexDirection="row" justifyContent="right" gap={2}>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={props.onCancel}
                        color="inherit"
                    >
                        {constant.cancel}
                    </LoadingButton>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        // loading={authenticationStore.isFetching}
                    >
                        {constant.createMaintenanceLog}
                    </LoadingButton>
                </Stack>
            </Stack>
    )
}

export default PaymentSummary
