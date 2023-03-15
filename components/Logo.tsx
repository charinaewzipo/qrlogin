// @mui
import { useTheme } from '@mui/material/styles'
import { Box, BoxProps } from '@mui/material'
// ----------------------------------------------------------------------

interface Props extends BoxProps {
    disabledLink?: boolean
    logoType?: 'small' | 'full'
}

export default function Logo({ disabledLink = false, sx, logoType = 'small' }: Props) {
    const logo = (
        <Box
            sx={{
                height: logoType === 'small' ? 24 : 56,
                objectFit: 'contain',
                alignSelf: 'flex-start',
                ...sx,
            }}
            component="img"
            src={'/assets/images/logo/Logo.png'}
        />
    )

    if (disabledLink) {
        return <>{logo}</>
    }

    return <>{logo}</>
}
