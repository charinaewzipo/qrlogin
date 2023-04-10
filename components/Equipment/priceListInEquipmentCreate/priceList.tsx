import sum from 'lodash/sum'
import { useCallback, useEffect, useState ,useMemo} from 'react'
// form
import { useFormContext, useFieldArray ,useForm} from 'react-hook-form'
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
const defaultValuesForm = {
    eqpscheChecked: "Fixed",
    eqpscheDescription: "",
    eqpscheName: "",
    eqpscheSubOption: "",
    eqpscheUnitPer: "",
    eqpscheUnitPrice: {SCIKU_STUDENT_STAFF: '' , 
    KU_STUDENT_STAFF:'' ,OTHER_UNIVERSITY:'',
        GOVN_OFFICE:'',PRIVATE_COMPANY:''}, 
    eqsubsches: [],
}


// ----------------------------------------------------------------------

export default function PriceListNewEditDetails({currentTab}) {
    // const defaultValues = useMemo(
    //     () => ({
    //         eqsches: [defaultValuesForm]
    //     }),[]
    //   );

    const { control, setValue, watch, resetField } = useFormContext()

    const { fields, append, remove , update } = useFieldArray({
        control,
        name: `eqtypeperson[0].eqsches`,
    })

    const values = watch()
    // const [priceWhenEmpty,setPriceWhenEmpty] = useState(0)

    useEffect(() => {
        console.log('currentTab',currentTab)
    }, [currentTab])

    useEffect(() => {
    }, [fields])

    
    
    const handleAdd = () => {
        append(
            defaultValuesForm
        )
    }

    const getSubEQU = (indexEquipment , stateChild) => {
        //  console.log('ค่าจากgetsubEquหน้าแรก',indexEquipment,'และ',stateChild)
        
        // setSubEquipment(stateChild)
        if(isEmpty(stateChild)){
            // console.log('เข้าอิฟ')
            setValue(`eqtypeperson[0].eqsches.${indexEquipment}.subs`, false);
        }
        else{
            // console.log('เข้าเอลฟ์')
            setValue(`eqtypeperson[0].eqsches.${indexEquipment}.subs`, true);
        }
    }
    const loopIndex = () => {
        for (let i = 0; i < 5; i++) {
            return i
          }
    }
    const handleRemove = (index: number) => {
        remove(index)
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
                Details:
            </Typography>

            <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                {fields.map((item, index) => {
                    // console.log('item',item)
                    return (
                        <Stack key={item.id}  spacing={1.5}>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={2}
                                sx={{ width: 1 }}
                            >
                                <RHFSelect
                                    name={`eqtypeperson.[0].eqsches[${index}].eqpscheChecked`}
                                    size="small"
                                    label="Checked *"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                    sx={{ maxWidth: { md: 160 }, width: '100%' }}
                                    defaultValue={index===0 ? 'Fixed' : ''}
                                    disabled={index===0 ? true:false}
                                >

                                    <Divider />

                                    {CHECKED_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.name}
                                            // onClick={() => handleSelectService(index, option.name)}
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
                                    name={`eqtypeperson.[0].eqsches[${index}].eqpscheName`}
                                    label="Name *"
                                />

                                <RHFTextField
                                    size="small"
                                    name={`eqtypeperson.[0].eqsches[${index}].eqpscheDescription`}
                                    label="Description"
                                />

                                {values.eqtypeperson[0].eqsches[index].subs ? <></>:<>
                                    <RHFTextField
                                    size="small"
                                    name={`eqtypeperson.[0].eqsches[${index}].eqpscheUnitPrice.${currentTab}`}
                                    label="Unit price *"
                                    // onChange={(e) => {
                                    //     if(e.target.value === ''){
                                    //         setPriceWhenEmpty(99)
                                    //     }
                                    // }}
                                    // value={get(values,`eqtypeperson.[0].eqsches[${index}].eqpscheUnitPrice.${currentTab}`,'')}
                                />
                                
                                <RHFSelect
                                    name={`eqtypeperson.[0].eqsches[${index}].eqpscheUnitPer`}
                                    size="small"
                                    label="Unit *"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                    sx={{ maxWidth: { md: 160 } }}
                                    defaultValue={index===0 ? 'Baht/Hour' : ''}
                                    disabled={index===0 ? true:false}
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
                                            // onClick={() => handleSelectService(index, option.name)}
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