import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form'
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
} from '@mui/material'
import Image from '@sentry/components/image'
import FormProvider, { RHFSelect, RHFTextField } from '@sentry/components/hook-form'
import { Upload, UploadAvatar } from '@sentry/components/upload'
import { fData } from '@sentry/utils/formatNumber'
import { clamp, cloneDeep, get } from 'lodash'
import { DatePicker } from '@mui/x-date-pickers'
import { fetchGetSupervisor } from '@ku/services/supervisor'
import { NumberFormatCustom, NumberFormatCustomNoComma } from '@ku/utils/numberFormatCustom'
import { formatISO } from 'date-fns'
import numeral from 'numeral'
import transformer from '@ku/utils/transformer'

export interface IAccountFormValuesProps {
    privillege: TPermission
    email: string
    password: string
    accountStatus: TAccountStatus
    accountExpiryDate: string
    typeOfPerson: TTypeOfPerson
    avatar: string
    department: string
    universityName: string
    governmentName: string
    companyName: string
    position: string
    studentId: string
    staffId: string
    positionName: string
    title: string
    otherTitle: string
    firstName: string
    surName: string
    address: string
    phoneNumber: string
    idImages: string[]
    creditLimit: string
    bookingLimit: string
    supervisorCode: string
    supervisorStatus: 'found' | 'notFound' | 'waiting' | 'fetching'
}
const constant = {
    createAccount: 'Create Account',
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
    supervisorCode: 'Supervisor code (โค้ด mock รอ api คือ 123456)',
    supervisorNotFound: 'Supervisor code not found, please contact your supervisor for code',

    updateAccount:'Update Account',
    reset: 'Reset',
    waitSupervisorApprove: 'Please wait for supervisor approve.',
    approve: 'Approve',
}
const typeOfPerson = [
    { value: 'SCIKU_STUDENT_STAFF', label: 'SciKU Student & Staff' },
    { value: 'KU_STUDENT_STAFF', label: 'KU Student & Staff' },
    { value: 'OTHER_UNIVERSITY', label: 'Other University' },
    { value: 'GOVN_OFFICE', label: 'Government office' },
    { value: 'PRIVATE_COMPANY', label: 'Private company' },
]
const financeTypeOfPerson = typeOfPerson.filter((type) => type.value === 'KU_STUDENT_STAFF')
const position = [
    { value: 'Lecturer', label: 'Lecturer' },
    { value: 'Researcher', label: 'Researcher' },
    { value: 'Ph.D. student', label: 'Ph.D. student' },
    { value: 'Master student', label: 'Master student' },
    { value: 'Bachelor student', label: 'Bachelor student' },
    { value: 'Other', label: 'Other' },
]
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
const title = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
    { value: 'Asst.Prof', label: 'Asst.Prof' },
    { value: 'Assoc.Prof', label: 'Assoc.Prof' },
    { value: 'Prof', label: 'Prof' },
    { value: 'Other', label: 'Other' },
]
const accountStatus = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'LOCKED', label: 'Lock' },
]
const privillege = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'FINANCE', label: 'Finance' },
    { value: 'SUPERVISOR', label: 'Supervisor' },
    { value: 'USER', label: 'User' },
]
interface AccountFormProps {
    onSubmit: (data: IV1PostMemberCreate) => void
    onCancel: () => void
    updateMode? : boolean
    permission? : TPermission
    errorMsg: string
}
function AccountForm(props: AccountFormProps) {
    const [supervisor, setSupervisor] = useState<ISupervisor | null>()
    const [supervisorTimeout, setSupervisorTimeout] = useState<NodeJS.Timeout>();

    const checkIsKuPerson = (typeOfPerson: string) =>
        ['KU_STUDENT_STAFF', 'SCIKU_STUDENT_STAFF'].includes(typeOfPerson)
    const checkIsStudent = (position: string) => position.includes('student')
    const checkIsStaff = (position: string) => ['Lecturer', 'Researcher'].includes(position)
    const checkIsKuStudent = (position: string, typeOfPerson: string) =>
        checkIsKuPerson(typeOfPerson) && checkIsStudent(position)
    const checkIsKuStaff = (position: string, typeOfPerson: string) =>
        checkIsKuPerson(typeOfPerson) && checkIsStaff(position)
    const checkIsOther = (check: string) => check === 'Other'
    const checkIsUser = (privillege: TPermission) => privillege === 'USER'
    const checkIsFinance = (privillege: TPermission) => privillege === 'FINANCE'
    const checkIsAdmin = (privillege: TPermission) => privillege === 'ADMIN'
    const checkIsSupervisor = (privillege: TPermission) => privillege === 'SUPERVISOR'
    const kuStudentEmailRegex = /@ku\.ac\.th$|@ku\.th$/
    const numberOnlyRegex = /^[0-9\b]+$/

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
            .typeError('Expected date format is dd mmm yyyy. Example: "1 jan 1970".')
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
            is: 'OTHER_UNIVERSITY',
            then: Yup.string().required('University name is require'),
        }),
        governmentName: Yup.string().when('typeOfPerson', {
            is: 'GOVN_OFFICE',
            then: Yup.string().required('Government name is require'),
        }),
        companyName: Yup.string().when('typeOfPerson', {
            is: 'PRIVATE_COMPANY',
            then: Yup.string().required('Company name is require'),
        }),
        position: Yup.string()
            .when('privillege', {
                is: (privillege) => !checkIsFinance(privillege),
                then: Yup.string().required('Position is require'),
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
        address: Yup.string().required('Address is require'),
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
                })
        }),
    })

    const defaultValues: IAccountFormValuesProps = {
        privillege: 'USER',
        avatar: '',
        email: '',
        password: '',
        accountStatus: 'ACTIVE',
        accountExpiryDate: null,
        typeOfPerson: '',
        department: '',
        universityName: '',
        studentId: '',
        position: '',
        staffId: '',
        positionName: '',
        companyName: '',
        title: '',
        otherTitle: '',
        firstName: '',
        surName: '',
        address: '',
        phoneNumber: '',
        idImages: [''],
        creditLimit: '15,000',
        bookingLimit: '5',
        supervisorCode: '',
        supervisorStatus: null,
        governmentName: '',
    }

    const methods = useForm<IAccountFormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    })

    const {
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitted },
        control,
        watch,
        trigger
    } = methods

    const [
        watchIdImages,
        watchTypeOfPerson,
        watchPosition,
        watchTitle,
        watchSupervisorCode,
        watchSupervisorStatus,
        watchPrivillege
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
        if(props.permission && props.permission === 'USER'){
            fetchSupervisorData('123456')
        }
        clearTimeout(supervisorTimeout);
        setValue('supervisorStatus', 'waiting')
        setSupervisorTimeout(
            setTimeout(() => {
                fetchSupervisorData(watchSupervisorCode)
            }, 500)
        )
    }, [watchSupervisorCode])

    useEffect(() => {
        if (isSubmitted)
            trigger()
        if (getValues('typeOfPerson') === 'SCIKU_STUDENT_STAFF') {
            if (isPositionOther) setValue('position', '')
            if (!department.map((d) => d.value).includes(getValues('department')))
                setValue('department', '')
        }
        if (isFinance) {
            if (getValues('typeOfPerson') !== 'KU_STUDENT_STAFF') setValue('typeOfPerson', '')
            //ตอนปรับ privillege เป็น finance
            //ถ้าไม่ได้เลือก KU Student & Staff อยู่จะให้กลับไปเป็นค่าว่าง
        }
    }, [watchTypeOfPerson, watchPosition, watchPrivillege])

    useEffect(() => {
        if (props.errorMsg !== '')
            window.scrollTo(0, 0)
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
            setValue('supervisorStatus', null)
        }
        trigger('supervisorCode')
    }

    const transformDataToPostCreate = (data: IAccountFormValuesProps) => {
        const getTitleField = () => {
            if (checkIsOther(data.title)) {
                return data.otherTitle
            }
            return data.title
        }
        const getDepartmentField = () => {
            switch (data.typeOfPerson) {
                case 'GOVN_OFFICE':
                    return data.governmentName
                case 'PRIVATE_COMPANY':
                    return data.companyName
                case 'OTHER_UNIVERSITY':
                    return data.universityName
            
                default:
                    return data.department
            }
        }
        const getPositionField = () => {
            if (checkIsFinance(data.privillege)) {
                return null
            }
            if (checkIsOther(data.position)) {
                return data.positionName
            }
            return data.position
        }
        const getStudentIdField = () => {
            if (checkIsKuStudent(data.position, data.typeOfPerson)) {
                return data.studentId
            } else if (checkIsKuStaff(data.position, data.typeOfPerson)) {
                return data.staffId || null
            }
            return null
        }
        const getSupervisorCode = () => {
            if (checkIsKuStudent(data.position, data.typeOfPerson) && checkIsUser(data.privillege)) {
                return data.supervisorCode
            }
            return null
        }
        const getPasswordField = () => {
            if (data.password === '') {
                return transformer.random(10)
            }
            return data.password
        }
        const getExpiryDate = () => {
            return data.accountExpiryDate ? formatISO(new Date(data.accountExpiryDate)) : null
        }
        const getIdImages = () => {
            if (idImageWithoutEmpty.length) {
                return 'https://media-cdn.bnn.in.th/219215/MacBook_Pro_13-inch_Silver_2-square_medium.jpg'
            }
            return null
        }
        const getAvatar = () => {
            if (data.avatar !== '') {
                return 'https://media-cdn.bnn.in.th/219215/MacBook_Pro_13-inch_Silver_2-square_medium.jpg'
            }
            return null
        }
        
        //รอ Api รูป
        const formattedData: IV1PostMemberCreate = {
            uTitle: getTitleField(),
            uFirstname: data.firstName,
            uSurname: data.surName,
            uAddress: data.address,
            uPhoneNumber: data.phoneNumber,
            authEmail: data.email,
            authPassword: getPasswordField(),
            authAccountStatus: data.accountStatus,
            authPermission: data.privillege,
            uiTypePerson: data.typeOfPerson,
            uiDepartment: getDepartmentField(),
            uiCardPicture: getAvatar(),
            uiPersonPicture: getIdImages(),
            uiPosition: getPositionField(),
            uiAdvisorCode: getSupervisorCode(),
            uiStudentId: getStudentIdField(),
            uiCardExpireDate: getExpiryDate(),
            uiCreditLimit: numeral(data.creditLimit).value(),
            uiBookingLimit: numeral(data.bookingLimit).value(),
        }
        return formattedData
    }

    const onSubmit = async (data: IAccountFormValuesProps) => {
        const submitData = cloneDeep(data)
        if (checkIsFinance(submitData.privillege)) {
            submitData.creditLimit = '0'
            submitData.bookingLimit = '0'
        }
        const formattedSubmitData = transformDataToPostCreate(submitData)
        props.onSubmit(formattedSubmitData)
    }

    const idImageWithoutEmpty = watchIdImages.filter(idImage => idImage)
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
                        <RHFSelect
                            name="privillege"
                            label={isRequire(constant.privillege)}
                            InputLabelProps={{ shrink: true }}
                        >
                            {privillege.map(({ value, label }) => (
                                <option value={value} key={`${value}-privillege-option`}>
                                    {label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFTextField name="email" label={isRequire(constant.email)} />
                        <RHFTextField
                            name="password"
                            label={constant.password}
                            placeholder={constant.passwordPlaceholder}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />
                        <Stack gap={3} flexDirection="row">
                            <RHFSelect
                                name="accountStatus"
                                label={isRequire(constant.accountStatus)}
                                InputLabelProps={{ shrink: true }}
                            >
                                {accountStatus.map(({ value, label }) => (
                                    <option value={value} key={`${value}-accountStatus-option`}>
                                        {label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <Controller
                                name="accountExpiryDate"
                                control={control}
                                defaultValue={''}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker
                                        inputFormat="dd MMM yyyy"
                                        label={constant.accountExpiryDate}
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
                        </Stack>
                    </Stack>
                </Paper>
                <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }}>
                    <Stack spacing={3} justifyContent="center" textAlign={'center'}>
                        <Controller
                            name="avatar"
                            control={control}
                            render={({ field }) => (
                                <Stack sx={{ mt: 1 }}>
                                    <UploadAvatar
                                        accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                                        file={field.value}
                                        onDrop={(files) =>
                                            field.onChange(URL.createObjectURL(files[0]))
                                        }
                                        maxSize={200000}
                                        helperText={
                                            <Typography
                                                variant="caption"
                                                sx={{ mt: 1, color: 'text.secondary' }}
                                            >
                                                Allowed *.jpeg, *.jpg, *.png
                                                <br /> Max size of {fData(200000)}
                                            </Typography>
                                        }
                                    />
                                    <FormHelperText error sx={{ mt: 2, textAlign: 'center' }}>
                                        {errors.avatar?.message}
                                    </FormHelperText>
                                </Stack>
                            )}
                        />
                        <Stack flexDirection={'row'} gap={3}>
                            <RHFSelect
                                name="typeOfPerson"
                                label={isRequire(constant.typeOfPerson)}
                            >
                                <option
                                    value={''}
                                    key={`${''}-typeOfPerson-option`}
                                    hidden
                                ></option>
                                {(!isFinance ? typeOfPerson : financeTypeOfPerson).map(
                                    ({ value, label }) => (
                                        <option value={value} key={`${value}-typeOfPerson-option`}>
                                            {label}
                                        </option>
                                    )
                                )}
                            </RHFSelect>
                            {{
                                'OTHER_UNIVERSITY': (
                                    <RHFTextField
                                        name="universityName"
                                        label={isRequire(constant.universityName)}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                ),
                                'KU_STUDENT_STAFF': (
                                    <RHFTextField
                                        name="department"
                                        key={'department-textfield'}
                                        label={isRequire(constant.department)}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                ),
                                'SCIKU_STUDENT_STAFF': (
                                    <Controller
                                        name="department"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                clearOnBlur
                                                fullWidth
                                                isOptionEqualToValue={(option, value) => 
                                                    option.value === value.value
                                                }
                                                value={{ value: field.value, label: field.value }}
                                                onChange={(event, newValue) =>{
                                                    const newVal = get(newValue, 'value', '')
                                                    field.onChange(newVal)}
                                                }
                                                popupIcon={<Iconify icon={'mdi:chevron-down'} />}
                                                options={department}
                                                key={'department-auto'}
                                                renderInput={(param) => (
                                                    <TextField
                                                        {...param}
                                                        error={!!errors?.department}
                                                        helperText={get(
                                                            errors?.department,
                                                            'message',
                                                            ''
                                                        )}
                                                        label={isRequire(constant.department)}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                ),
                                'GOVN_OFFICE': (
                                    <RHFTextField
                                        name="governmentName"
                                        key={'governmentName-textfield'}
                                        label={isRequire(constant.governmentName)}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                ),
                                'PRIVATE_COMPANY': (
                                    <RHFTextField
                                        name="companyName"
                                        key={'companyName-textfield'}
                                        label={isRequire(constant.companyName)}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                ),
                            }[watchTypeOfPerson] || (
                                <RHFTextField
                                    name="department"
                                    key={'department-textfield'}
                                    label={isRequire(constant.department)}
                                    disabled
                                />
                            )}
                        </Stack>
                        {!isFinance ? (
                            <Stack flexDirection={'row'}>
                                <RHFSelect
                                    name="position"
                                    label={isRequire(constant.position)}
                                    sx={{ flex: '100%' }}
                                >
                                    <option
                                        value={''}
                                        key={`${''}-position-option`}
                                        hidden
                                    ></option>
                                    {position.map(({ value, label }) => {
                                        if (
                                            watchTypeOfPerson === 'SCIKU_STUDENT_STAFF' &&
                                            value === 'Other'
                                        )
                                            return
                                        return (
                                            <option value={value} key={`${value}-position-option`}>
                                                {label}
                                            </option>
                                        )
                                    })}
                                </RHFSelect>

                                <Stack
                                    sx={collapseableInputStyle(
                                        (isKu || isPositionOther) && watchPosition !== ''
                                    )}
                                >
                                    {isKuStudent ? (
                                        <RHFTextField
                                            name="studentId"
                                            key="field-studentId"
                                            label={isRequire(constant.studentId)}
                                            inputProps={{ maxLength: 100 }}
                                        />
                                    ) : isKu && isStaff ? (
                                        <RHFTextField
                                            name="staffId"
                                            key="field-staffId"
                                            label={constant.staffId}
                                            inputProps={{ maxLength: 100 }}
                                        />
                                    ) : isPositionOther ? (
                                        <RHFTextField
                                            name="positionName"
                                            key="field-positionName"
                                            label={isRequire(constant.positionName)}
                                            inputProps={{ maxLength: 100 }}
                                        />
                                    ) : (
                                        <RHFTextField
                                            name="studentId"
                                            key="field-studentId"
                                            label={isRequire(constant.studentId)}
                                            inputProps={{ maxLength: 100 }}
                                        />
                                    )}
                                </Stack>
                            </Stack>
                        ) : (
                            <></>
                        )}
                        <Stack flexDirection={'row'} gap={3}>
                            <RHFSelect
                                name="title"
                                label={isRequire(constant.title)}
                            >
                                <option value={''} key={`${''}-title-option`} hidden></option>
                                {title.map(({ value, label }) => (
                                    <option value={value} key={`${value}-title-option`}>
                                        {label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField
                                name={isTitleOther ? 'otherTitle' : ''}
                                label={isRequire(constant.otherTitle, isTitleOther)}
                                disabled={!isTitleOther}
                                inputProps={{ maxLength: 30 }}
                            />
                            <RHFTextField
                                name="firstName"
                                label={isRequire(constant.firstName)}
                                inputProps={{ maxLength: 100 }}
                            />
                            <RHFTextField
                                name="surName"
                                label={isRequire(constant.surName)}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Stack>
                        <RHFTextField
                            name="address"
                            multiline
                            label={isRequire(constant.address)}
                            inputProps={{ maxLength: 200 }}
                            minRows={4}
                        />
                        <RHFTextField
                            name="phoneNumber"
                            label={isRequire(constant.phoneNumber)}
                            inputProps={{ maxLength: 10 }}
                            InputProps={{ inputComponent: NumberFormatCustomNoComma }}
                        />
                        {!isFinance ? (
                            <Stack flexDirection={'row'} gap={3}>
                                <RHFTextField
                                    name="creditLimit"
                                    label={isRequire(constant.creditLimit)}
                                    InputProps={{ inputComponent: NumberFormatCustom }}
                                />
                                <RHFTextField
                                    name="bookingLimit"
                                    label={isRequire(constant.bookingLimit)}
                                    InputProps={{ inputComponent: NumberFormatCustom }}
                                />
                            </Stack>
                        ) : (
                            <></>
                        )}
                        <Stack flexDirection={'row'} flexWrap={'wrap'} gap={1.5}>
                            {[...Array(idImageLength).keys()].map((i) => (
                                <Controller
                                    key={`id-image-upload-${i}`}
                                    name={`idImages.${i}`}
                                    control={control}
                                    render={({ field }) => (
                                        <Upload
                                            dropzoneHelper={
                                                <Box sx={{ py: 3, px: 1 }}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        sx={{ ml: -2 }}
                                                    >
                                                        {isKu || watchTypeOfPerson === ''
                                                            ? constant.studentIdImage
                                                            : constant.citizenIdImage}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        component="p"
                                                        whiteSpace="pre-line"
                                                        sx={{ ml: -2, color: 'text.secondary' }}
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
                                                            {`browse\n`}
                                                        </Typography>
                                                        {`thorough your machine.\n\n`}
                                                        {`Allowed *.jpeg, *.jpg, *.png\n`}
                                                        {`Max size of 200KB`}
                                                    </Typography>
                                                </Box>
                                            }
                                            accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                                            file={field.value}
                                            onDrop={(files) =>
                                                field.onChange(URL.createObjectURL(files[0]))
                                            }
                                            onDelete={() => field.onChange('')}
                                            sx={{
                                                width:
                                                    get(field, 'value', '') === '' ? 264 : '100%',
                                                flex: get(field, 'value', '') === '' ? '' : '50%',
                                                '& > div > div': {
                                                    flexDirection: 'column',
                                                    textAlign: 'center',
                                                },
                                            }}
                                            maxSize={200000}
                                        />
                                    )}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Paper>
                {isKuStudent && isUser ? (
                    <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }}>
                        <Stack spacing={2} textAlign={'left'}>
                            <Typography variant="h4">{constant.supervisorDetail}</Typography>
                            <Typography variant="body1" whiteSpace={'pre-line'}>
                                {constant.enterSupervisorCode}
                            </Typography>
                            <RHFTextField
                                name="supervisorCode"
                                label={isRequire(constant.supervisorCode)}
                                error={!!errors.supervisorCode}
                                helperText={get(errors?.supervisorCode, 'message', '')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {watchSupervisorStatus === 'fetching' ? (
                                                <CircularProgress
                                                    size={16}
                                                    sx={{ color: 'text.primary' }}
                                                />
                                            ) : watchSupervisorStatus === 'notFound' ? (
                                                <IconButton
                                                    onClick={() =>
                                                        fetchSupervisorData(
                                                            getValues('supervisorCode')
                                                        )
                                                    }
                                                    edge="end"
                                                >
                                                    <Iconify icon={'ic:round-refresh'} />
                                                </IconButton>
                                            ) : (
                                                <></>
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {supervisor && watchSupervisorStatus === 'found' ? (
                                <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
                                    <Image
                                        alt="Logo"
                                        src={supervisor.pic}
                                        sx={{ height: 64, width: 64, borderRadius: 1 }}
                                        disabledEffect
                                    />
                                    <Stack>
                                        <Typography variant="h6">
                                            {`${supervisor.name} (${supervisor.code})`}
                                        </Typography>
                                        <Typography variant="body1" whiteSpace={'pre-line'}>
                                            {supervisor.email}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Paper>
                ) : (
                    <></>
                )}

                {props.permission && props.permission === 'USER' ? (
                    <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }}>
                        <Stack spacing={2} textAlign={'left'}>
                            <Typography variant="h4">{constant.supervisorDetail}</Typography>
                            <Typography variant="body1" whiteSpace={'pre-line'}>
                                {constant.waitSupervisorApprove}
                            </Typography>
                            {supervisor ? (
                                <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
                                    <Image
                                        alt="Logo"
                                        src={supervisor.pic}
                                        sx={{ height: 64, width: 64, borderRadius: 1 }}
                                        disabledEffect
                                    />
                                     <Box sx={{ flexGrow: 1 }}>
                                    <Stack>
                                        <Typography variant="h6">
                                            {`${supervisor.name} (${supervisor.code})`}
                                        </Typography>
                                        <Typography variant="body1" whiteSpace={'pre-line'}>
                                            {supervisor.email}
                                        </Typography>
                                    </Stack>
                                    </Box>

                                    <Box sx={{ flexShrink: 0}}>
                                            <Button
                                                variant="contained"
                                                startIcon={<Iconify icon="ic:round-mark-email-read"/>}
                                                sx={{ borderRadius: '50px', height: '24px',width: '99px' }}
                                                disableElevation
                                            >
                                                {constant.approve}
                                            </Button>
                                    </Box>
                                </Stack>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Paper>
                ) : (
                    <></>
                )}
                <Stack flexDirection="row" justifyContent="right" gap={2}>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        size="large"
                        onClick={props.onCancel}
                        color="inherit"
                    >
                        {props.updateMode ? constant.reset : constant.cancel}
                    </LoadingButton>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        // loading={authenticationStore.isFetching}
                    >
                        {props.updateMode ? constant.updateAccount : constant.createAccount}
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default AccountForm
