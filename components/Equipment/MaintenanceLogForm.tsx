import { useCallback } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Alert,
    Stack,
    TextField,
    Paper,
} from '@mui/material'
import FormProvider, { RHFTextField } from '@sentry/components/hook-form'
import { CustomFile, RejectionFiles, Upload } from '@sentry/components/upload'
import { cloneDeep } from 'lodash'
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
}
interface MaintenanceLogFormProps {
    onSubmit: (data: IMaintenanceLogFormValuesProps) => void
    onCancel: () => void
    errorMsg: string
}
function MaintenanceLogForm(props: MaintenanceLogFormProps) {
    const MaintenanceLogSchema = Yup.object().shape({
        descriptions: Yup.string().required('Descriptions is require'),
        cost: Yup.string(),
        date: Yup.date()
            .typeError('Expected date format is dd/mmm/yyyy. Example: "1 jan 1970".')
            .nullable()
            .test({
                name: 'Date',
                message: "Date must be greater than today's date",
                test: (date) => {
                    const datePlusOne = new Date()
                    datePlusOne.setDate(datePlusOne.getDate() + 1)
                    datePlusOne.setHours(0, 0, 0, 0)
                    return date === null || date.getTime() >= datePlusOne.getTime()
                },
            }),
        maintenanceFiles: Yup.array(Yup.string()),
    })

    const defaultValues = {
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
    } = methods

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
        const images = watchMaintenanceFiles || [];
  
        setValue('maintenanceFiles', [
          ...images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      },
      [setValue, watchMaintenanceFiles]
    )

    const handleRemoveAll = () => {
      setValue('maintenanceFiles', []);
    }
  
    const handleRemove = (file: File | string) => {
      const filteredItems = watchMaintenanceFiles && watchMaintenanceFiles?.filter((_file) => _file !== file);
  
      setValue('maintenanceFiles', filteredItems);
    }

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop: handleDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: true,
        maxSize: 200000,
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
                            label={isRequire(constant.cost)}
                            inputProps={{ maxLength: 100 }}
                        />
                        <Controller
                            name="date"
                            control={control}
                            defaultValue={''}
                            render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                    inputFormat="dd MMM yyyy"
                                    label={isRequire(constant.date)}
                                    value={field.value || null}
                                    onChange={(newValue) => {
                                        field.onChange(newValue)
                                    }}
                                    disableMaskedInput
                                    disablePast
                                    minDate={new Date().setDate(new Date().getDate() + 1)}
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
									<Upload
										accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
										files={field.value}
										multiple
										onDrop={handleDrop}
										onRemove={handleRemove}
										// onRemoveAll={handleRemoveAll}
										sx={{
											'& > div:first-child': {
												display: 'none',
											},
											'& > div:nth-child(2)': {
												marginTop: 1,
												marginBottom: 0,
												'& > div': {
													borderRadius: 1,
													marginBottom: 0,
												}
											},
										}}
										maxSize={200000}
									/>
            						<RejectionFiles fileRejections={fileRejections} />
									</>
								)}
							/>
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
                        {constant.cancel}
                    </LoadingButton>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        // loading={authenticationStore.isFetching}
                    >
                        {constant.createMaintenanceLog}
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default MaintenanceLogForm
