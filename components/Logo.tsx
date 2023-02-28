// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
  logoType?: 'small' | 'full'
}

export default function Logo({ disabledLink = false, sx, logoType = 'small' }: Props) {
  const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;
  const logo = (
    <Box sx={{ height: logoType === 'small' ? 24 : 64, ...sx }} component="img" src={'/assets/images/logo/Logo.png'}/>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <>{logo}</>;
}
