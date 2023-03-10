// @mui
import { Stack, InputAdornment, TextField, Button, MenuItem } from '@mui/material'
import Iconify from '@sentry/components/iconify'

type Props = {
    optionsRole: string[];
    filterName: string
    filterRole: string;
    filterStudentID: string;
    filterEmail: string;
    onFilterStudentId: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onFilterEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AccountAdminToolsbar({
    filterRole,
    filterName,
    filterStudentID,
    onFilterEmail,
    filterEmail,
    onFilterStudentId,
    onFilterName,
    onFilterRole,
    optionsRole
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
                select
                label="Role"
                value={filterRole}
                onChange={onFilterRole}
                SelectProps={{
                    MenuProps: {
                        sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                    },
                }}
                sx={{
                    maxWidth: { sm: 170 },
                    textTransform: 'capitalize',
                }}
            >
                {optionsRole.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                value={filterStudentID}
                onChange={(e) => onFilterStudentId(e)}
                placeholder="Search by student/staff ID"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:person-fill" width={20} sx={{ color: 'text.disabled' }} />
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
                            <Iconify icon="eva:email-fill" width={20} sx={{ color: 'text.disabled' }} />
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
                            <Iconify icon="eva:search-fill" width={20} sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />

        </Stack>
    )
}
