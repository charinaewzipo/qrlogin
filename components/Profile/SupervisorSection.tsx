import { TextField } from '@mui/material'
import { Chip } from '@mui/material'
import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import Iconify from '@sentry/components/iconify'
import Image from '@sentry/components/image'
import { useState } from 'react'

export default function SupervisorSection() {
    const [supervisorCode, setCode] = useState('')
    return (
        <Stack spacing={3}>
            <Typography variant="h4">Supervisor/Advisor Detail</Typography>
            <Typography variant="body1" color="text.secondary">
                Please wait for supervisor approval
            </Typography>
            <TextField
                fullWidth
                value={supervisorCode}
                onChange={(event) => setCode(event.target.value)}
                label='Supervisor code *'
                // error={!!error}
                // helperText={error?.message}
            />
            <Stack direction="row" spacing={3} alignItems="center">
                <Image
                    alt="supervisor-profile"
                    src="https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg"
                    sx={{ width: '64px', height: '64px', borderRadius: '8px' }}
                />
                <Stack direction="column" spacing={0.5} flex={1}>
                    <Typography variant="h6" color="text.primary">
                        Asst. Prof. Dr. Firstname Surname
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        supervisor.email@ku.ac.th
                    </Typography>
                </Stack>
                <Chip
                    variant="filled"
                    label="Unapprove"
                    size="small"
                    icon={<Iconify width={18} icon="eva:close-circle-fill" />}
                    color="error"
                />
            </Stack>
        </Stack>
    )
}
