import { useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// routes
import { DASHBOARD_PATH } from '@unfinity/constants/routes'
// components
import LoadingScreen from '@sentry/components/loading-screen'
//
import { useAuthContext } from '@unfinity/contexts/useAuthContext'

// ----------------------------------------------------------------------

type GuestGuardProps = {
    children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps) {
    const { push } = useRouter()

    const { isAuthenticated, isInitialized } = useAuthContext()

    useEffect(() => {
        if (isAuthenticated) {
            push(DASHBOARD_PATH)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    if (isInitialized === isAuthenticated) {
        return <LoadingScreen />
    }

    return <> {children} </>
}
