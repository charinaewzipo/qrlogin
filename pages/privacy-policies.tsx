import Head from 'next/head'
import { Container } from '@mui/material'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import { PRIVACY_POLICIES_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
import PrivacyPoliciesForm from '@ku/components/PrivacyPolicies/PrivacyPoliciesForm'
import { fetchGetPrivacyPolicies } from '@ku/services/privacyPolicies'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
// sections

PrivacyPolicies.getLayout = (page: React.ReactElement) => (
    <AuthorizedLayout>{page}</AuthorizedLayout>
)

export default function PrivacyPolicies() {
    const { enqueueSnackbar } = useSnackbar()
    const [privacyPoliciesData, setPrivacyPolicies] = useState<IPrivacyPolicy | null>(null)

    useEffect(() => {
        getPrivacyPolicies()
    }, [])

    const getPrivacyPolicies = async () => {
        try {
            const response = await fetchGetPrivacyPolicies()
            if (response.data) {
                setPrivacyPolicies(response.data)
            }
        } catch (error) {
            enqueueSnackbar('Cannot get privacy policy data. Please try again.', {
                variant: 'error',
            })
        }
    }

    return (
        <>
            <Head>
                <title>Privacy Policies | KU</title>
            </Head>

            <Container>
                <CustomBreadcrumbs
                    heading="Privacy Policies"
                    links={[
                        {
                            name: 'Privacy policies',
                            href: PRIVACY_POLICIES_PATH,
                        },
                        {
                            name: 'Create',
                        },
                    ]}
                />

                <PrivacyPoliciesForm
                    privacyPolicies={privacyPoliciesData}
                    getPrivacyPolicies={getPrivacyPolicies}
                />
            </Container>
        </>
    )
}
