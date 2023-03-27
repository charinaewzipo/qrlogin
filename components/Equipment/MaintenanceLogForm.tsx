import { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Stack,
    TextField,
    Paper,
    alpha,
} from '@mui/material'
import FormProvider, { RHFTextField } from '@sentry/components/hook-form'
import { CustomFile, MultiFilePreview, RejectionFiles } from '@sentry/components/upload'
import { cloneDeep, get } from 'lodash'
import { DatePicker } from '@mui/x-date-pickers'
import { useDropzone } from 'react-dropzone'
import { fNumber } from '@sentry/utils/formatNumber'
import axios from '@ku/services/axios'

export interface IMaintenanceLogFormValuesProps {
  descriptions: string
  cost: string
  date: string
  maintenanceFiles: (CustomFile | string)[];
}
const constant = {
  descriptions: 'Descriptions',
  cost: 'Cost',
  date: 'Date',
  attachMaintenanceFile: 'Attach maintenance file',
  createMaintenanceLog: 'Create Maintenance Log',
  cancel: 'Cancel',
  updateMaintenanceLog: 'Update Maintenance Log',
  reset: 'Reset',
}
interface MaintenanceLogFormProps {
    onSubmit: (data: IMaintenanceLogFormValuesProps) => void
    onCancel: () => void
    defaultValue?: IMaintenanceLogFormValuesProps
    isEditing?: boolean
}
function MaintenanceLogForm(props: MaintenanceLogFormProps) {
    const [allObjectUrl, setAllObjectUrl] = useState<string[]>()
    const maxFileLength = 1
    const MaintenanceLogSchema = Yup.object().shape({
        descriptions: Yup.string()
            .required('Descriptions is require')
            .min(6, 'Descriptions must be more than 6 characters')
            .max(100, 'Descriptions must not be more than 100 characters'),
        cost: Yup.string(),
        date: Yup.date()
            .typeError('Expected date format is dd mmm yyyy. Example: "1 jan 1970".')
            .nullable(),
        maintenanceFiles: Yup.array(Yup.string()),
    })

    const defaultValues = props.defaultValue || {
        descriptions: '',
        cost: '',
        date: '',
        maintenanceFiles: [],
    }

    const methods = useForm<IMaintenanceLogFormValuesProps>({
        resolver: yupResolver(MaintenanceLogSchema),
        defaultValues,
    })

    const {
        handleSubmit,
        setValue,
        control,
        watch,
        reset,
        getValues,
        formState: { isSubmitted },
        trigger,
    } = methods

    useEffect(() => {
        reset(props.defaultValue)
    }, [props.defaultValue])

    useEffect(() => {
        return () => {
            if (allObjectUrl) allObjectUrl.map((blob) => URL.revokeObjectURL(blob))
        }
    }, [])  

    const watchMaintenanceFiles = watch('maintenanceFiles')

    const onSubmit = async (data: IMaintenanceLogFormValuesProps) => {
        const submitData = cloneDeep(data)
        //TODO: แปลง submitdata.date เป็น timestamp
        //TODO: ต่อ api อัพไฟล์
        props.onSubmit(submitData)
    }

    const isRequire = (label: string, isRequire: boolean = true) => {
        return `${label} ${isRequire ? '*' : ''}`
    }

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const images = getValues('maintenanceFiles') || []

            setValue('maintenanceFiles', [
                ...images,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            ])
        },
        [setValue, getValues('maintenanceFiles')]
    )

    const handleRemove = (file: File | string) => {
        const filteredItems =
            getValues('maintenanceFiles') && getValues('maintenanceFiles')?.filter((_file) => _file !== file)

        setValue('maintenanceFiles', filteredItems)
    }

    const handleDownload = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        file: CustomFile | string
    ) => {
        const eventTargetTag = String(get(e.target, 'tagName', ''))
        if (eventTargetTag === 'BUTTON' || eventTargetTag === 'svg' || eventTargetTag === 'path') return

        const response = await axios({
            method: 'get',
            url: get(file, 'preview', ''),
            responseType: 'blob',
        })
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const fileURL = window.URL.createObjectURL(blob)
        setAllObjectUrl(prev => prev ? [...prev, fileURL] : [fileURL])

        const link = document.createElement('a')
        link.href = fileURL
        link.download = get(file, 'name', '')
        link.target = "_blank"
        
        link.click()
        link.remove()
    }

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop: handleDrop,
        multiple: false,
    })
    
    const handleChangeNumber = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: keyof IMaintenanceLogFormValuesProps,
        option?: 'comma' | 'commaNotRequired'
    ) => {
        const typingIndexFromEnd = e.target.selectionStart - e.target.value.length
        const oldValue = getValues(fieldName)
        let newValue = e.target.value
        if (option.includes('comma')){
            //เช็คว่าลบ comma ก็จะไปลบตัวหน้า comma แทน
            for (let i = 0; i < oldValue.length; i++) {
                if (
                    oldValue[i] === ',' &&
                    oldValue[i] !== newValue[i] &&
                    oldValue.length - 1 === newValue.length
                ) {
                    newValue = newValue.substring(0, i - 1) + newValue.substring(i)
                    break
                }
            }
        }
        
        const numberOnlyRegex = /^[0-9\b]+$/
        const newValueNoComma = newValue.replace(new RegExp(',', 'g'), '') || ''
        if (newValue === '' || new RegExp(numberOnlyRegex).test(newValueNoComma)) {
            if (newValue === '' && option === 'commaNotRequired') {
                setValue(fieldName, newValue)
                return
            }
            const formattedValue = option.includes('comma') ? fNumber(newValueNoComma) : newValueNoComma
            setValue(fieldName, formattedValue)
            if (isSubmitted) trigger()
            setTimeout(() => {
                //set text cursor at same position after setValue
                const typingIndexFromStart = formattedValue.length + typingIndexFromEnd;
                e.target.setSelectionRange(typingIndexFromStart, typingIndexFromStart)
            }, 0)
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                    <Stack spacing={3}>
                        <RHFTextField
                            name="descriptions"
                            label={isRequire(constant.descriptions)}
                            inputProps={{ maxLength: 100 }}
                        />
                        <RHFTextField
                            name="cost"
                            label={constant.cost}
                            onChange={(e) => handleChangeNumber(e, 'cost', 'commaNotRequired')}
                            inputProps={{ maxLength: 20 }}
                        />
                        <Controller
                            name="date"
                            control={control}
                            defaultValue={''}
                            render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                    inputFormat="dd MMM yyyy"
                                    label={constant.date}
                                    value={field.value || null}
                                    onChange={(newValue) => {
                                        field.onChange(newValue)
                                    }}
                                    disableMaskedInput
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!error}
                                            helperText={error?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                        />
                        <Stack spacing={1.5}>
                            <Controller
                                key={`maintenanceFiles`}
                                name={`maintenanceFiles`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        {field.value.map((file, i) => {
                                            const fileName = get(file, 'name', file)
                                            return (
                                                <div
                                                    key={`file-${fileName}`}
                                                    onClick={(e) =>
                                                        props.isEditing && handleDownload(e, file)
                                                    }
                                                >
                                                    <MultiFilePreview
                                                        files={[file]}
                                                        onRemove={handleRemove}
                                                        key={`file-prev-${fileName}`}
                                                        sx={{
                                                            marginY: 0,
                                                            borderRadius: 1,
                                                            ...(props.isEditing
                                                                ? {
                                                                    cursor: 'pointer',
                                                                    color: (theme) =>
                                                                        theme.palette.info.main,
                                                                    borderColor: (theme) =>
                                                                        alpha(
                                                                            theme.palette.info.main,
                                                                            0.32
                                                                        ),
                                                                    span: {
                                                                        color: (theme) =>
                                                                            theme.palette.info.main,
                                                                      },
                                                                } : {}),
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                        <RejectionFiles fileRejections={fileRejections} />
                                    </>
                                )}
                            />
                            {watchMaintenanceFiles.length < maxFileLength ? (
                                <div {...getRootProps()} style={{ width: 'fit-content' }}>
                                    <input {...getInputProps()} />
                                    <LoadingButton
                                        type="button"
                                        variant="contained"
                                        color="inherit"
                                    >
                                        {constant.attachMaintenanceFile}
                                    </LoadingButton>
                                </div>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Stack>
                </Paper>
                <Stack flexDirection="row" justifyContent="right" gap={2}>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={props.onCancel}
                        color="inherit"
                    >
                        {props.isEditing ? constant.reset : constant.cancel}
                    </LoadingButton>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        // loading={authenticationStore.isFetching}
                    >
                        {props.isEditing
                            ? constant.updateMaintenanceLog
                            : constant.createMaintenanceLog}
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default MaintenanceLogForm
