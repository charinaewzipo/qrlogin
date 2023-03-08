// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material'
import Iconify from '@sentry/components/iconify'

type Props = {
    filterID: string
    filterEmail: string
    filterName: string
    isFiltered: boolean
    onResetFilter: VoidFunction
    onFilterID: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AssessmentParticipationToolsbar({
    filterID,
    filterEmail,
    filterName,
    isFiltered,
    onFilterID,
    onFilterEmail,
    onFilterName,
    onResetFilter,
}: Props) {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            direction={{
                xs: 'column',
                md: 'row',
            }}
            sx={{ px: 2.5, py: 3 }}
        >
            <TextField
                fullWidth
                value={filterID}
                onChange={onFilterID}
                placeholder="Search by student/staff ID..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="ic:person" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                value={filterEmail}
                onChange={onFilterEmail}
                placeholder="Search by email..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="ic:mail" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                value={filterName}
                onChange={onFilterName}
                placeholder="Search by name..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />

            {isFiltered && (
                <Button
                    color="error"
                    sx={{ flexShrink: 0 }}
                    onClick={onResetFilter}
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                >
                    Clear
                </Button>
            )}
        </Stack>
    )
}
