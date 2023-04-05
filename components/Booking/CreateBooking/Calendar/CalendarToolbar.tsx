import { Stack, Button, Typography, IconButton } from '@mui/material'
import Iconify from '@sentry/components/iconify'
import useResponsive from '@sentry/hooks/useResponsive'
import { fDate } from '@sentry/utils/formatTime'

type Props = {
    date: Date
    onToday: VoidFunction
    onNextDate: VoidFunction
    onPrevDate: VoidFunction
    onOpenFilter: VoidFunction
}

export default function CalendarToolbar({
    date,
    onToday,
    onNextDate,
    onPrevDate,
    onOpenFilter,
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
                    Available Date
                </Stack>
            )}

            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={onPrevDate}>
                    <Iconify icon="eva:arrow-ios-back-fill" />
                </IconButton>

                <Typography variant="h5">{fDate(date)}</Typography>

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

                <IconButton onClick={onOpenFilter}>
                    <Iconify icon="ic:round-filter-list" />
                </IconButton>
            </Stack>
        </Stack>
    )
}
