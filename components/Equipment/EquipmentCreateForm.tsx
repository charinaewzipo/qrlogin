import { ChangeEvent, useEffect, useState, useCallback } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import Iconify from '@sentry/components/iconify'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Alert,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
    TextField,
    CircularProgress,
    FormHelperText,
    Autocomplete,
    Box,
    Paper,
    Button,
    Tabs,
    Tab,
} from '@mui/material'
import Image from '@sentry/components/image'
import FormProvider, { RHFSelect, RHFTextField, RHFUpload } from '@sentry/components/hook-form'
import { Upload } from '@sentry/components/upload'
import { fNumber } from '@sentry/utils/formatNumber'
import { clamp, cloneDeep, get } from 'lodash'
import { fetchGetSupervisor } from '@ku/services/supervisor'
import PriceListNewEditDetails from './priceListInEquipmentCreate/priceList'
export interface IEquipmentCreateFormValuesProps {
    eqStatus: string
    eqCode: String
    eqName: string
    eqBrand: String
    eqModel: String
    eqDescription: String
    eqPicture: Array<IV1EquipmentPicture>
    eqavascheDays: Array<String>
    eqavascheTimes: Array<Number>
    eqtypeperson: Array<IV1EquipmentTypePerson>
}
export interface IV1EquipmentPicture {
    eqpicLink: string
    eqpicSort: number
}

export interface IV1EquipmentTypePerson {
    eqpscheTypePerson: string
    eqsches: Array<IV1EquipmentSchemaPrice>
}

export interface IV1EquipmentSchemaPrice {
    eqpscheSubOption: string | null
    eqpscheChecked: string
    eqpscheName: string
    eqpscheDescription: string | null
    eqpscheUnitPrice: number| any
    eqpscheUnitPer: string | null
    eqsubsches: Array<IV1EquipmentSubSchemaPrice> | null
}

export interface IV1EquipmentSubSchemaPrice {
    eqsubpscheChecked: string
    eqsubpscheName: string
    eqsubpscheDescription: string | null
    eqsubpscheUnitPrice: number | any
    eqsubpscheUnitPer: string
}

const constant = {
    createEquipments: 'Create Equipments',
    cancel: 'Cancel',
}

const accountStatus = [
    // { value: 'Active', label: 'Create' },
]
const EquipmentStatus = [
    { value: 'Available', label: 'Available' },
    { value: 'Unavailable', label: 'Unavailable' },
    { value: 'Temporary Unavailable', label: 'Temporary Unavailable' },
]

declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
interface AccountFormProps {
    onSubmit: (data: IEquipmentCreateFormValuesProps) => void
    onCancel: () => void
    updateMode?: boolean
    permission?: PERMISSION
    errorMsg: string
}

