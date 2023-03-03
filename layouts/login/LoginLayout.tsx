// @mui
import { Typography, Stack } from '@mui/material'
// components
import Logo from '@ku/components/Logo'
//
import GuestGuard from '@ku/guard/GuestGuard'

import { StyledRoot, StyledContent } from './styles'


type Props = {
    title?: string
    illustration?: string
    children: React.ReactNode
}

export default function LoginLayout({ children, illustration, title }: Props) {
    return (
        <GuestGuard>
        <StyledRoot>
            <Logo
                sx={{
                    zIndex: 9,
                    position: 'absolute',
                    mt: { xs: 1.5, md: 5 },
                    ml: { xs: 2, md: 5 },
                }}
                logoType="full"
            />
            <StyledContent>
                <Stack sx={{ width: 1 }}> {children} </Stack>
            </StyledContent>
        </StyledRoot>
        </GuestGuard>
    )
}
