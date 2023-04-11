import { useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// @mui
import { Box, Stack, Drawer } from '@mui/material'
// hooks
import useResponsive from '@sentry/hooks/useResponsive'
// config
import { NAV } from '@sentry/components/layout'
// components
import Logo from '@ku/components/Logo'
import Scrollbar from '@sentry/components/scrollbar'
import { NavSectionVertical } from '@sentry/components/nav-section'
//
import navConfig from './config'
import NavAccount from './NavAccount'
import { useAuthContext } from '@ku/contexts/useAuthContext'

// ----------------------------------------------------------------------

type Props = {
    openNav: boolean
    onCloseNav: VoidFunction
}

export default function NavVertical({ openNav, onCloseNav }: Props) {
    const { pathname } = useRouter()
    const { user } = useAuthContext()
    const isDesktop = useResponsive('up', 'lg')

    useEffect(() => {
        if (openNav) {
            onCloseNav()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 2.5,
                    flexShrink: 0,
                }}
            >
                <Logo logoType="full" />

                <NavAccount />
            </Stack>

            <NavSectionVertical data={navConfig(user.authPermission)} />

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    )

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
            }}
        >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV.W_DASHBOARD,
                            bgcolor: 'transparent',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: {
                            width: NAV.W_DASHBOARD,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    )
}
