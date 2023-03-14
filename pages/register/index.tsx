// next
import Head from 'next/head'
import RegisterForm, { RegisterFormValuesProps } from '@ku/components/Register/RegisterForm'
import { useLocales } from '@ku/locales'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import PDPAForm from '@ku/components/Register/PDPAForm'
import { useRouter } from 'next/router'
import { LOGIN_PATH, MERGE_PATH, REGISTER_PATH } from '@ku/constants/routes'
import RegisterLayout from '@ku/layouts/register'
import GuestGuard from '@ku/guard/GuestGuard'

// ----------------------------------------------------------------------
const cons = {
    registration: 'Registration',
    term: 'Terms and conditions privacy policy acceptable, please read\nprivacy policy below content',
    regisForm: 'Please enter the email address associated with your account, and personal\ninformation here.'
}

export default function RegisterPage() {
    useEffect(() => {
        console.log(translate('register_term'))
        console.log(t('register_term'))
    }, [])

    const { translate } = useLocales()
    const { t } = useTranslation()
    const [isPdpaAccepted, setIsPdpaAccepted] = useState(false)
    const router = useRouter()
    const onAcceptPdpa = () => {
        setIsPdpaAccepted(true)
    }
    const onDeclinePdpa = () => {
        router.push(LOGIN_PATH)
    }
    const onSubmitRegister = (data: RegisterFormValuesProps) => {
        const checkIsKuPerson = (typeOfPerson: string) =>
            ['KU Student & Staff', 'SciKU Student & Staff'].includes(typeOfPerson)
        const checkIsStudent = (position: string) => position.includes('student')
        const checkIsKuStudent = (position: string, typeOfPerson: string) =>
            checkIsKuPerson(typeOfPerson) && checkIsStudent(position)

        router.push({
            pathname: MERGE_PATH(REGISTER_PATH, 'success'),
            query: {
                name: `${data.firstName} ${data.surName}`,
                isStudent: checkIsKuStudent(data.position, data.typeOfPerson),
            },
        }, MERGE_PATH(REGISTER_PATH, 'success'))
    }
    const onBackRegister = () => {
        setIsPdpaAccepted(false)
    }
    return (
        <>
            <Head>
                <title> Register | KU </title>
            </Head>

            <GuestGuard>
                <RegisterLayout
                    isBigger={isPdpaAccepted}
                    title={cons.registration}
                    subTitle={!isPdpaAccepted ? cons.term : cons.regisForm}
                >
                    {!isPdpaAccepted ? (
                        <PDPAForm onAccept={onAcceptPdpa} onDecline={onDeclinePdpa} />
                    ) : (
                        <RegisterForm onSubmit={onSubmitRegister} onBack={onBackRegister} />
                    )}
                </RegisterLayout>
            </GuestGuard>
        </>
    )
}
