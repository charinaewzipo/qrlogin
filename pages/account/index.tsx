// next
import AuthorizedLayout from '@ku/layouts/authorized'
import { useAuthContext } from '@ku/contexts/useAuthContext'
import AccountAdminList from '../../components/Account/AccountAdminList'
import AccountSupervisorList from '../../components/Account/AccountSupervisorList'
// components

AccountPageGuard.getLayout = (page: React.ReactElement) => <AuthorizedLayout>{page}</AuthorizedLayout>
type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
export default function AccountPageGuard() {
  const permission = 'Admin'
  const { user } = useAuthContext()

  const CheckPermission = () => {
    if (permission === 'Admin' as PERMISSION) {
      return <AccountAdminList />
    } else if (permission === 'Supervisor' as PERMISSION) {
      return <AccountSupervisorList />
    }
  }

  return <> <CheckPermission /> </>
}
