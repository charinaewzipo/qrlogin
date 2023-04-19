import { NumericFormat } from "react-number-format"

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            allowNegative={false}
            decimalScale={0}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue
                    }
                })
            }}
            thousandSeparator
        />
    )
}

function NumberFormatCustomNoComma(props) {
    const { inputRef, onChange, ...other } = props

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            allowNegative={false}
            decimalScale={0}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue
                    }
                })
            }}
        />
    )
}

function NumberFormatCustomDecimal(props) {
    const { inputRef, onChange, ...other } = props

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            allowNegative={false}
            decimalScale={2}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue
                    }
                })
            }}
            thousandSeparator
        />
    )
}

export {
    NumberFormatCustom,
    NumberFormatCustomNoComma,
    NumberFormatCustomDecimal,
}
