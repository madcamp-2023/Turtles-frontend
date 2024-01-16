import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";
import moment from "moment";

function ReactCalendar(props) {
  const [value, onChange] = useState(new Date());
  const [todoCounts, setTodoCounts] = useState({});

  useEffect(() => {
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const uid = props.uid || localStorage.getItem("uid");
    const today = new Date();
    const isoString = today.toISOString();
    const yyyyMM = isoString.substring(0, 7);
    const getTodoRecord = async () => {
      try {
        const response = await fetch(
          `${localPort}/todo?uid=${uid}&date=${yyyyMM}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        let dateCounts = {};
        const todayDate = new Date().toISOString().split("T")[0]; // 오늘 날짜를 구함

        data.todos.forEach((todo) => {
          const date = todo.date.split("T")[0];
          if (date !== todayDate) {
            // 오늘 날짜를 제외
            todo.todos.forEach((item) => {
              if (item.todo_complete) {
                if (!dateCounts[date]) {
                  dateCounts[date] = 0;
                }
                dateCounts[date] += 1;
              }
            });
          }
        });

        setTodoCounts(dateCounts);
        console.log(dateCounts);
      } catch (error) {
        console.error("Error fetching access todo:", error);
      }
    };
    getTodoRecord();
  }, []);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        locale="en-EN"
        formatDay={(local, date) => moment(date).format("D")}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const formattedDate = moment(date).format("YYYY-MM-DD");
            const value = todoCounts[formattedDate]; // todoCounts 상태 사용

            if (value != null) {
              if (value >= 10) {
                return "color-10-plus";
              } else if (value >= 7) {
                return "color-7-to-9";
              } else if (value >= 4) {
                return "color-4-to-6";
              } else if (value >= 0) {
                return "color-0-to-3";
              }
            }
          }
        }}
      />
    </div>
  );
}

export default ReactCalendar;
