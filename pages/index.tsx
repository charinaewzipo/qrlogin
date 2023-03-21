import AuthorizedLayout from '@ku/layouts/authorized'
import Dashboard from './dashboard/index'

Index.getLayout = (page: React.ReactElement) => <AuthorizedLayout> {page} </AuthorizedLayout>

export function Index() {
    return (
        <Dashboard></Dashboard>
    )
}

export default Index
