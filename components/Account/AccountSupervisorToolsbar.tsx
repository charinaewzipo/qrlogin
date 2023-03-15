// @mui
import { Stack, InputAdornment, TextField, Button, MenuItem } from '@mui/material'
import Iconify from '@sentry/components/iconify'

type Props = {
    filterName: string
    filterStudentID: string;
    filterEmail: string;
    onFilterStudentID: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onFilterEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AccountSupervisorToolsbar({

    filterName,
    filterStudentID,
    onFilterEmail,
    filterEmail,
    onFilterStudentID,
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
                name='studentID'
                value={filterStudentID}
                onChange={onFilterStudentID}
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
                name='email'
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
                name='name'
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
