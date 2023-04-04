
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ErrorOption, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Card, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import FormProvider, { RHFTextField } from "@sentry/components/hook-form";
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo } from 'react'
import { BOOKING_PATH, MERGE_PATH } from '@ku/constants/routes'
import { useAuthContext } from '@ku/contexts/useAuthContext'

type FormValuesProps = {
  billingAdress: string,
  afterSubmit?: string,
  radio: string,
  remark: string,
  isCheckSameAddress: boolean

}

const PAYMENT_OPTION = [
  { label: 'Cash / Bank transfer / QR code', value: 'Cash / Bank transfer / QR code' },
  { label: 'Debit department', value: 'Debit department' },
];


function BookingEstimatingForm() {
  const { push } = useRouter()
  const { user } = useAuthContext()
  console.log(user)
  const ForgotPasswordSchema = Yup.object().shape({
    billingAdress: Yup.string().required('Biiling address is require'),
  })

  const defaultValues: FormValuesProps = useMemo(
    () => ({
      billingAdress: '',
      remark: '',
      radio: 'Cash / Bank transfer / QR code',
      isCheckSameAddress: false
    }),
    []
  )
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  })

  const {
    setError,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch
  } = methods

  const [watchBillingAdress] = watch(['billingAdress'])

  useEffect(() => {
    if (getValues('isCheckSameAddress') === true) {
      setValue('isCheckSameAddress', false)
    }
  }, [watchBillingAdress])

  const onSubmit = async (data: FormValuesProps) => {
    console.log('data:', data)
    const errorOptions: ErrorOption = {
      message: "3 Attempt forgot password request"
    }
    // setOpenPleaseContact(true)
    setError('afterSubmit', errorOptions)

    push(MERGE_PATH(BOOKING_PATH, '12345/12345', 'success'))
  }
  const handleClickEditBooking = () => {
    push(MERGE_PATH(BOOKING_PATH, '12345'))
  }

  const OPTION_RADIO = user.uiTypePerson === 'SCIKU_STUDENT_STAFF' ? PAYMENT_OPTION : PAYMENT_OPTION.filter(i => i.value !== 'Debit department')
  return (
    <Card sx={{ pt: 3, px: 3, mt: 5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.afterSubmit && <Stack sx={{ pb: 3 }}>
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        </Stack>}
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="flex-start" >
            <Controller
              name='isCheckSameAddress'
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Checkbox
                  checked={value}
                  onChange={onChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              )}
            />

            <Typography variant="body2"> Use same acoount address </Typography>
          </Stack>

          <RHFTextField name="billingAdress" label="Billing adress *" multiline rows={4} />
          <RHFTextField name="remark" label="Remark" multiline rows={4} />
          <Stack spacing={1}>
            <Typography variant='subtitle2' color='text.secondary'>Payment Method</Typography>
            <Controller
              name='radio'
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <RadioGroup value={value} onChange={onChange}>
                  {OPTION_RADIO.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      sx={{ pl: 1 }}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-end'} direction={'row'} spacing={2} sx={{ my: 3, mx: 3 }}>
          <LoadingButton
            size="medium"
            type="submit"
            variant="contained"
          >
            Confirm Booking
          </LoadingButton>
          <LoadingButton
            size="medium"

            variant="outlined"
            color='inherit'
            onClick={handleClickEditBooking}
          >
            Edit Booking
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  )
}

export default BookingEstimatingForm