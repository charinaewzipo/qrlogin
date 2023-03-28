import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Stack, TextField, Paper, styled, Typography, Box, FormHelperText } from '@mui/material'
import FormProvider, { RHFCheckbox, RHFRadioGroup, RHFTextField } from '@sentry/components/hook-form'
import { CustomFile, Upload } from '@sentry/components/upload'
import { cloneDeep } from 'lodash'
import { DateTimePicker } from '@mui/x-date-pickers'
import { fNumber } from '@ku/utils/formatNumber'
import { format } from 'date-fns'
import ConfirmDialog from '../ConfirmDialog'
import palette from '@sentry/theme/palette'

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}))

const constant = {
    descriptions: 'Descriptions',
    cost: 'Cost',
    date: 'Date',
    paymentMethod: 'Payment Method',
    paymentDateTime: 'Payment date time',
    amount: 'Amount',
    billingAddress: 'Billing address',
    sameAccountAddress: 'Use same acount address',
    remark: 'Remark',
    payslipImage: 'Payslip image',
    paymentNotice: 'Payment notice',
    paymentNoticeTitle: 'Payment notice!',
    confirmPayment: 'Yes, Confirm payment',
    cancel: 'Cancel',
    recheck: 'Recheck',
}
const paymentMethod = [
    { value: 'Cash / Bank transfer / QR code', label: 'Cash / Bank transfer / QR code' },
    { value: 'Debit department', label: 'Debit department' },
]
export interface PaymentNoticeFormValuesProps {
    paymentMethod: string
    paymentDateTime: Date
    amount: string
    payslipImage: CustomFile | string
    isSameAccountAddress: boolean
    remark: string
    billingAddress: string
}
interface IUserPaymentNoticeProps {
    totalAmount: number
    eqName: string
    bookId: number
    onSubmit: (data: PaymentNoticeFormValuesProps) => void
    errorMsg: string
}
function UserPaymentNotice(props: IUserPaymentNoticeProps) {
    const [openConfirmPayment, setOpenConfirmPayment] = useState(false)
    const paymentNoticeSchema = Yup.object().shape({
        paymentMethod: Yup.string(),
        paymentDateTime: Yup.date()
            .required('Payment Date Time is require')
            .typeError('Expected date format is dd/MM/yyyy HH:mm. Example: "31/12/1970 12:34".')
            .nullable(),
        amount: Yup.string().required('Amount is require'),
        payslipImage: Yup.string().min(1, 'Payslip image is require'),
        isSameAccountAddress: Yup.boolean(),
        billingAddress: Yup.string().required('Billing address is require'),
        remark: Yup.string(),
    })

    const defaultValues = {
        paymentMethod: paymentMethod[0].value,
        paymentDateTime: new Date(),
        amount: fNumber(props.totalAmount),
        payslipImage: '',
        isSameAccountAddress: false,
        billingAddress: '',
        remark: '',
    }
    const methods = useForm<PaymentNoticeFormValuesProps>({
        resolver: yupResolver(paymentNoticeSchema),
        defaultValues,
    })

    useEffect(() => {
        handleReset()
    }, [props.totalAmount]);

    const {
        reset,
        control,
        setValue,
        trigger,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = methods

    const handleChangeNumber = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: keyof PaymentNoticeFormValuesProps,
        option?: 'comma'
    ) => {
        const typingIndexFromEnd = e.target.selectionStart - e.target.value.length
        const oldValue = e.target.value
        let newValue = e.target.value
        if (option.includes('comma')){
            //เช็คว่าลบ comma ก็จะไปลบตัวหน้า comma แทน
            for (let i = 0; i < oldValue.length; i++) {
                if (
                    oldValue[i] === ',' &&
                    oldValue[i] !== newValue[i] &&
                    oldValue.length - 1 === newValue.length
                ) {
                    newValue = newValue.substring(0, i - 1) + newValue.substring(i)
                    break
                }
            }
        }
        
        const numberOnlyRegex = /^[0-9\b]+$/
        const newValueNoComma = newValue.replace(new RegExp(',', 'g'), '') || ''
        if (newValue === '') {
            setValue(fieldName, newValue)
            return
        }
        if (new RegExp(numberOnlyRegex).test(newValueNoComma)) {
            const formattedValue = option.includes('comma') ? fNumber(newValueNoComma) : newValueNoComma
            setValue(fieldName, formattedValue)
            if (isSubmitted) trigger()
            setTimeout(() => {
                //set text cursor at same position after setValue
                const typingIndexFromStart = formattedValue.length + typingIndexFromEnd;
                e.target.setSelectionRange(typingIndexFromStart, typingIndexFromStart)
            }, 0)
        }
    }
    
    const isRequire = (label: string, isRequire: boolean = true) => {
        return `${label} ${isRequire ? '*' : ''}`
    }

    const handleOpenConfirm = () => {
        setOpenConfirmPayment(true)
    }
    
    const handleReset = () => {
        reset({ ...defaultValues })
    }
    const handleFormSubmit = () => {
        if (!isValid) return
        const submitData = cloneDeep(getValues())
        props.onSubmit(submitData)
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(handleOpenConfirm)}>
            <Stack spacing={5}>
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                    <Stack spacing={3}>
                        {!!props.errorMsg && <Alert severity="error">{props.errorMsg}</Alert>}
                        <div>
                            <LabelStyle>{constant.paymentNotice}</LabelStyle>
                            <RHFRadioGroup
                                row={false}
                                name="paymentMethod"
                                options={paymentMethod}
                                sx={{
                                    '& .MuiFormControlLabel-root': { mr: 4 },
                                }}
                            />
                        </div>
                        <Controller
                            name="paymentDateTime"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <DateTimePicker
                                    inputFormat="dd/MM/yyyy HH:mm"
                                    label={isRequire(constant.paymentDateTime)}
                                    value={field.value || null}
                                    onChange={(newValue) => {
                                        field.onChange(newValue)
                                    }}
                                    ampm={false}
                                    disableMaskedInput
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!error}
                                            helperText={error?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                        />
                        <RHFTextField
                            name="amount"
                            label={isRequire(constant.amount)}
                            onChange={(e) => handleChangeNumber(e, 'amount', 'comma')}
                            inputProps={{ maxLength: 20 }}
                        />
                        <div>
                            <Controller
                                key={`payslip-image`}
                                name={`payslipImage`}
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        dropzoneHelper={
                                            <Box sx={{ py: 3, pl: 5 }}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    sx={{ ml: -2 }}
                                                >
                                                    {constant.payslipImage}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    component="p"
                                                    whiteSpace="pre-line"
                                                    sx={{ ml: -2 }}
                                                >
                                                    Drop files here or click
                                                    <Typography
                                                        variant="body2"
                                                        component="span"
                                                        sx={{
                                                            mx: 0.5,
                                                            color: 'primary.main',
                                                            textDecoration: 'underline',
                                                        }}
                                                    >
                                                        {`browse`}
                                                    </Typography>
                                                    thorough your machine.
                                                </Typography>
                                            </Box>
                                        }
                                        multiple={false}
                                        file={field.value}
                                        onDrop={(files) =>
                                            field.onChange(URL.createObjectURL(files[0]))
                                        }
                                        onDelete={() => field.onChange('')}
                                    />
                                )}
                            />
                            <FormHelperText error sx={{ ml: 2 }}>
                                {errors.payslipImage?.message}
                            </FormHelperText>
                        </div>
                        <RHFCheckbox
                            name="isSameAccountAddress"
                            label={constant.sameAccountAddress}
                        />
                        <RHFTextField
                            name="billingAddress"
                            multiline
                            label={isRequire(constant.billingAddress)}
                            inputProps={{ maxLength: 200 }}
                            minRows={4}
                        />
                        <RHFTextField
                            name="remark"
                            multiline
                            label={constant.remark}
                            inputProps={{ maxLength: 200 }}
                            minRows={4}
                        />
                        <Stack flexDirection="row" justifyContent="right" gap={2}>
                            <LoadingButton
                                type="button"
                                variant="contained"
                                size="large"
                                onClick={handleReset}
                                color="inherit"
                            >
                                {constant.cancel}
                            </LoadingButton>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                size="large"
                            >
                                {constant.paymentNotice}
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
            <ConfirmDialog
                title={constant.paymentNoticeTitle}
                colorButton='inherit'
                textCancel={constant.recheck}
                onClose={() => { setOpenConfirmPayment(false) }}
                action={
                    <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={() => {
                            handleFormSubmit()
                            setOpenConfirmPayment(false)
                        }}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        {constant.confirmPayment}
                    </LoadingButton>}
                open={openConfirmPayment}
                content={
                    <Box>
                        {[
                            { sx: { mt: 2, mb: 3 }, text: `Are you sure to payment notice?` },
                            { sx: { mb: 0 }, text: `Booking number ${props.bookId}` },
                            { sx: { mb: 0 }, text: `${props.eqName}` },
                            { 
                                sx: { mb: 0 }, 
                                text: `At ${format(getValues('paymentDateTime'), 'dd/MM/yyyy HH:mm')}` 
                            },
                            { sx: { mb: 3 }, text: `Amount: ${getValues('amount')} baht` },
                        ].map((i, index) => (
                            <Typography
                                key={'paymen-notice-confirm' + index}
                                variant="body1"
                                sx={{
                                    ...{ color: (theme) => palette(theme.palette.mode).text.secondary },
                                    ...i.sx,
                                }}
                            >
                                {i.text}
                            </Typography>
                        ))}
                    </Box>
                }
            />
        </FormProvider>
    )
}

export default UserPaymentNotice
