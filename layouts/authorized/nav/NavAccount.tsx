// next
import NextLink from 'next/link'
// @mui
import { styled, alpha } from '@mui/material/styles'
import { Box, Link, Typography } from '@mui/material'
// routes
import { PROFILE_PATH } from '@ku/constants/routes'
// components
import { CustomAvatar } from '@sentry/components/custom-avatar'
import { useAuthContext } from '@ku/contexts/useAuthContext'
import { sentenceCase } from 'change-case'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
}))

// ----------------------------------------------------------------------

export default function NavAccount() {
    const { user } = useAuthContext()

    return (
        <NextLink href={PROFILE_PATH} passHref>
            <Link underline="none" color="inherit">
                <StyledRoot>
                    <CustomAvatar
                        src={user.uiPersonPicture}
                        alt={user.uFirstname}
                        name={`${user.uFirstname || ''} ${user.uSurname || ''}`}
                    />

                    <Box sx={{ ml: 2, minWidth: 0 }}>
                        <Typography variant="subtitle2" noWrap>
                            {`${user.uFirstname} ${user.uSurname}`}
                        </Typography>

                        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                            {sentenceCase(user.authPermission)}
                        </Typography>
                    </Box>
                </StyledRoot>
            </Link>
        </NextLink>
    )
}
