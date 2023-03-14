import Head from 'next/head'
import NextLink from 'next/link'
import { Button, Container } from '@mui/material'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { MERGE_PATH, PROFILE_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
import { fetchGetUser } from '@ku/services/user'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useAuthContext } from '@ku/contexts/useAuthContext'
import ProfileForm from '@ku/components/Profile/ProfileForm'
import Iconify from '@sentry/components/iconify/Iconify'
// sections

ProfilePage.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>

export default function ProfilePage() {
    const { user } = useAuthContext()
    const { enqueueSnackbar } = useSnackbar()
    const [profile, setProfile] = useState<IUser | null>(null)

    useEffect(() => {
        getProfileData()
    }, [])

    const getProfileData = async () => {
        try {
            const response = await fetchGetUser()
            if (response.data) {
                setProfile(response.data)
            }
        } catch (error) {
            enqueueSnackbar('Cannot get privacy policy data. Please try again.', {
                variant: 'error',
            })
        }
    }

    const userFullName = `${user.uFirstname || ''} ${user.uSurname || ''}`

    return (
        <>
            <Head>
                <title>My Account | KU</title>
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
                        },
                    ]}
                    action={
                        <NextLink href={MERGE_PATH(PROFILE_PATH, 'reset-password')} passHref>
                            <Button
                                color="inherit"
                                variant="contained"
                                startIcon={<Iconify icon="ic:settings" />}
                            >
                                Reset Password
                            </Button>
                        </NextLink>
                    }
                />

                <ProfileForm />
            </Container>
        </>
    )
}
