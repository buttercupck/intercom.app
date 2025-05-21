import React from 'react';

const CalendarView = ({ visibleCalendars, onSelectJob }) => {
  const hours = Array.from({ length: 15 }, (_, i) => 6 + i); // 6AM to 8PM

  return (
    <div className="grid grid-cols-12 gap-1 border-t border-l">
      {hours.map(hour => (
        <div key={hour} className="relative border-b border-r flex flex-col items-center">
          <div className="absolute left-0 top-0 bg-gray-200 w-full text-center font-bold">{hour}:00</div>
          <div className="flex-1 w-full h-20 flex items-center justify-center border-t border-gray-300 hover:bg-blue-100 cursor-pointer"
               onClick={() => onSelectJob(hour)}>
            <div className="text-gray-500">Job Block</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
