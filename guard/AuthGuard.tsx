import { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// components
import LoadingScreen from '@sentry/components/loading-screen'
//
import Login from '@ku/components/Login/Login'
import PermissionDenied from '@ku/components/PermissionDenied/PermissionDenied'

import { useAuthContext } from '@ku/contexts/useAuthContext'
import menuConfig from '@ku/layouts/authorized/nav/config'
import { get, includes, map } from 'lodash'
import { ROOT_PATH, PROFILE_PATH } from '@ku/constants/routes'

// ----------------------------------------------------------------------

type AuthGuardProps = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isInitialized, user } = useAuthContext()

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
            setRequestedLocation(pathname)
        }
        return <Login />
    } else {
        if (user.authPermission) {
            const menus = menuConfig(user.authPermission)
            const pathObjectItems = get(menus, `0.items`, [])
            const accessiblePathnames = map(pathObjectItems, (pathItem) =>
                get(pathItem, 'path', '')
            )
            const accesspath = [...accessiblePathnames, ROOT_PATH, PROFILE_PATH]
            if (!includes(accesspath, pathname)) {
                return <PermissionDenied />
            }
        }
        // TODO: Add else handler when auth permission is null
    }

    return <>{children}</>
}