function EquipmentCreateForm(props: AccountFormProps) {
    const numberOnlyRegex = /^[0-9\b]+$/
    const permissionUser = 'Supervisor'
    const [currentTab, setCurrentTab] = useState('SCIKU_STUDENT_STAFF')


    const handleChangeTabAndTakeFormValueToTempState =()=>{
        console.log('do Func')
    }

    const RegisterSchema = Yup.object().shape({
        // equipmentStatus: Yup.string().required('Equipment status is require'),
        eqName: Yup.string().required('Equipment name is require'),
        eqCode: Yup.string().required('Equipment code name is require'),
        // equipmentImage: Yup.string().required('Equipment image is require at least 1 image'),
    })

    const defaultValues = {
        eqStatus: 'Available',
        eqCode: '',
        eqName: '',
        eqBrand: '',
        eqModel: '',
        eqDescription: '',
        eqPicture: [],
        eqavascheDays: [],
        eqavascheTimes: [],
        eqtypeperson: [
            {
                eqpscheTypePerson: 'KEY',
                eqsches: [
                    {
                        eqpscheSubOption: '',
                        eqpscheChecked: 'Fixed',
                        eqpscheName: '',
                        eqpscheDescription: '',
                        eqpscheUnitPrice: {SCIKU_STUDENT_STAFF: '' , 
                                            KU_STUDENT_STAFF:'' ,OTHER_UNIVERSITY:'',
                                                GOVN_OFFICE:'',PRIVATE_COMPANY:''}, 
                        eqpscheUnitPer: 'Baht/Hour',
                        eqsubsches: [
                        ],
                    },
                    
                    
                    
                ],
            },
          
        ],
    }
    const [temp,setTemp] = useState([
            // {
            //     eqpscheSubOption: '',
            //     eqpscheChecked: 'Fixed',
            //     eqpscheName: '',
            //     eqpscheDescription: '',
            //     eqpscheUnitPrice: {SCIKU_STUDENT_STAFF: '' , 
            //                         KU_STUDENT_STAFF:'' ,OTHER_UNIVERSITY:'',
            //                         GOVN_OFFICE:'',PRIVATE_COMPANY:''},
            //     eqpscheUnitPer: 'Baht/Hour',
            //     eqsubsches: [
            //     ],
            // },
        ]
    )

    const [disableOtherTab,setSisableOtherTab] = useState(false)


    // const handleCheckIsEmptyNameAndUnitPrice = ()=>{
    //     console.log('handleCheckIsEmptyNameAndUnitPrice')
    //     if(get(values,`eqtypeperson[0].eqsches[0].eqpscheUnitPrice.${currentTab}`, '') === '' && values.eqtypeperson[0].eqsches[0].eqpscheName === ''){
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }

    useEffect(() => {
        console.log('state temp เปลี่ยนนะ',temp)
    }, [temp])

    const onFormSubmit = () => {
        //TODO: api submit
        // enqueueSnackbar('Account saved.');
        console.log('submit')
    }

    const onFormCancel = () => {
        //TODO: cancel form
        console.log('canncel')
    }

    const permissionMe: PERMISSION = 'Admin'

    const listAllTab = {
        SciKUStudentAndStaff: {
            value: 'SCIKU_STUDENT_STAFF',
            label: 'SciKU Student & Staff',
            // component: <PriceListNewEditDetails />,
        },
        KUStudentAndStaff: {
            value: 'KU_STUDENT_STAFF',
            label: 'KUStudent & Staff',
            // component: <PriceListNewEditDetails />,
        },
        OtherUniversity: {
            value: 'OTHER_UNIVERSITY',
            label: 'Other University',
            // component: <PriceListNewEditDetails />,
        },
        GovernmentOffice: {
            value: 'GOVN_OFFICE',
            label: 'Government Office',
            // component: <PriceListNewEditDetails />,
        },
        privateCompany: {
            value: 'PRIVATE_COMPANY',
            label: 'Private Company',
            // component: <PriceListNewEditDetails />,
        },
    }
    const permissionTab = (): PERMISSION => {
        if ((permissionMe as PERMISSION) === 'Supervisor') {
            return 'Admin'
        } else {
            return permissionUser
        }
    }
    const listPermissionTab: { [key in PERMISSION] } = {
        Supervisor: [
            listAllTab.SciKUStudentAndStaff,
            listAllTab.KUStudentAndStaff,
            listAllTab.OtherUniversity,
            listAllTab.GovernmentOffice,
            listAllTab.privateCompany,
        ],
        User: [
            listAllTab.SciKUStudentAndStaff,
            listAllTab.OtherUniversity,
            listAllTab.GovernmentOffice,
        ],
        Finance: [listAllTab.SciKUStudentAndStaff],
        Admin: [listAllTab.SciKUStudentAndStaff, listAllTab.OtherUniversity],
    }
    const methods = useForm({ resolver: yupResolver(RegisterSchema), defaultValues })

    const {
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitted },
        control,
        watch,
        trigger,
    } = methods

    useEffect(() => {
        if (props.errorMsg !== '') window.scrollTo(0, 0)
    }, [props.errorMsg])


   
    const onSubmit = async (data: IEquipmentCreateFormValuesProps) => {
        console.log('กดส่งละได้ค่า', data)
        const submitData = cloneDeep(data)

        props.onSubmit(submitData)
    }
    const values = watch()


    useEffect(()=>{
        if((values.eqtypeperson[0].eqsches[0].eqpscheName === '') || (get(values,`eqtypeperson[0].eqsches[0].eqpscheUnitPrice.${currentTab}`,'') === '' ))
        {
            setSisableOtherTab(true)
        }
        else{
            setSisableOtherTab(false)
        }
    },[values])

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const files = values.eqPicture || []

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )

            setValue('eqPicture', [...files, ...newFiles])
        },
        [setValue, values.eqPicture]
    )

    const handleRemoveFile = (inputFile: File | string) => {
        const filtered = values.eqPicture && values.eqPicture?.filter((file) => file !== inputFile)
        setValue('eqPicture', filtered)
    }

    const isRequire = (label: string, isRequire: boolean = true) => {
        return `${label} ${isRequire ? '*' : ''}`
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                {!!props.errorMsg && <Alert severity="error">{props.errorMsg}</Alert>}
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                    <Stack spacing={3}>
                        <Stack
                            gap={3}
                            flexDirection="row"
                            width={{ md: '48.9%', sm: '48.7%', xs: '47.9%' }}
                        >
                            <RHFSelect
                                name="eqStatus"
                                label={isRequire('Equipment status')}
                                InputLabelProps={{ shrink: true }}
                            >
                                {EquipmentStatus.map(({ value, label }) => (
                                    <option value={value} key={`${value}-EquipmentStatus-option`}>
                                        {label}
                                    </option>
                                ))}
                            </RHFSelect>
                        </Stack>

                        <Stack gap={3} flexDirection="row">
                            <RHFTextField
                                name="eqName"
                                key={'equipmentName-textfield'}
                                label={isRequire('Equipment name')}
                                inputProps={{ maxLength: 100, minLength: 6 }}
                            />{' '}
                            <RHFTextField
                                name="eqCode"
                                key={'eq-Code-textfield'}
                                label={isRequire('Equipment code name')}
                                inputProps={{ maxLength: 100, minLength: 2 }}
                            />
                        </Stack>
                        <Stack gap={3} flexDirection="row">
                            <RHFSelect name="eqBrand" label={'Brand'} placeholder={'Brand'}>
                                {accountStatus.map(({ value, label }) => (
                                    <option value={value} key={`${value}-accountStatus-option`}>
                                        {label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField
                                name="eqModel"
                                key={'Model-textfield'}
                                label={'Model'}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Stack>
                        <RHFTextField
                            name="eqDescription"
                            multiline
                            label={'Description'}
                            minRows={4}
                        />
                    </Stack>

                    <Typography sx={{ marginTop: 3 }}>Images</Typography>

                    <Upload
                        dropzoneHelper={
                            <Box sx={{ py: 3, pl: 5 }}>
                                <Typography gutterBottom variant="h5" sx={{ ml: -2 }}>
                                    Select image files
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    whiteSpace="pre-line"
                                    sx={{ ml: -2 }}
                                >
                                    Drop files here or click
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{
                                            mx: 0.5,
                                            color: 'primary.main',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {`browse`}
                                    </Typography>
                                    {`thorough your machine.\n`}
                                    {`Allowed *.jpeg, *.jpg, *.png\n`}
                                    {`Max size of 1024KB`}
                                </Typography>
                            </Box>
                        }
                        thumbnail
                        multiple={true}
                        files={values.eqPicture}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        // onDelete={() => field.onChange('')}
                    />
                </Paper>

                <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }}>
                    <Stack>
                        <Stack flexDirection="row" justifyContent="space-between">
                            <Typography>Available date of week</Typography>
                            <Stack flexDirection="row" gap={2}>
                                <LoadingButton variant="contained" size="small">
                                    Available
                                </LoadingButton>
                                <LoadingButton variant="outlined" size="small">
                                    Unavailable
                                </LoadingButton>
                            </Stack>
                        </Stack>

                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            gap={2}
                            sx={{ mt: 2 }}
                        >
                            <LoadingButton variant="outlined" size="large" fullWidth>
                                Sunday
                            </LoadingButton>
                            <LoadingButton variant="contained" size="large" fullWidth>
                                Monday
                            </LoadingButton>
                            <LoadingButton variant="contained" size="large" fullWidth>
                                Tuesday
                            </LoadingButton>
                            <LoadingButton variant="contained" size="large" fullWidth>
                                Wednesday
                            </LoadingButton>
                            <LoadingButton variant="contained" size="large" fullWidth>
                                Thursday
                            </LoadingButton>
                            <LoadingButton variant="contained" size="large" fullWidth>
                                Friday
                            </LoadingButton>
                            <LoadingButton variant="outlined" size="large" fullWidth>
                                Saturday
                            </LoadingButton>
                        </Stack>
                    </Stack>

                    <Stack sx={{ mt: 3 }}>
                        <Stack flexDirection="row" justifyContent="space-between">
                            <Typography>Available times</Typography>
                            <Stack flexDirection="row" gap={2}>
                                <LoadingButton variant="contained" size="small">
                                    Available
                                </LoadingButton>
                                <LoadingButton variant="outlined" size="small">
                                    Unavailable
                                </LoadingButton>
                            </Stack>
                        </Stack>

                        <Stack justifyContent="space-between" gap={2} sx={{ mt: 2 }}>
                            <Stack flexDirection="row" justifyContent={'space-between'} gap={2}>
                                {' '}
                                <LoadingButton variant="outlined" size="large" fullWidth>
                                    07:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    08:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    09:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    10:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    11:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    12:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    13:00
                                </LoadingButton>
                            </Stack>
                            <Stack flexDirection="row" justifyContent={'space-between'} gap={2}>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    14:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    15:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    16:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    17:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    18:00
                                </LoadingButton>
                                <LoadingButton variant="contained" size="large" fullWidth>
                                    19:00
                                </LoadingButton>
                                <LoadingButton variant="outlined" size="large" fullWidth>
                                    20:00
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>

                <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }}>
                    Price list
                    <Tabs
                        sx={{ padding: '12px' }}
                        value={currentTab}
                        onChange={(event, newValue) => {
                            console.log('event',event)
                            console.log('newValue',newValue)
                            console.log('values',values)
                            setTemp(values.eqtypeperson[0].eqsches)
                            if(values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.KU_STUDENT_STAFF === '' 
                            && values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.OTHER_UNIVERSITY === ''
                            && values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.GOVN_OFFICE === ''
                            && values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.PRIVATE_COMPANY === ''
                            ){
                                setValue(`eqtypeperson.0.eqsches.0.eqpscheUnitPrice.KU_STUDENT_STAFF`,values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.SCIKU_STUDENT_STAFF );
                                setValue(`eqtypeperson.0.eqsches.0.eqpscheUnitPrice.OTHER_UNIVERSITY`,values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.SCIKU_STUDENT_STAFF );
                                setValue(`eqtypeperson.0.eqsches.0.eqpscheUnitPrice.GOVN_OFFICE`,values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.SCIKU_STUDENT_STAFF );
                                setValue(`eqtypeperson.0.eqsches.0.eqpscheUnitPrice.PRIVATE_COMPANY`,values.eqtypeperson[0].eqsches[0].eqpscheUnitPrice.SCIKU_STUDENT_STAFF );
                            }
                            console.log('temp',temp)
                            setCurrentTab(newValue)
                        }}
                    >
                        {get(listPermissionTab, permissionTab(), []).map((tab) => (
                            <Tab
                                disabled={disableOtherTab ? tab.value !== currentTab ? true : false : false}
                                key={tab.value}
                                label={tab.label}
                                icon={tab.icon}
                                value={tab.value}
                            />
                        ))}
                    </Tabs>
                   
                    {get(listPermissionTab, permissionTab(), []).map(
                        (tab) =>
                            tab.value === currentTab && (
                                <Box key={tab.value} sx={{ mt: 5 }}>
                                     <PriceListNewEditDetails currentTab={currentTab} />
                                </Box>
                            )
                    )}
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
                        {constant.createEquipments}
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default EquipmentCreateForm
