// @mui
import { Typography, Stack, Container } from '@mui/material'
import GuestGuard from '@ku/guard/GuestGuard'

import { StyledContent, StyledContentWrapper } from './styles'
import LogoOnlyLayout from '../LogoOnlyLayout'


type Props = {
    children: React.ReactNode
    isBigger?: boolean
    title?: string
    subTitle?: string
}

export default function RegisterLayout({ children, isBigger, title, subTitle }: Props) {
    return (
        <>
            <LogoOnlyLayout/>
            <Container>
                <StyledContentWrapper isBigger={isBigger}>
                    <Stack spacing={2} sx={{ position: 'relative' }}>
                        <Typography variant="h3" textAlign="center">
                            { title }
                        </Typography>
                        <Typography variant="body1" textAlign={'center'} whiteSpace={'pre-line'}>
                            { subTitle }
                        </Typography>
                    </Stack>
                    <StyledContent>
                        { children }
                    </StyledContent>
                </StyledContentWrapper>
            </Container>
        </>
    )
}
