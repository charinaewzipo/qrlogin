// next
import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import RegisterForm from '@ku/components/Register/RegisterForm'
import { useLocales } from '@ku/locales'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import PDPAForm from '@ku/components/Register/PDPAForm'
import { useRouter } from 'next/router'
import { LOGIN_PATH } from '@ku/constants/routes'
import LogoOnlyLayout from '@ku/layouts/LogoOnlyLayout'
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

    const { translate, currentLang, onChangeLang } = useLocales()
    const { t } = useTranslation()
    const [isPdpaAccepted, setIsPdpaAccepted] = useState(false)
    const router = useRouter()
    const onAcceptPdpa = () => {
        setIsPdpaAccepted(true)
    }
    const onDeclinePdpa = () => {
        router.push(LOGIN_PATH)
    }
    const onSubmitRegister = () => {
        setIsPdpaAccepted(true)
        //TODO: submit form to api
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
