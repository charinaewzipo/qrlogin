import React from 'react'
import { useFieldArray } from 'react-hook-form'

// import Input from "./components/input";
import { RHFSelect, RHFTextField } from '@sentry/components/hook-form'
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material'
import Iconify from '@sentry/components/iconify'

export default ({ nestIndex, control }, handleAddSub) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `test[${nestIndex}].nestedArray`,
    })

    const handleRemove = () => {
        append({ field1: 'field1' })
    }

    const SUB_DETAIL_OPTIONS = [
        { id: 1, name: 'Only one', price: 90.99 },
        { id: 2, name: 'At least one', price: 80.99 },
    ]
    return (
        <div>
            <div style={{ marginLeft: 10 }}>
                {fields.map((item, k) => {
                    return (
                        <div
                            key={item.id}
                            style={{ height: '50px', display: 'flex', marginLeft: 10 , marginTop:16}}
                        >
                            <Stack  direction={'row'} spacing={1}>
                                <Button
                                    size="small"
                                    color="error"
                                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                                    onClick={() => remove(k)}
                                ></Button>
                                <RHFTextField size="small" name={`2`} label="Description" />
                                <RHFTextField size="small" name={`2`} label="Description" />
                                <RHFTextField size="small" name={`2`} label="Description" />
                                <RHFTextField size="small" name={`2`} label="Description" />
                                <RHFTextField size="small" name={`2`} label="Description" />
                            </Stack>
                        </div>
                    )
                })}
                <Stack sx={{mt:2}} alignItems="flex-end" spacing={1.5}>
                    <Stack direction={'row'} spacing={1}>
                        <RHFSelect
                            name="mamamiya"
                            // name={`items[${index}].subDetail`}
                            size="small"
                            label="Sub option type"
                            SelectProps={{
                                native: false,
                                sx: { textTransform: 'capitalize' },
                            }}
                            sx={{ maxWidth: { md: 160 } }}
                        >
                            <MenuItem
                                value="Fixed"
                                // onClick={() => handleClearService(index)}
                                sx={{
                                    mx: 1,
                                    borderRadius: 0.75,
                                    typography: 'body2',
                                    fontStyle: 'italic',
                                    color: 'text.secondary',
                                }}
                            ></MenuItem>

                            <Divider />

                            {SUB_DETAIL_OPTIONS.map((option) => (
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

                        <Button
                            size="medium"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={() => append({ field1: 'field1' })}
                            sx={{ flexShrink: 0 }}
                            variant="contained"
                            // disabled
                        >
                            Add Sub detail
                        </Button>
                    </Stack>
                </Stack>
            </div>

            <hr />
        </div>
    )
}
