// @mui
import { Stack, Box } from '@mui/material'
// config
import { NAV } from '@sentry/components/layout'
// utils
import { hideScrollbarX } from '@sentry/utils/cssStyles'
// components
import Logo from '@ku/components/Logo'
import { NavSectionMini } from '@sentry/components/nav-section'
//
import navConfig from './config'
import { useAuthContext } from '@ku/contexts/useAuthContext'

// ----------------------------------------------------------------------

export default function NavMini() {
    const { user } = useAuthContext()
    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD_MINI },
            }}
        >
            <Stack
                sx={{
                    pb: 2,
                    height: 1,
                    position: 'fixed',
                    width: NAV.W_DASHBOARD_MINI,
                    borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                    ...hideScrollbarX,
                }}
            >
                <Logo logoType="full" sx={{ mx: 'auto', my: 2 }} />

                <NavSectionMini data={navConfig(user.authPermission)} />
            </Stack>
        </Box>
    )
}
