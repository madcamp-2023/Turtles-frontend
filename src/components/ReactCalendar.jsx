import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ReactCalendar() {
    const [value, onChange] = useState(new Date());

    const dates = {
        '2024-01-10': 10,
        '2024-01-15': 7,
        '2024-01-20': 3,
    };

    const tileContent = ({ date, view }) => {
        const dateString = date.toISOString().split('T')[0];

        const value = dates[dateString];
        let backgroundColor = '#fff'; 
        if (value > 5) {
            backgroundColor = '#ff9999'; 
        } else if (value) {
            backgroundColor = '#99ff99'; 
        }

        return (
            <div style={{ height: '100%', backgroundColor }}>
                {/* 여기에 추가 컨텐츠를 넣을 수 있습니다. */}
            </div>
        );
    };

    return (
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          minDetail = "month"
          next2Label={null}
          prev2Label={null}
        />
      </div>
    );
}

export default ReactCalendar;
