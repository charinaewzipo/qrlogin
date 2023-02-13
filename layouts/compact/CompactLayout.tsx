// next
import dynamic from 'next/dynamic'
// @mui
import { Stack, Container } from '@mui/material'
// hooks
import useOffSetTop from '@sentry/hooks/useOffSetTop'
// config
import { HEADER } from '@sentry/components/layout'
//
const Header = dynamic(() => import('./Header'), { ssr: false })

// ----------------------------------------------------------------------

type Props = {
    children?: React.ReactNode
}

export default function CompactLayout({ children }: Props) {
    const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP)

    return (
        <>
            <Header isOffset={isOffset} />

            <Container component="main">
                <Stack
                    sx={{
                        py: 12,
                        m: 'auto',
                        maxWidth: 400,
                        minHeight: '100vh',
                        textAlign: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {children}
                </Stack>
            </Container>
        </>
    )
}
