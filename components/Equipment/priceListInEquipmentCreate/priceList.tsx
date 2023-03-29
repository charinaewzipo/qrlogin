import sum from 'lodash/sum'
import { useCallback, useEffect } from 'react'
// form
import { useFormContext, useFieldArray } from 'react-hook-form'
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material'
// utils
import { fNumber, fCurrency } from '@sentry/utils/formatNumber'

import NestedArray from "./priceListDetail";

// @types
// import { InvoiceItem } from '@sentry/@types/invoice';
// components
import Iconify from '@sentry/components/iconify'
import { RHFSelect, RHFTextField } from '@sentry/components/hook-form'

declare type InvoiceItem = {
    id: string
    title: string
    description: string
    quantity: number
    price: number
    total: number
    service: string
}
// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
    { id: 1, name: 'full stack development', price: 90.99 },
    { id: 2, name: 'backend development', price: 80.99 },
    { id: 3, name: 'ui design', price: 70.99 },
    { id: 4, name: 'ui/ux design', price: 60.99 },
    { id: 5, name: 'front end development', price: 40.99 },
]

const CHECKED_OPTIONS = [
    { id: 1, name: 'Fixed', price: 90.99 },
    { id: 2, name: 'Default', price: 80.99 },
    { id: 3, name: 'Optional', price: 70.99 },
]

const UNIT_OPTIONS = [
    { id: 1, name: 'Baht/Hour', price: 90.99 },
    { id: 2, name: 'Baht/Sample', price: 80.99 },
    { id: 3, name: 'Baht/Booking', price: 70.99 },
    { id: 4, name: 'Baht/Times', price: 70.99 },
]


// ----------------------------------------------------------------------

export default function PriceListNewEditDetails() {
    const { control, setValue, watch, resetField } = useFormContext()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    const values = watch()

    const totalOnRow = values.items?.map((item: InvoiceItem) => item.quantity * item.price)

    const totalPrice = sum(totalOnRow) - values.discount + values.taxes

    useEffect(() => {
        setValue('totalPrice', totalPrice)
    }, [setValue, totalPrice])

    useEffect(() => {
        console.log('fields first time',fields)
        // handleAdd()
    }, [])

    useEffect(() => {
        console.log('fields', fields)
        // console.log('FieldsSub',FieldsSub)
    }, [fields])
    const handleAdd = () => {
        append({
            title: '',
            description: '',
            service: '',
            // quantity: 1,
            // price: 0,
            // total: 0,
            subs: [],
        })
    }

    const handleRemove = (index: number) => {
        remove(index)
    }

    const handleClearService = useCallback(
        (index: number) => {
            resetField(`items[${index}].quantity`)
            resetField(`items[${index}].price`)
            resetField(`items[${index}].total`)
        },
        [resetField]
    )

    const handleSelectService = useCallback(
        (index: number, option: string) => {
            setValue(
                `items[${index}].price`,
                SERVICE_OPTIONS.find((service) => service.name === option)?.price
            )
            setValue(
                `items[${index}].total`,
                values.items.map((item: InvoiceItem) => item.quantity * item.price)[index]
            )
        },
        [setValue, values.items]
    )

    const handleChangeQuantity = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
            setValue(`items[${index}].quantity`, Number(event.target.value))
            setValue(
                `items[${index}].total`,
                values.items.map((item: InvoiceItem) => item.quantity * item.price)[index]
            )
        },
        [setValue, values.items]
    )

    const handleChangePrice = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
            setValue(`items[${index}].price`, Number(event.target.value))
            setValue(
                `items[${index}].total`,
                values.items.map((item: InvoiceItem) => item.quantity * item.price)[index]
            )
        },
        [setValue, values.items]
    )

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
                Details:
            </Typography>

            <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                {fields.map((item, index) => {
                    console.log('item', item)
                    return (
                        <Stack key={item.id}  spacing={1.5}>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={2}
                                sx={{ width: 1 }}
                            >
                                <RHFSelect
                                    name={`items[${index}].checked`}
                                    size="small"
                                    label="Checked *"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                    sx={{ maxWidth: { md: 160 }, width: '100%' }}
                                >
                                    <MenuItem
                                        value="Fixed"
                                        onClick={() => handleClearService(index)}
                                        sx={{
                                            mx: 1,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            fontStyle: 'italic',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Fixed
                                    </MenuItem>

                                    <Divider />

                                    {CHECKED_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.name}
                                            onClick={() => handleSelectService(index, option.name)}
                                            sx={{
                                                mx: 1,
                                                my: 0.5,
                                                borderRadius: 0.75,
                                                typography: 'body2',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>

                                <RHFTextField
                                    size="small"
                                    name={`items[${index}].name`}
                                    label="Name *"
                                />

                                <RHFTextField
                                    size="small"
                                    name={`items[${index}].description`}
                                    label="Description"
                                />

                                <RHFTextField
                                    size="small"
                                    name={`items[${index}].unitPrice`}
                                    label="Unit price *"
                                />

                                <RHFSelect
                                    name={`items[${index}].unit`}
                                    size="small"
                                    label="Unit *"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                    sx={{ maxWidth: { md: 160 } }}
                                >
                                    <MenuItem
                                        value="Fixed"
                                        onClick={() => handleClearService(index)}
                                        sx={{
                                            mx: 1,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            fontStyle: 'italic',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Fixed
                                    </MenuItem>

                                    <Divider />

                                    {UNIT_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.name}
                                            onClick={() => handleSelectService(index, option.name)}
                                            sx={{
                                                mx: 1,
                                                my: 0.5,
                                                borderRadius: 0.75,
                                                typography: 'body2',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                                    onClick={() => handleRemove(index)}
                                    disabled={index === 0 ? true : false}
                                >
                                    Remove
                                </Button>
                            </Stack>

                            <NestedArray
                                nestIndex={index}
                                {...{ control}}
                                // handdleAddSub = {}
                            />

                          
                        </Stack>
                    )
                })}
            </Stack>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

            <Stack
                spacing={2}
                direction={{ xs: 'column-reverse', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                justifyContent={'flex-end'}
            >
                <Button
                    size="small"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleAdd}
                    sx={{ flexShrink: 0 }}
                >
                    Add new detail
                </Button>
            </Stack>
        </Box>
    )
}
