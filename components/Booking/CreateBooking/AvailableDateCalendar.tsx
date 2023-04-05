import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react'; // => request placed at the top

import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { LoadingButton } from '@mui/lab'
import { Stack, Paper, Typography, Divider, Grid } from '@mui/material'
import Label, { LabelColor } from '@sentry/components/label'
import useDateRangePicker from '@sentry/components/date-range-picker'
import { format } from 'date-fns'
import { lowerCase } from 'lodash'
import { CalendarToolbar, StyledCalendar } from './Calendar';
import useResponsive from '@sentry/hooks/useResponsive';
import { useEffect, useRef, useState } from 'react';

const constant = {
    AvailableDateCalendar: 'Book summary',
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
interface IAvailableDateCalendarProps {
}
function AvailableDateCalendar({
}: IAvailableDateCalendarProps) {
  const isDesktop = useResponsive('up', 'sm');
  const picker = useDateRangePicker(null);

  const [date, setDate] = useState(new Date());

  const [openFilter, setOpenFilter] = useState(false);

  const [filterEventColor, setFilterEventColor] = useState<string[]>([]);

  const [view, setView] = useState<ICalendarViewValue>(isDesktop ? 'dayGridMonth' : 'listWeek');
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: ICalendarViewValue) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };
    return (
        <Stack spacing={5}>
            <Paper elevation={9} sx={{ borderRadius: 2, p: 3 }}>
              
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
              onOpenFilter={handleOpenFilter}
            />
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              allDayMaintainDuration
              eventResizableFromStart
              // events={dataFiltered}
              // initialEvents={events}
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              height={isDesktop ? 720 : 'auto'}
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
