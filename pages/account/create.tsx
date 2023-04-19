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
import { postMemberCreate } from '@ku/services/account'
import { get } from 'lodash'
import { AxiosError } from 'axios'
import messages from '@ku/constants/response'

AccountCreate.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function AccountCreate() {
    // const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar()
    const { push } = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    const onFormSubmit = (data: IV1PostMemberCreate) => {
        setErrorMsg('')
        postMemberCreate(data)
            .then(async (res) => {
                enqueueSnackbar('Account create success.')
                push({ pathname: ACCOUNT_PATH })
            })
            .catch((err) => {
                if (
                    err.code === 401001 &&
                    get(err, 'devMessage', messages[0]) === 'Duplicate data'
                ) {
                    if (get(err, 'data', messages[0]) === 'Email already registed')
                        setErrorMsg('Email already registered')
                    else if (get(err, 'data', messages[0]) === 'u_iphone_number already registered')
                        setErrorMsg('Phone number already registered')
                    else setErrorMsg(get(err, 'devMessage', messages[0]))
                } else {
                    setErrorMsg(get(err, 'devMessage', messages[0]))
                }
            })
    }

    const onFormCancel = () => {
        push(ACCOUNT_PATH)
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
