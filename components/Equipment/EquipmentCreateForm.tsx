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
export interface IAccountFormValuesProps {
    EquipmentName: any,
    EquipmentStatus: any,
    accountExpiryDate: null,
    accountStatus: string,
    address: string,
    avatar: string,
    bookingLimit: string,
    companyName: string,
    creditLimit: string,
    department: string,
    email: string,
    firstName: string,
    idImages: [],
    items: [],
    otherTitle: string,
    password: string,
    phoneNumber: string,
    position: string,
    positionName: string,
    privillege: string,
    staffId: string,
    studentId: string,
    supervisorCode: string,
    supervisorStatus: null,
    surName: string,
    title: string,
    totalPrice: any,
    typeOfPerson: string,
    universityName: string,
    subs:boolean
}
const constant = {
    createEquipments: 'Create Equipments',
    cancel: 'Cancel',
    privillege: 'Privillege',
    accountStatus: 'Account Status',
    accountExpiryDate: 'Account expiry date',
    email: 'Email',
    password: 'Password',
    passwordPlaceholder: '********** (Auto Generated)',
    typeOfPerson: 'Type of person',
    department: 'Department',
    governmentName: 'Government name',
    universityName: 'University name',
    companyName: 'Company name',
    position: 'Position',
    studentId: 'StudentId',
    staffId: 'Staff ID',
    positionName: 'Position name',
    title: 'Title',
    otherTitle: 'Other title',
    firstName: 'Firstname',
    surName: 'Surname',
    address: 'Address',
    phoneNumber: 'Phone number',
    studentIdImage: 'Student/Staff ID Image',
    citizenIdImage: 'Citizen ID Image',
    creditLimit: 'Credit limit',
    bookingLimit: 'Booking limit',
    supervisorDetail: 'Supervisor/Advisor Detail',
    enterSupervisorCode: 'Please enter the code form supervisor associated with your account here.',
    supervisorCode: 'Supervisor code',
    supervisorNotFound: 'Supervisor code not found, please contact your supervisor for code',

    updateAccount: 'Update Account',
    reset: 'Reset',
    waitSupervisorApprove: 'Please wait for supervisor approve.',
    approve: 'Approve',
}

const department = [
    {
        value: 'Dept. of Applied Radiation and Isotope',
        label: 'Dept. of Applied Radiation and Isotope',
    },
    { value: 'Dept. of Biochemistry', label: 'Dept. of Biochemistry' },
    { value: 'Dept. of Botany', label: 'Dept. of Botany' },
    { value: 'Dept. of Chemistry', label: 'Dept. of Chemistry' },
    { value: 'Dept. of Computer Science', label: 'Dept. of Computer Science' },
    { value: 'Dept. of Earth Sciences', label: 'Dept. of Earth Sciences' },
    { value: 'Dept. of Genetics', label: 'Dept. of Genetics' },
    { value: 'Dept. of Material Science', label: 'Dept. of Material Science' },
    { value: 'Dept. of Mathematics', label: 'Dept. of Mathematics' },
    { value: 'Dept. of Microbiology', label: 'Dept. of Microbiology' },
    { value: 'Dept. of Physics', label: 'Dept. of Physics' },
    { value: 'Dept. of Statustics', label: 'Dept. of Statustics' },
    { value: 'Dept. of Zoology', label: 'Dept. of Zoology' },
]

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
    onSubmit: (data: IAccountFormValuesProps) => void
    onCancel: () => void
    updateMode?: boolean
    permission?: PERMISSION
    errorMsg: string
}

