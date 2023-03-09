// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// theme
import { ColorSchema } from '../../../theme/palette';
// components
import Iconify from '@sentry/components/iconify'

// ----------------------------------------------------------------------

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
        color:  color === 'grey' ? (theme) => theme.palette[color as keyof ColorSchema] : (theme ) => theme.palette[color].darker,
        bgcolor:  color === 'grey' ? '#F4F6F8':(theme ) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: color === 'grey' ? (theme) => theme.palette[color as keyof ColorSchema ] :(theme ) => theme.palette[color ].dark,
          backgroundImage: color === 'grey' ? 'linear-gradient(135deg, rgba(226, 226, 226, 0) 0%, rgba(40, 40, 40, 0.24) 97.35%);' : (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
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