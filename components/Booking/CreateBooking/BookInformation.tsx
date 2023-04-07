import { LoadingButton } from '@mui/lab'
import { Stack, Paper, Typography, Grid, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import Label from '@sentry/components/label'
import { padStart } from 'lodash'

const constant = {
    bookInformation: 'Book information',
    selectDate: 'Select date',
    selectTimes: 'Select times',
    selected: 'Selected',
    available: 'Available',
    reserved: 'Reserved',
    unavailable: 'Unavailable',
}
interface IBookInformationProps {
    selectedDate: Date
    selectedTimes: number[]
    onSelectDate: (date: Date) => void
    onSelectTime: (times: number) => void
    unavailableTimes?: number[]
    reservedTimes?: number[]
}
function BookInformation({
    selectedDate,
    selectedTimes,
    onSelectDate,
    onSelectTime,
    unavailableTimes,
    reservedTimes
}: IBookInformationProps) {
    const renderTimeButton = (time: number) => {
        const formattedTime = padStart(`${time}`, 2, '0')
        if (unavailableTimes && unavailableTimes.includes(time)) {
            return (
                <LoadingButton variant={'outlined'} color="inherit" size="large" fullWidth>
                    {`${formattedTime}:00`}
                </LoadingButton>
            )
        } else if (reservedTimes && reservedTimes.includes(time)) {
            return (
                <LoadingButton variant={'text'} color="inherit" size="large" fullWidth>
                    {`${formattedTime}:00`}
                </LoadingButton>
            )
        } else if (selectedTimes.includes(time)) {
            return (
                <LoadingButton
                    onClick={() => onSelectTime(time)}
                    variant={'contained'}
                    color="info"
                    size="large"
                    fullWidth
                >
                    {`${formattedTime}:00`}
                </LoadingButton>
            )
        } else {
            return (
                <LoadingButton
                    onClick={() => onSelectTime(time)}
                    variant={'outlined'}
                    size="large"
                    fullWidth
                >
                    {`${formattedTime}:00`}
                </LoadingButton>
            )
        }
    }
    const renderSelectTimes = () => {
        const times = Array.from({ length: 14 }, (_, index) => index + 7)
        return (
            <Grid container spacing={2}>
                {times.map((time) => (
                    <Grid item xs={4} md={1.71} key={`${time}-time-button`}>
                        {renderTimeButton(time)}
                    </Grid>
                ))}
            </Grid>
        )
    }
    return (
        <Stack spacing={5}>
            <Paper elevation={9} sx={{ borderRadius: 2, p: 3 }}>
                <Typography gutterBottom variant="h6">
                    {constant.bookInformation}
                </Typography>
                <Stack mt={6} gap={3}>
                    <Typography variant="subtitle1">{constant.selectDate}</Typography>
                    <DatePicker
                        inputFormat="dd/MM/yyyy"
                        onChange={onSelectDate}
                        value={selectedDate || null}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                    <Stack justifyContent='space-between' gap={1} direction='row' flexWrap={'wrap'}>
                        <Typography variant="subtitle1">{constant.selectTimes}</Typography>
                        <Stack direction='row' gap={1} flexWrap={'wrap'}>
                            <Label variant='filled' color='info'>{constant.selected}</Label>
                            <Label variant='outlined' color='primary'>{constant.available}</Label>
                            <Label variant='outlined'>{constant.reserved}</Label>
                            <Label variant='filled'>{constant.unavailable}</Label>
                        </Stack>
                    </Stack>
                    <Stack justifyContent={'center'}>{renderSelectTimes()}</Stack>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default BookInformation
