// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '@sentry/utils/formatNumber';
// theme

// components
import Iconify from '@sentry/components/iconify'


// ----------------------------------------------------------------------
export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'grey'
const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  icon: string;
  color?: ColorSchema;
  units? : string
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  units,
  ...other
}: Props) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color:  color === 'grey' as ColorSchema ? (theme) => theme.palette[color as keyof ColorSchema] : (theme ) => theme.palette[color as keyof ColorSchema].darker,
        bgcolor:  color === 'grey' as ColorSchema ? '#F4F6F8':(theme ) => theme.palette[color as keyof ColorSchema].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: color === 'grey' as ColorSchema ? (theme) => theme.palette[color as keyof ColorSchema ] :(theme ) => theme.palette[color as keyof ColorSchema].dark,
          backgroundImage: color === 'grey' as ColorSchema ? 'linear-gradient(135deg, rgba(226, 226, 226, 0) 0%, rgba(40, 40, 40, 0.24) 97.35%);' : (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color as keyof ColorSchema].dark, 0)} 0%, ${alpha(
              theme.palette[color as keyof ColorSchema].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3">{fShortenNumber(total)} {<span style={{fontSize:14}}>{units && units}</span>}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}