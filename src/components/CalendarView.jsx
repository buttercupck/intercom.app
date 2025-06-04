import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({ jobs, onSelectJob }) => {
  const events = jobs.map((job) => {
    const start = new Date(job.requested_date);
    const end = new Date(start.getTime() + (job.duration || 120) * 60000); // duration in mins

    const interpreter = job.interpreters?.first_name
      ? `${job.interpreters.first_name} ${job.interpreters.last_name}`
      : 'Interpreter TBD';

    return {
      id: job.id,
      title: `${job.required_language} - ${interpreter} (Zoom)`, // Modality static for now
      start,
      end,
      resource: job,
    };
  });

  return (
    <div style={{ height: '100%' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => onSelectJob(event.resource)}
        defaultView="week"
        views={['week', 'day']}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default CalendarView;