function EquipmentCreateForm(props: AccountFormProps) {
    // const { currentTab, setCurrentTab } = useState('general');
    const [supervisor, setSupervisor] = useState<ISupervisor | null>()
    const [supervisorTimeout, setSupervisorTimeout] = useState<NodeJS.Timeout>()

    const checkIsKuPerson = (typeOfPerson: string) =>
        ['KU Student & Staff', 'SciKU Student & Staff'].includes(typeOfPerson)
    const checkIsStudent = (position: string) => position.includes('student')
    const checkIsStaff = (position: string) => ['Lecturer', 'Researcher'].includes(position)
    const checkIsKuStudent = (position: string, typeOfPerson: string) =>
        checkIsKuPerson(typeOfPerson) && checkIsStudent(position)
    const checkIsOther = (check: string) => check === 'Other'
    const checkIsUser = (privillege: string) => privillege === 'User'
    const checkIsFinance = (privillege: string) => privillege === 'Finance'
    const checkIsAdmin = (privillege: string) => privillege === 'Admin'
    const checkIsSupervisor = (privillege: string) => privillege === 'Supervisor'
    const kuStudentEmailRegex = /@ku\.ac\.th$|@ku\.th$/
    const numberOnlyRegex = /^[0-9\b]+$/
    const permissionUser = 'Supervisor'
    const [currentTab, setCurrentTab] = useState('SciKUStudentAndStaff')

    const RegisterSchema = Yup.object().shape({
        privillege: Yup.string().required('Privillege is require'),
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required')
            .when(['position', 'typeOfPerson', 'privillege'], {
                is: (position, typeOfPerson, privillege) =>
                    (checkIsKuStudent(position, typeOfPerson) ||
                        checkIsAdmin(privillege) ||
                        checkIsFinance(privillege)) &&
                    !checkIsSupervisor(privillege),
                then: Yup.string().test({
                    name: 'email',
                    message: 'KU student/staff must be @ku.ac.th or @ku.th',
                    test: (email) => new RegExp(kuStudentEmailRegex).test(email),
                }),
            }),
        password: Yup.string(),
        accountStatus: Yup.string().required('Account Status is require'),
        accountExpiryDate: Yup.date()
            .typeError('Expected date format is dd/mmm/yyyy. Example: "1 jan 1970".')
            .nullable()
            .test({
                name: 'accountExpiryDate',
                message: "Account expiry date must be greater than today's date",
                test: (date) => {
                    const datePlusOne = new Date()
                    datePlusOne.setDate(datePlusOne.getDate() + 1)
                    datePlusOne.setHours(0, 0, 0, 0)
                    return date === null || date.getTime() >= datePlusOne.getTime()
                },
            }),
        avatar: Yup.string(),
        typeOfPerson: Yup.string().required('Type of person is require'),
        department: Yup.string()
            .nullable()
            .when('typeOfPerson', {
                is: (position) => checkIsKuPerson(position) || position === '',
                then: Yup.string().nullable().required('Department is require'),
            }),
        universityName: Yup.string().when('typeOfPerson', {
            is: 'Other University',
            then: Yup.string().required('University name is require'),
        }),
        governmentName: Yup.string().when('typeOfPerson', {
            is: 'Government office',
            then: Yup.string().required('Government name is require'),
        }),
        companyName: Yup.string().when('typeOfPerson', {
            is: 'Private company',
            then: Yup.string().required('Company name is require'),
        }),
        position: Yup.string()
            .required('Position is require')
            .when('privillege', {
                is: (privillege) => checkIsFinance(privillege),
                then: Yup.string(),
            }),
        studentId: Yup.string().when(['position', 'typeOfPerson'], {
            is: (position, typeOfPerson) => checkIsKuStudent(position, typeOfPerson),
            then: Yup.string().required('Student ID is required'),
        }),
        staffId: Yup.string(),
        positionName: Yup.string().when(['position', 'privillege'], {
            is: (position, privillege) => checkIsOther(position) && !checkIsFinance(privillege),
            then: Yup.string().required('Position is require'),
        }),
        title: Yup.string().required('Title is require'),
        otherTitle: Yup.string().when('title', {
            is: (title) => title === 'Other' || title === '',
            then: Yup.string().required('Other title is require'),
        }),
        firstName: Yup.string().required('Firstname is require'),
        surName: Yup.string().required('Surname is require'),
        phoneNumber: Yup.string()
            .required('Phone number is require')
            .test({
                name: 'phoneNumber',
                message: 'Phone number must be numbers',
                test: (phone) => new RegExp(numberOnlyRegex).test(phone),
            })
            .test({
                name: 'phoneNumber',
                message: "Phone number must start with '0'",
                test: (phone) => phone[0] === '0',
            })
            .length(10, 'Phone number must be 10 digits'),
        idImages: Yup.array(Yup.string()),
        creditLimit: Yup.string().required('Credit limit is require'),
        bookingLimit: Yup.string().required('Booking limit is require'),
        //TODO: CHeck supervisorcode เพิ่มตอน api มา
        supervisorCode: Yup.string().when(['position', 'typeOfPerson', 'privillege'], {
            is: (position, typeOfPerson, privillege) =>
                checkIsKuStudent(position, typeOfPerson) && checkIsUser(privillege),
            then: Yup.string()
                .required('Supervisor code is require, please contact your supervisor for code')
                .test({
                    name: 'supervisorCode',
                    message: constant.supervisorNotFound,
                    test: (_, ctx) => ctx.parent.supervisorStatus !== 'notFound',
                })
                .test({
                    name: 'supervisorCode',
                    message: '',
                    test: (_, ctx) => ctx.parent.supervisorStatus === 'found',
                }),
        }),
    })

    const defaultValues = {
        EquipmentName: undefined,
        EquipmentStatus: undefined,
        accountExpiryDate: null,
        accountStatus: "Active",
        address: "",
        avatar: "",
        bookingLimit: "5",
        companyName: "",
        creditLimit: "15,000",
        department: "",
        email: "",
        firstName: "",
        idImages: [],
        items: [{EquipmentName: undefined,
            EquipmentStatus: undefined,
            accountExpiryDate: null,
            accountStatus: "Active",
            address: "",
            avatar: "",
            bookingLimit: "5",
            companyName: "",
            creditLimit: "15,000",
            department: "",
            email: "",
            firstName: "",
            idImages: [],
            items: [],
            otherTitle: "",
            password: "",
            phoneNumber: "",
            position: "",
            positionName: "",
            privillege: "User",
            staffId: "",
            studentId: "",
            supervisorCode: "",
            supervisorStatus: null,
            surName: "",
            title: "",
            totalPrice: NaN,
            typeOfPerson: "",
            universityName: "",
            subs:false}],
        otherTitle: "",
        password: "",
        phoneNumber: "",
        position: "",
        positionName: "",
        privillege: "User",
        staffId: "",
        studentId: "",
        supervisorCode: "",
        supervisorStatus: null,
        surName: "",
        title: "",
        totalPrice: NaN,
        typeOfPerson: "",
        universityName: "",
        subs:false
    }

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
            value: 'SciKUStudentAndStaff',
            label: 'SciKU Student & Staff',
            // component: <PriceListNewEditDetails />,
        },
        KUStudentAndStaff: {
            value: 'KUStudentAndStaff',
            label: 'KUStudent & Staff',
            // component: <PriceListNewEditDetails />,
        },
        OtherUniversity: {
            value: 'Other University',
            label: 'Other University',
            // component: <PriceListNewEditDetails />,
        },
        GovernmentOffice: {
            value: 'Government Office',
            label: 'Government Office',
            // component: <PriceListNewEditDetails />,
        },
        privateCompany: {
            value: 'Private-Company',
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
    const methods = useForm({defaultValues})

    const {
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitted },
        control,
        watch,
        trigger,
    } = methods

    const [
        watchIdImages,
        watchTypeOfPerson,
        watchPosition,
        watchTitle,
        watchSupervisorCode,
        watchSupervisorStatus,
        watchPrivillege,
    ] = watch([
        'idImages',
        'typeOfPerson',
        'position',
        'title',
        'supervisorCode',
        'supervisorStatus',
        'privillege',
    ])

    useEffect(() => {
        if (props.permission && props.permission === 'User') {
            fetchSupervisorData('123456')
        }
        clearTimeout(supervisorTimeout)
        setValue('supervisorStatus', 'waiting')
        setSupervisorTimeout(
            setTimeout(() => {
                fetchSupervisorData(watchSupervisorCode)
            }, 500)
        )
    }, [watchSupervisorCode])

    useEffect(() => {
        if (isSubmitted) trigger()
        if (getValues('typeOfPerson') === 'SciKU Student & Staff') {
            if (isPositionOther) setValue('position', '')
            if (!department.map((d) => d.value).includes(getValues('department')))
                setValue('department', '')
        }
        if (isFinance) {
            if (getValues('typeOfPerson') !== 'KU Student & Staff') setValue('typeOfPerson', '')
            //ตอนปรับ privillege เป็น finance
            //ถ้าไม่ได้เลือก KU Student & Staff อยู่จะให้กลับไปเป็นค่าว่าง
        }
    }, [watchTypeOfPerson, watchPosition, watchPrivillege])

    useEffect(() => {
        if (props.errorMsg !== '') window.scrollTo(0, 0)
    }, [props.errorMsg])

    const isKu = checkIsKuPerson(watchTypeOfPerson)
    const isStudent = checkIsStudent(watchPosition)
    const isStaff = checkIsStaff(watchPosition)
    const isKuStudent = checkIsKuStudent(watchPosition, watchTypeOfPerson)
    const isPositionOther = checkIsOther(watchPosition)
    const isTitleOther = checkIsOther(watchTitle)
    const isUser = checkIsUser(watchPrivillege)
    const isFinance = checkIsFinance(watchPrivillege)

    const fetchSupervisorData = async (code: string) => {
        setValue('supervisorStatus', null)
        if (!code) return
        if (code.length < 6) return
        try {
            setValue('supervisorStatus', 'fetching')
            const response = await fetchGetSupervisor(code)
            if (response.code === 200) {
                setValue('supervisorStatus', 'found')
                setSupervisor(response.data)
            } else {
                setSupervisor(null)
                setValue('supervisorStatus', 'notFound')
            }
        } catch (error) {
            console.log(error)
            setValue('supervisorStatus', null)
        }
        trigger('supervisorCode')
    }

    const onSubmit = async (data: IAccountFormValuesProps) => {
        const submitData = cloneDeep(data)
        if (checkIsFinance(submitData.privillege)) {
            submitData.creditLimit = '0'
            submitData.bookingLimit = '0'
        }
        props.onSubmit(submitData)
    }
    const values = watch()

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const files = values.idImages || []

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )

            setValue('idImages', [...files ,...newFiles] )
        },
        [setValue, values.idImages]
    )

    const handleRemoveFile = (inputFile: File | string) => {
        const filtered = values.idImages && values.idImages?.filter((file) => file !== inputFile)
        setValue('idImages', filtered)
    }

    const handleRemoveAllFiles = () => {
        setValue('idImages', [])
    }
    const handleChangeNumber = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: keyof IAccountFormValuesProps,
        option?: 'comma'
    ) => {
        const typingIndexFromEnd = e.target.selectionStart - e.target.value.length
        const oldValue = getValues(fieldName)
        let newValue = e.target.value
        if (option === 'comma') {
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
        const newValueNoComma = newValue.replace(new RegExp(',', 'g'), '') || ''
        if (newValue === '' || new RegExp(numberOnlyRegex).test(newValueNoComma)) {
            const formattedValue = option === 'comma' ? fNumber(newValueNoComma) : newValueNoComma
            setValue(fieldName, formattedValue)
            if (isSubmitted) trigger()
            setTimeout(() => {
                //set text cursor at same position after setValue
                const typingIndexFromStart = formattedValue.length + typingIndexFromEnd
                e.target.setSelectionRange(typingIndexFromStart, typingIndexFromStart)
            }, 0)
        }
    }

    const idImageWithoutEmpty = watchIdImages.filter((idImage) => idImage)
    const idImageLength = clamp(idImageWithoutEmpty.length + 1, 1, 2)

    const isRequire = (label: string, isRequire: boolean = true) => {
        return `${label} ${isRequire ? '*' : ''}`
    }

    const collapseableInputStyle = (isShow: boolean) => ({
        flex: isShow ? '100%' : '0%',
        transform: `scaleZ(${isShow ? '1' : '0'})`,
        transitionDuration: '.2s',
        transformOrigin: 'right',
        marginLeft: isShow ? 3 : -3,
        '& > div': {
            transitionDuration: '.2s',
            opacity: isShow ? 1 : 0,
        },
    })

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                {!!props.errorMsg && <Alert severity="error">{props.errorMsg}</Alert>}
                <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
                    <Stack spacing={3}>
                        {/* <Box sx={{width:'50%'}}> */}
                        <Stack gap={3} flexDirection="row" width={{md:'48.9%', sm:'48.7%',xs:'47.9%'}}>
                            <RHFSelect
                                name="EquipmentStatus"
                                label={isRequire('EquipmentStatus')}
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
                                name="Equipment name"
                                key={'equipmentName-textfield'}
                                label={'Equipment name *'}
                                inputProps={{ maxLength: 100 ,minLength:6}}
                            />{' '}
                            <RHFTextField
                                name="codeName"
                                key={'codeName-textfield'}
                                label={isRequire('Equipment code name')}
                                inputProps={{ maxLength: 100 ,minLength:2}}
                            />
                        </Stack>
                        <Stack gap={3} flexDirection="row">
                            <RHFSelect
                                name="Brand"
                                label={('Brand')}
                                InputLabelProps={{ shrink: true }}
                                placeholder={'Brand'}
                            >
                                {accountStatus.map(({ value, label }) => (
                                    <option value={value} key={`${value}-accountStatus-option`}>
                                        {label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField
                                name="Model"
                                key={'Model-textfield'}
                                label={('Model')}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Stack>
                        <RHFTextField
                            name="Description"
                            multiline
                            label={('Description')}
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
                        files={values.idImages}
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
                                <LoadingButton type="submit" variant="contained" size="small">
                                    Available
                                </LoadingButton>
                                <LoadingButton type="submit" variant="outlined" size="small">
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
                            <LoadingButton type="submit" variant="outlined" size="large" fullWidth>
                                Sunday
                            </LoadingButton>
                            <LoadingButton type="submit" variant="contained" size="large" fullWidth>
                                Monday
                            </LoadingButton>
                            <LoadingButton type="submit" variant="contained" size="large" fullWidth>
                                Tuesday
                            </LoadingButton>
                            <LoadingButton type="submit" variant="contained" size="large" fullWidth>
                                Wednesday
                            </LoadingButton>
                            <LoadingButton type="submit" variant="contained" size="large" fullWidth>
                                Thursday
                            </LoadingButton>
                            <LoadingButton type="submit" variant="contained" size="large" fullWidth>
                                Friday
                            </LoadingButton>
                            <LoadingButton type="submit" variant="outlined" size="large" fullWidth>
                                Saturday
                            </LoadingButton>
                        </Stack>
                    </Stack>

                    <Stack sx={{ mt: 3 }}>
                        <Stack flexDirection="row" justifyContent="space-between">
                            <Typography>Available times</Typography>
                            <Stack flexDirection="row" gap={2}>
                                <LoadingButton type="submit" variant="contained" size="small">
                                    Available
                                </LoadingButton>
                                <LoadingButton type="submit" variant="outlined" size="small">
                                    Unavailable
                                </LoadingButton>
                            </Stack>
                        </Stack>

                        <Stack justifyContent="space-between" gap={2} sx={{ mt: 2 }}>
                            <Stack flexDirection="row" justifyContent={'space-between'} gap={2}>
                                {' '}
                                <LoadingButton
                                    type="submit"
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                >
                                    07:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    08:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    09:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    10:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    11:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    12:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    13:00
                                </LoadingButton>
                            </Stack>
                            <Stack flexDirection="row" justifyContent={'space-between'} gap={2}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    14:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    15:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    16:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    17:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    18:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    19:00
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                >
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
                        onChange={(event, newValue) => setCurrentTab(newValue)}
                    >
                        {get(listPermissionTab, permissionTab(), []).map((tab) => (
                            <Tab
                                key={tab.value}
                                label={tab.label}
                                icon={tab.icon}
                                value={tab.value}
                            />
                        ))}
                    </Tabs>
                    <PriceListNewEditDetails />
                    {/* {get(listPermissionTab, permissionTab(), []).map(
                        (tab) =>
                            tab.value === currentTab && (
                                <Box key={tab.value} sx={{ mt: 5 }}>
                                    {tab.component}
                                </Box>
                            )
                    )} */}
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
