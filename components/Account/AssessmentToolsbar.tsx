// @mui
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, InputAdornment, TextField, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import Iconify from '@sentry/components/iconify'
import { Controller, useForm } from 'react-hook-form'

import * as Yup from 'yup'

type Props = {
    filterName: string
    isFiltered: boolean
    onResetFilter: VoidFunction
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type FormValuesProps = {
    startDate: Date | null
    endDate: Date | null
}

export default function AssessmentToolsbar({
    filterName,
    isFiltered,
    onFilterName,
    onResetFilter,
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
        <>
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
                sx={{width:"400%"}}
                value={filterName}
                onChange={onFilterName}
                placeholder="Search assesment name"
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
        </>
    )
}
