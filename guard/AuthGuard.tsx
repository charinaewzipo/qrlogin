import { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// components
import LoadingScreen from '@sentry/components/loading-screen'
//
import Login from '@unfinity/pages/login'
import { useAuthContext } from '@unfinity/contexts/useAuthContext'

// ----------------------------------------------------------------------

type AuthGuardProps = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isInitialized , user } = useAuthContext()

    const { pathname, push } = useRouter()

    const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

    useEffect(() => {
        console.log(requestedLocation , pathname , requestedLocation);
        
        if (requestedLocation && pathname !== requestedLocation) {
            push(requestedLocation)
        }
        console.log("AuthGuard - isAuthenticated, ",isAuthenticated, user );
        if (isAuthenticated) {
            setRequestedLocation(null)
        }
    }, [isAuthenticated, pathname, push, requestedLocation])

    if (!isInitialized) {
        return <LoadingScreen />
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname)
        }
        return <Login />
    }

    return <>{children}</>
}
