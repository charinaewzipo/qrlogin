import { InputBaseComponentProps } from '@mui/material'
import React from 'react'
import { NumericFormat } from 'react-number-format'

const NumberFormatCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
    const { inputRef, onChange, ...other } = props

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            allowNegative={false}
            decimalScale={0}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue,
                    },
                })
            }}
            thousandSeparator
        />
    )
})

const NumberFormatCustomNoComma = React.forwardRef<HTMLElement, any>((props, ref) => {
    const { inputRef, onChange, ...other } = props

    return (
        <NumericFormat
            {...other}
            allowLeadingZeros
            getInputRef={ref}
            allowNegative={false}
            decimalScale={0}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue,
                    },
                })
            }}
        />
    )
})

const NumberFormatCustomDecimal = React.forwardRef<HTMLElement, any>((props, ref) => {
    const { inputRef, onChange, ...other } = props

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            allowNegative={false}
            decimalScale={2}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue,
                    },
                })
            }}
            thousandSeparator
        />
    )
})

export { NumberFormatCustom, NumberFormatCustomNoComma, NumberFormatCustomDecimal }
