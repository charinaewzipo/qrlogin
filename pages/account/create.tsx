import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Container } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { useTranslation } from "react-i18next";
import AccountForm from '@ku/components/Account/AccountForm'
import { useSnackbar } from '@sentry/components/snackbar'

AccountCreate.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function AccountCreate() {
    const { t } = useTranslation();
    const permission : PERMISSION = 'Admin'
    const { enqueueSnackbar } = useSnackbar();

    const onFormSubmit = () => {
      //TODO: api submit
      enqueueSnackbar('Account create success.');
      console.log('submit');
    }

    const onFormCancel = () => {
      //TODO: cancel form
      console.log('canncel');
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

                            <AccountForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default AccountCreate
