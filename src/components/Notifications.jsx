//Notifications.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Notifications.css";
import { Button } from "@mui/base";
import Notifier from "./Notifier";
import WebCam from "./WebCam";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Stack from "@mui/material/Stack";

// 단일 리스트 아이템 컴포넌트
const ListItem = ({ text, isEnabled, onToggle }) => {
  return (
    <div className="list-item">
      <div className="todo-left">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
  <path d="M8 19.75C9.1 19.75 10 18.85 10 17.75H6C6 18.85 6.89 19.75 8 19.75ZM14 13.75V8.75C14 5.68 12.36 3.11 9.5 2.43V1.75C9.5 0.92 8.83 0.25 8 0.25C7.17 0.25 6.5 0.92 6.5 1.75V2.43C3.63 3.11 2 5.67 2 8.75V13.75L0 15.75V16.75H16V15.75L14 13.75Z" fill="#799E7D"/>
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
  const webCamRef = useRef();

  const handleOpenWebcam = () => {
    webCamRef.current.startVideo();
  };

  const handleCloseWebcam = () => {
    webCamRef.current.closeWebcam();
  };

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
      setSettings(newSettings);

      if (text === "화면과의 거리 조절 알림") {
        if (newSettings[text]) {
          handleOpenWebcam();
        } else {
          handleCloseWebcam();
        }
      }

      // 상태 업데이트
      return newSettings;
    });
  };

  return (
    <div className="noti-container">
      <div className="settings">
        <div className="noti-title">나의 알림</div>
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

        {settings["스트레칭 알림"] ? (
          <Notifier message={"스트레칭을 할 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        {settings["산책 알림"] ? (
          <Notifier message={"산책 다녀올 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        {settings["물 마시기 알림"] ? (
          <Notifier message={"물 마실 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        {settings["눈 운동 알림"] ? (
          <Notifier message={"눈 운동할 시간이에요!"} interval={60} />
        ) : (
          <></>
        )}
        <WebCam ref={webCamRef} />
      </div>
    </div>
  );
};

export default NotificationSettings;
