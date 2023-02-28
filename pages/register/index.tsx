// next
import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Head from 'next/head'
import RegisterForm from './components/RegisterForm'
import Image from '@sentry/components/image'
import { useLocales } from '@unfinity/locales'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import PDPAForm from './components/PDPAForm'

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
        padding: isBigger ? `${theme.spacing(20)} 0 ${theme.spacing(10)} 0` : `${theme.spacing(15)} 0 ${theme.spacing(4)} 0`,
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

    const { translate, currentLang, onChangeLang } = useLocales()
    const { t } = useTranslation()
    const [isPdpaAccepted, setIsPdpaAccepted] = useState(false)
    const onAcceptPdpa = () => {
        setIsPdpaAccepted(true)
    }
    const onDeclinePdpa = () => {
        //go back to login
    }
    const onSubmitRegister = () => {
        setIsPdpaAccepted(true)
    }
    const onBackRegister = () => {
        setIsPdpaAccepted(false)
    }
    return (
        <>
            <Head>
                <title> Register | KU </title>
            </Head>

            <Box
                component="div"
                sx={{
                    display: 'inline-flex',
                    position: 'absolute',
                    width: 294,
                    height: 56,
                    zIndex: 9,
                    mt: { xs: 1.5, md: 5 },
                    ml: { xs: 2, md: 5 },
                }}
            >
                <Image
                    alt="Logo"
                    src={'/assets/images/logo/Logo.png'}
                    sx={{ objectFit: 'contain' }}
                    disabledEffect
                />
            </Box>
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
