import React, { useState, useEffect } from "react";
import "./Notifications.css"; // 스타일을 위한 CSS 파일
import { Button } from "@mui/base";
import Notifier from "./Notifier";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Stack from "@mui/material/Stack";

// 단일 리스트 아이템 컴포넌트
const ListItem = ({ text, isEnabled, onToggle }) => {
  return (
    <div className="list-item">
      <div className="todo-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M12 21.75C13.1 21.75 14 20.85 14 19.75H10C10 20.85 10.89 21.75 12 21.75ZM18 15.75V10.75C18 7.68 16.36 5.11 13.5 4.43V3.75C13.5 2.92 12.83 2.25 12 2.25C11.17 2.25 10.5 2.92 10.5 3.75V4.43C7.63 5.11 6 7.67 6 10.75V15.75L4 17.75V18.75H20V17.75L18 15.75Z"
            fill="#799E7D"
          />
        </svg>
        <span className="todo-content">{text}</span>
      </div>

      <label className="switch">
        <input type="checkbox" checked={isEnabled} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

// 전체 리스트를 표시하는 컴포넌트
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    "스트레칭 알림": false,
    "산책 알림": false,
    "물 마시기 알림": false,
    "눈 운동 알림": false,
    "화면과의 거리 조절 알림": false,
  });

  // 상태가 바뀔 때마다 실행될 useEffect 훅
  useEffect(() => {
    console.log(settings);
  }, [settings]);

  const toggleSwitch = (text) => {
    setSettings((prevSettings) => {
      // 새로운 상태 객체 생성
      const newSettings = {
        ...prevSettings,
        [text]: !prevSettings[text],
      };

      // 상태 업데이트
      return newSettings;
    });
  };

  return (
    <div className="noti-container">
      <div className="settings">
        <h2 className="title">나의 알림</h2>
        <Stack direction="column" spacing={2}>
          {Object.entries(settings).map(([text, isEnabled], index) => (
            <ListItem
              key={index}
              text={text}
              isEnabled={isEnabled}
              onToggle={() => toggleSwitch(text)}
            />
          ))}
        </Stack>

        {settings["스트레칭 하기"] ? (
          <Notifier message={"스트레칭을 할 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        {settings["산책 다녀오기"] ? (
          <Notifier message={"산책 다녀올 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        {settings["물 마시기"] ? (
          <Notifier message={"물 마실 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        {settings["눈 운동하기"] ? (
          <Notifier message={"눈 운동할 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
