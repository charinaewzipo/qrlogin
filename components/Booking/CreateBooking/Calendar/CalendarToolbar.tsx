import { Stack, Button, Typography, IconButton } from '@mui/material'
import Iconify from '@sentry/components/iconify'
import useResponsive from '@sentry/hooks/useResponsive'
import { format } from 'date-fns'

type Props = {
    title: string
    date: Date
    onToday: VoidFunction
    onNextDate: VoidFunction
    onPrevDate: VoidFunction
}

export default function CalendarToolbar({
    title,
    date,
    onToday,
    onNextDate,
    onPrevDate,
}: Props) {
    const isDesktop = useResponsive('up', 'sm')

    return (
        <Stack
            alignItems="center"
            justifyContent="space-between"
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ p: 2.5 }}
        >
            {isDesktop && (
                <Stack direction="row" spacing={1}>
                    {title}
                </Stack>
            )}

            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={onPrevDate}>
                    <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton>

                <Typography variant="h5">{format(date, 'MMMM yyyy')}</Typography>

                <IconButton onClick={onNextDate}>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
                {isDesktop && (
                    <Button size="small" color="error" variant="contained" onClick={onToday}>
                        Today
                    </Button>
                )}
            </Stack>
        </Stack>
    )
}
