import sum from 'lodash/sum'
import { useCallback, useEffect, useState } from 'react'
// form
import { useFormContext, useFieldArray } from 'react-hook-form'
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material'
// utils
import { fNumber, fCurrency } from '@sentry/utils/formatNumber'

import NestedArray from "./priceListDetail";
import { clamp, cloneDeep, get ,isEmpty} from 'lodash'
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
    { id: 1, name: 'full stack development' },
    { id: 2, name: 'backend development' },
    { id: 3, name: 'ui design' },
    { id: 4, name: 'ui/ux design' },
    { id: 5, name: 'front end development' },
]

const CHECKED_OPTIONS = [
    { id: 1, name: 'Fixed' },
    { id: 2, name: 'Default' },
    { id: 3, name: 'Optional' },
]

const UNIT_OPTIONS = [
    { id: 1, name: 'Baht/Hour' },
    { id: 2, name: 'Baht/Sample' },
    { id: 3, name: 'Baht/Booking' },
    { id: 4, name: 'Baht/Times' },
]


// ----------------------------------------------------------------------

export default function PriceListNewEditDetails() {
    const { control, setValue, watch, resetField } = useFormContext()

    const { fields, append, remove , update } = useFieldArray({
        control,
        name: 'items',
    })

    const values = watch()

    const totalOnRow = values.items?.map((item: InvoiceItem) => item.quantity * item.price)

    const totalPrice = sum(totalOnRow) - values.discount + values.taxes

    const [subEquipment, setSubEquipment] = useState(null);

    useEffect(() => {
        setValue('totalPrice', totalPrice)
    }, [setValue, totalPrice])

    // useEffect(() => {
    //     console.log('fields first time',fields)
    //     // handleAdd()
    // }, [])

    useEffect(() => {
        console.log('fields หน้าแรกได้ค่า =', fields)
        // console.log('FieldsSub',FieldsSub)
    }, [fields])
    
    const handleAdd = () => {
        append({
            title: '',
            description: '',
            subs: false,
        })
    }

    const getSubEQU = (indexEquipment , stateChild) => {
         console.log('ค่าจากgetsubEquหน้าแรก',indexEquipment,'และ',stateChild)
        
        // setSubEquipment(stateChild)
        if(isEmpty(stateChild)){
            console.log('เข้าอิฟ')
            setValue(`items.${indexEquipment}.subs`, false);
        }
        else{
            console.log('เข้าเอลฟ์')
            setValue(`items.${indexEquipment}.subs`, true);
        }
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
            // setValue(
            //     `items[${index}].price`,
            //     SERVICE_OPTIONS.find((service) => service.name === option)?.price
            // )
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
                    // console.log('item', item.subs)
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
                                    defaultValue={index===0 ? 'Fixed' : ''}
                                >
                                    {/* <MenuItem
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
                                    </MenuItem> */}

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

                                {values.items[index].subs ? <></>:<>
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
                                    defaultValue={index===0 ? 'Baht/Hour' : ''}
                                >
                                    {/* <MenuItem
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

                                    <Divider /> */}

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
                                </RHFSelect></>}
                                
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
                                getSubEQU={getSubEQU}
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
