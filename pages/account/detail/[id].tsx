import { m, useScroll, useSpring } from 'framer-motion'
import styles from '../../../styles/index.module.scss'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Container,Button, } from '@mui/material'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { useTranslation } from "react-i18next";
import AccountForm from '@ku/components/Account/AccountForm'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import Iconify from '@sentry/components/iconify'
import { useSnackbar } from '@sentry/components/snackbar'

AccountDetail.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>
declare type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'

export function AccountDetail() {
    const router = useRouter()
    const accountId = router.query.id
    const theme = useTheme()
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })


    const permission : PERMISSION = 'Admin'

    const progress = (
        <m.div
            style={{
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                zIndex: 1999,
                position: 'fixed',
                transformOrigin: '0%',
                backgroundColor: theme.palette.primary.main,
                scaleX,
            }}
        />
    )

    const onFormSubmit = () => {
      //TODO: api submit
      enqueueSnackbar('Account saved.');
      console.log('submit');
    }

    const onFormCancel = () => {
      //TODO: cancel form
      console.log('canncel');
    }

    return (
        <>
            <Head>
                <title>Account Detail | KU</title>
            </Head>
            {progress}
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
                            <div className='d-flex'>
                                <div>
                                <CustomBreadcrumbs
                                heading="Accounts"
                                links={[
                                    { name: 'Accounts', href: '/account' },
                                    { name: 'List' },
                                    { name: `${accountId}` },
                                ]}
                                sx={{ mt: 3, mb: 5, height: 72 }}
                                action={
                                    <NextLink href='/' passHref>
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            startIcon={<Iconify icon="eva:settings-2-fill" />}
                                        >
                                            Reset Password
                                        </Button>
                                    </NextLink>
                                }
                            />
                                </div>
                         
                           
                            </div>
                            <AccountForm onSubmit={onFormSubmit} onCancel={onFormCancel} updateMode={true} permission={'User'}/>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default AccountDetail
