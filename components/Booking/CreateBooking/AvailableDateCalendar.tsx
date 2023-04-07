import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import { Stack, Paper } from '@mui/material'
import { CalendarToolbar, StyledCalendar } from './Calendar'
import { useRef, useState } from 'react'

const constant = {
    AvailableDateCalendar: 'Available Date',
    status: 'Status',
    bookingDate: 'Booking date',
    bookingTime: 'Booking time',
    duration: 'Duration',
    credit: 'Credit',
    bookName: 'Book name',
    bookNow: 'Book now',
    confirm: 'Confirm',
    cancel: 'Cancel',
}
interface IEvent {
    start: string
    title: string
}
interface IAvailableDateCalendarProps {
    events: IEvent[]
}
function AvailableDateCalendar({ events }: IAvailableDateCalendarProps) {
    const [date, setDate] = useState(new Date())
    const calendarRef = useRef<FullCalendar>(null)

    const handleClickToday = () => {
        const calendarEl = calendarRef.current
        if (calendarEl) {
            const calendarApi = calendarEl.getApi()
            calendarApi.today()
            setDate(calendarApi.getDate())
        }
    }

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current
        if (calendarEl) {
            const calendarApi = calendarEl.getApi()
            calendarApi.prev()
            setDate(calendarApi.getDate())
        }
    }

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current
        if (calendarEl) {
            const calendarApi = calendarEl.getApi()
            calendarApi.next()
            setDate(calendarApi.getDate())
        }
    }

    return (
        <Stack spacing={5}>
            <Paper elevation={9} sx={{ borderRadius: 2 }}>
                <StyledCalendar>
                    <CalendarToolbar
                        title={constant.AvailableDateCalendar}
                        date={date}
                        onNextDate={handleClickDateNext}
                        onPrevDate={handleClickDatePrev}
                        onToday={handleClickToday}
                    />
                    <FullCalendar
                        weekends
                        eventResizableFromStart
                        events={events}
                        ref={calendarRef}
                        initialDate={date}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        height={'auto'}
                        displayEventTime={false}
                        plugins={[
                            listPlugin,
                            dayGridPlugin,
                            timelinePlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                    />
                </StyledCalendar>
            </Paper>
        </Stack>
    )
}

export default AvailableDateCalendar
