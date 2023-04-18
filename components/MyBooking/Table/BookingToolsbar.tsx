// @mui
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, InputAdornment, TextField, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import FormProvider from '@sentry/components/hook-form/FormProvider'
import Iconify from '@sentry/components/iconify'
import { addDays } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'

import * as Yup from 'yup'

type Props = {
    filterName: string
    filterStartDate: Date | null
    filterEndDate: Date | null
    isFiltered: boolean
    onResetFilter: VoidFunction
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterStartDate: (value: Date | null) => void;
    onFilterEndDate: (value: Date | null) => void;
}

export type FormValuesProps = {
    startDate: Date | null
    endDate: Date | null
}

export default function BookingToolsbar({
    filterName,
    filterStartDate,
    filterEndDate,
    isFiltered,
    onFilterName,
    onResetFilter,
    onFilterEndDate,
    onFilterStartDate,
}: Props) {
    const BookingScheme = Yup.object().shape({
        startDate: Yup.date().nullable(), //.required('Start date is required'),
        endDate: Yup.date().nullable(), //.required('End date is required').min(Yup.ref('startDate'), 'End date must be later than start date'),
    })

    const defaultValues = {
        assessmentName: '',
        link: '',
        startDate: null,
        endDate: null,
        status: 'Active',
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(BookingScheme),
        defaultValues,
    })
    return (
        <FormProvider methods={methods}>
            <Stack
                spacing={2}
                alignItems="center"
                direction={{
                    xs: 'column',
                    md: 'row',
                }}
                sx={{ px: 2.5, py: 3 }}
            >
                <Controller
                    name="startDate"
                    control={methods.control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            {...field}
                            label="Start date"
                            inputFormat="dd MMM yyyy"
                            onChange={(e)=> {
                                field.onChange(e)
                                onFilterStartDate(e)}
                            }
                            value={filterStartDate}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    )}
                />

                <Controller
                    name="endDate"
                    control={methods.control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            {...field}
                            label="End date"
                            inputFormat="dd MMM yyyy"
                            minDate={addDays(filterStartDate, 1)}
                            onChange={(e)=> {
                                field.onChange(e)
                                onFilterEndDate(e)}
                            }
                            value={filterEndDate}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    )}
                />

                <TextField
                    fullWidth
                    sx={{width:"200%"}}
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search booking name / number"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {isFiltered && (
                    <Button
                        color="error"
                        sx={{ flexShrink: 0 }}
                        onClick={()=>{
                            onResetFilter()
                            methods.reset()
                        }}
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                    >
                        Clear
                    </Button>
                )}
            </Stack>
        </FormProvider>
    )
}
