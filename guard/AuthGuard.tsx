import { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// components
import LoadingScreen from '@sentry/components/loading-screen'
//
import Login from '@ku/pages/login'
import { useAuthContext } from '@ku/contexts/useAuthContext'
import { LOGIN_PATH } from '@ku/constants/routes'

// ----------------------------------------------------------------------

type AuthGuardProps = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isInitialized } = useAuthContext()

    const { pathname, push } = useRouter()

    const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

    useEffect(() => {
        if (requestedLocation && pathname !== requestedLocation) {
            push(requestedLocation)
        }
        if (isAuthenticated) {
            setRequestedLocation(null)
        }
    }, [isAuthenticated, pathname, push, requestedLocation])

    if (!isInitialized) {
        return <LoadingScreen />
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            // setRequestedLocation('/login')
            push(LOGIN_PATH)
        }
        return <LoadingScreen />
    }

    return <>{children}</>
}
