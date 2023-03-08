import Head from 'next/head'
import { Container } from '@mui/material'
import { ASSESSMENT_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import AssessmentForm from '@ku/components/Assessment/AssessmentForm'

AssesmentCreatePage.getLayout = (page: React.ReactElement) => (
    <AuthorizedLayout>{page}</AuthorizedLayout>
)

export default function AssesmentCreatePage() {

    return (
        <>
            <Head>
                <title> Assessments: Create a new assessment | KU</title>
            </Head>

            <Container>
                <CustomBreadcrumbs
                    heading="Assessments"
                    links={[
                        {
                            name: 'Asssessments',
                            href: ASSESSMENT_PATH,
                        },
                        {
                            name: 'List',
                            href: ASSESSMENT_PATH,
                        },
                        {
                            name: 'Create an assessment',
                        },
                    ]}
                />

                <AssessmentForm />
            </Container>
        </>
    )
}
