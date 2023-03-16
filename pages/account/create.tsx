import styles from '../../styles/index.module.scss'
import Head from 'next/head'
import { Box, Container } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
// import { useTranslation } from "next-i18next";
import AccountForm, { IAccountFormValuesProps } from '@ku/components/Account/AccountForm'
import { useSnackbar } from '@sentry/components/snackbar'
import { useRouter } from 'next/router'
import { ACCOUNT_PATH } from '@ku/constants/routes'
import { useState } from 'react'

AccountCreate.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function AccountCreate() {
    // const { t } = useTranslation();
    const permission : PERMISSION = 'Admin'
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    const onFormSubmit = (data: IAccountFormValuesProps) => {
        //TODO: api submit
        enqueueSnackbar('Account create success.')
        setErrorMsg('error msg')
        console.log('submit', data)
    }

    const onFormCancel = () => {
        router.push(ACCOUNT_PATH)
    }

    return (
        <>
            <Head>
                <title>Account Create | KU</title>
            </Head>
            <Container>
                <Box
                    sx={{
                        overflow: 'visible',
                        position: 'relative',
                        bgcolor: 'background.default',
                    }}
                >
                    <div className={styles.page}>
                        <div className="wrapper">
                            <CustomBreadcrumbs
                                heading="Accounts"
                                links={[
                                    { name: 'Accounts', href: '/account' },
                                    { name: 'List', href: '/account' },
                                    { name: 'Create an account' },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                            />
                            <AccountForm onSubmit={onFormSubmit} onCancel={onFormCancel} errorMsg={errorMsg} />
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default AccountCreate
