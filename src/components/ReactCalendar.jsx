import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";
import moment from "moment";
import TodoList from "./TodoList";

function ReactCalendar(props) {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [todoCounts, setTodoCounts] = useState({});
  const [showText, setShowText] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showText) {
        setShowText(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showText]);

  const handleDateChange = (newValue) => {
    onChange(newValue);
    const formattedDate = moment(newValue).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setShowText(true);
  };

  const handleDayClick = (value, event) => {
    console.log("Clicked at: X =", event.clientX, "Y =", event.clientY); // 콘솔에 좌표 출력
    setTextPosition({ x: event.clientX, y: event.clientY });
    handleDateChange(value); // 날짜 변경 처리
  };


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
        onClickDay={handleDayClick}// 이벤트 핸들러를 handleDateChange로 변경
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
      {showText && (
        <div
          style={{
            position: "absolute",
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            background: "rgba(255, 255, 255, 0.5)",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(16px)"
          }}
        >
          <TodoList title={selectedDate} items={[]} date={selectedDate} />
        </div>
      )}
    </div>
  );
}

export default ReactCalendar;