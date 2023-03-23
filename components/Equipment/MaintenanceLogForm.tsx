import { useCallback, useEffect } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Alert,
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
    errorMsg: string
    defaultValue?: IMaintenanceLogFormValuesProps
    isEditing?: boolean
}
function MaintenanceLogForm(props: MaintenanceLogFormProps) {
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

    const { handleSubmit, setValue, control, watch, reset } = methods

    useEffect(() => {
        reset(props.defaultValue)
    }, [props.defaultValue])

    useEffect(() => {
        if (props.errorMsg !== '') window.scrollTo(0, 0)
    }, [props.errorMsg])

    const watchMaintenanceFiles = watch('maintenanceFiles')

    const onSubmit = async (data: IMaintenanceLogFormValuesProps) => {
        const submitData = cloneDeep(data)
        props.onSubmit(submitData)
    }

    const isRequire = (label: string, isRequire: boolean = true) => {
        return `${label} ${isRequire ? '*' : ''}`
    }

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const images = watchMaintenanceFiles || []

            setValue('maintenanceFiles', [
                ...images,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            ])
        },
        [setValue, watchMaintenanceFiles]
    )

    const handleRemove = (file: File | string) => {
        const filteredItems =
            watchMaintenanceFiles && watchMaintenanceFiles?.filter((_file) => _file !== file)

        setValue('maintenanceFiles', filteredItems)
    }

    const handleDownload = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        img: CustomFile | string
    ) => {
        const eventTargetTag = String(get(e.target, 'tagName', ''))
        if (eventTargetTag === 'BUTTON' || eventTargetTag === 'svg') return

        const link = document.createElement('a')
        link.download = get(img, 'name', '')
        link.href = get(img, 'preview', '')
        link.click()
        console.log('download', img)
    }

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop: handleDrop,
        multiple: true,
    })

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                {!!props.errorMsg && <Alert severity="error">{props.errorMsg}</Alert>}
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
                            inputProps={{ maxLength: 100 }}
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
                                        {field.value.map((img) => {
                                            return (
                                                <div
                                                    key={`file-${get(img, 'name', img)}`}
                                                    onClick={(e) =>
                                                        props.isEditing && handleDownload(e, img)
                                                    }
                                                >
                                                    <MultiFilePreview
                                                        files={[img]}
                                                        onRemove={handleRemove}
                                                        sx={{
                                                            marginY: 0,
                                                            borderRadius: 1,
                                                            ...(props.isEditing
                                                                ? {
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
                            <div {...getRootProps()} style={{ width: 'fit-content' }}>
                                <input {...getInputProps()} />
                                <LoadingButton type="button" variant="contained" color="inherit">
                                    {constant.attachMaintenanceFile}
                                </LoadingButton>
                            </div>
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
