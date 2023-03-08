import Head from 'next/head'
import { Container } from '@mui/material'
import { ASSESSMENT_PATH } from '@ku/constants/routes'
import AuthorizedLayout from '@ku/layouts/authorized'
import CustomBreadcrumbs from '@sentry/components/custom-breadcrumbs'
import AssessmentForm from '@ku/components/Assessment/AssessmentForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AssessmentParticipatingList from '@ku/components/Assessment/AssessmentParticipation'

AssesmentDetailPage.getLayout = (page: React.ReactElement) => (
    <AuthorizedLayout>{page}</AuthorizedLayout>
)

export default function AssesmentDetailPage() {
    const {
        query: { id },
    } = useRouter()

    const [assessmentName, setName] = useState('An assessment')

    useEffect(() => {
        getAssessmentById()
    }, [])

    const getAssessmentById = () => {
        if (id) {
            setTimeout(() => {
                setName(`${id}`)
            }, 750)
        }
    }

    return (
        <>
            <Head>
                <title> Assessments: Detail | KU</title>
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
                            name: assessmentName,
                        },
                    ]}
                />

                <AssessmentForm />
                <AssessmentParticipatingList />
            </Container>
        </>
    )
}
