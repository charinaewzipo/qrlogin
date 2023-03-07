// @mui
import { styled } from '@mui/material/styles';
// utils

interface StyledContentWrapperProps{
  isBigger?: boolean
}

export const StyledContentWrapper = styled('div')<StyledContentWrapperProps>(({ isBigger, theme }) => ({
  maxWidth: isBigger ? 640 : 480,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: isBigger ? `${theme.spacing(18)} 0 ${theme.spacing(10)} 0` : `${theme.spacing(18)} 0 ${theme.spacing(4)} 0`,
  gap: theme.spacing(5),
  flex: '1',
  margin: 'auto',
  width: '100%',
}))

export const StyledContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '0 auto',
  width: '100%',
}))