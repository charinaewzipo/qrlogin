// next
import { Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import RegisterForm, { RegisterFormValuesProps } from '@ku/components/Register/RegisterForm'
import { useLocales } from '@ku/locales'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import PDPAForm from '@ku/components/Register/PDPAForm'
import { useRouter } from 'next/router'
import { LOGIN_PATH, REGISTER_SUCCESS_PATH } from '@ku/constants/routes'
import LogoOnlyLayout from '@ku/layouts/LogoOnlyLayout'

// ----------------------------------------------------------------------
const cons = {
    registration: 'Registration',
    term: 'Terms and conditions privacy policy acceptable, please read\nprivacy policy below content',
    regisForm: 'Please enter the email address associated with your account, and personal\ninformation here.'
}
interface StyledContentWrapperProps{
    isBigger?: boolean
}

export default function RegisterPage() {
    const StyledContentWrapper = styled('div')<StyledContentWrapperProps>(({ isBigger, theme }) => ({
        maxWidth: isBigger ? 640 : 480,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: isBigger ? `${theme.spacing(18)} 0 ${theme.spacing(10)} 0` : `${theme.spacing(18)} 0 ${theme.spacing(4)} 0`,
        gap: theme.spacing(5),
        flex: '1',
        margin: 'auto',
        width: '100%',
    }))

    const StyledContent = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        width: '100%',
    }))

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
        //go back to login
        router.push(LOGIN_PATH)
    }
    const onSubmitRegister = (data: RegisterFormValuesProps) => {
        const checkIsKuPerson = (typeOfPerson: string) =>
            ['KU Student & Staff', 'SciKU Student & Staff'].includes(typeOfPerson)
        const checkIsStudent = (position: string) => position.includes('student')
        const checkIsKuStudent = (position: string, typeOfPerson: string) =>
            checkIsKuPerson(typeOfPerson) && checkIsStudent(position)
        
        router.push({
            pathname: REGISTER_SUCCESS_PATH,
            query: {
                name: `${data.firstName} ${data.surName}`,
                isStudent: checkIsKuStudent(data.position, data.typeOfPerson),
            },
        }, REGISTER_SUCCESS_PATH)
    }
    const onBackRegister = () => {
        setIsPdpaAccepted(false)
    }
    return (
        <>
            <Head>
                <title> Register | KU </title>
            </Head>
            <LogoOnlyLayout/>
            <Container>
                <StyledContentWrapper isBigger={isPdpaAccepted}>
                    <Stack spacing={2} sx={{ position: 'relative' }}>
                        <Typography variant="h3" textAlign="center">
                            {cons.registration}
                        </Typography>
                        <Typography variant="body1" textAlign={'center'} whiteSpace={'pre-line'}>
                            {!isPdpaAccepted ? cons.term : cons.regisForm}
                        </Typography>
                    </Stack>
                    <StyledContent>
                        {!isPdpaAccepted ? (
                            <PDPAForm onAccept={onAcceptPdpa} onDecline={onDeclinePdpa} />
                        ) : (
                            <RegisterForm onSubmit={onSubmitRegister} onBack={onBackRegister} />
                        )}
                    </StyledContent>
                </StyledContentWrapper>
            </Container>
        </>
    )
}
