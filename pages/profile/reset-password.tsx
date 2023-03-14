import Head from 'next/head'
import { Container } from '@mui/material'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { PROFILE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
import { useAuthContext } from '@ku/contexts/useAuthContext'
import ProfileResetPasswordForm from '@ku/components/Profile/ProfileResetPasswordForm'

ProfileResetPasswordPage.getLayout = (page: React.ReactElement) => (
    <AuthorizedLayout>{page}</AuthorizedLayout>
)

export default function ProfileResetPasswordPage() {
    const { user } = useAuthContext()
    const userFullName = `${user.uFirstname || ''} ${user.uSurname || ''}`
    return (
        <>
            <Head>
                <title>My Account: Reset password | KU</title>
            </Head>

            <Container>
                <CustomBreadcrumbs
                    heading="My Account"
                    links={[
                        {
                            name: 'My Account',
                            href: PROFILE_PATH,
                        },
                        {
                            name: userFullName,
                            href: PROFILE_PATH,
                        },
                        {
                            name: 'Reset password',
                        },
                    ]}
                />
                <ProfileResetPasswordForm />
            </Container>
        </>
    )
}
