// @mui
import { Stack, InputAdornment, TextField, Button, MenuItem } from '@mui/material'
import Iconify from '@sentry/components/iconify'

type Props = {
    filterName: string
    filterStudentID: string;
    filterEmail: string;
    onFilterStudentId: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onFilterEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AccountSupervisorToolsbar({

    filterName,
    filterStudentID,
    onFilterEmail,
    filterEmail,
    onFilterStudentId,
    onFilterName,
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
                value={filterStudentID}
                onChange={(e) => onFilterStudentId(e)}
                placeholder="Search by student/staff ID"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:person-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                value={filterEmail}
                onChange={onFilterEmail}
                placeholder="Search by email"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:email-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                fullWidth
                value={filterName}
                onChange={onFilterName}
                placeholder="Search by name"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />

        </Stack>
    )
}
