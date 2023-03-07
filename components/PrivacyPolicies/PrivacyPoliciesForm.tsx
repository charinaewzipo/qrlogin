import * as Yup from 'yup'
import { useCallback, useMemo } from 'react'
// next
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Grid, Card, Stack, Button, Alert, Typography } from '@mui/material'
import { useSnackbar } from '@sentry/components/snackbar'
import FormProvider, { RHFEditor } from '@sentry/components/hook-form'

interface IPrivacyPoliciesForm {
    privacyPolicies: IPrivacyPolicy | null
    getPrivacyPolicies: () => void
}

export type FormValuesProps = {
    privacyPolicies: string
    afterSubmit?: string
}

export default function PrivacyPoliciesForm({
    privacyPolicies,
    getPrivacyPolicies,
}: IPrivacyPoliciesForm) {
    const { enqueueSnackbar } = useSnackbar()

    const privacyPoliciesScheme = Yup.object().shape({
        privacyPolicies: Yup.string().required('Privacy Policies is required'),
        afterSubmit: Yup.string(),
    })

    const defaultValues = useMemo(
        () => ({
            privacyPolicies: privacyPolicies ? privacyPolicies.privacyPolicies : '',
        }),
        [privacyPolicies]
    )

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(privacyPoliciesScheme),
        defaultValues,
    })

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods

    const values = watch() // TODO: Remove this, If not using

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            reset()
            enqueueSnackbar('Saved privacy policies.')
        } catch (error) {
            // TODO: Handle this after integrate api.
            setValue('afterSubmit', 'Internal Server error.')
            console.error(error)
        }
    }

    const handleResetValue = useCallback(async () => {
        await getPrivacyPolicies()
        reset(defaultValues)
    }, [reset])

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {!!errors.afterSubmit && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Internet error
                    </Alert>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <Stack spacing={1.5} sx={{ p: 3 }}>
                                <RHFEditor
                                    simple
                                    name="privacyPolicies"
                                    placeholder="Write privacy policies"
                                />
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    alignSelf="flex-end"
                                >
                                    Lastest update 12 May 2022 16:02 by Jennarong Saenpaeng
                                </Typography>
                                <Stack direction="row" spacing={1.5} alignSelf="flex-end">
                                    <Button
                                        color="inherit"
                                        variant="contained"
                                        size="medium"
                                        onClick={handleResetValue}
                                    >
                                        Reset
                                    </Button>

                                    <LoadingButton
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        loading={isSubmitting}
                                    >
                                        Save Change
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    )
}
