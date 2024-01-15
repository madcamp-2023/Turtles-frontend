import React, { useState, useEffect } from "react";
import "./Notifications.css"; // 스타일을 위한 CSS 파일
import { Button } from "@mui/base";
import Notifier from "./Notifier";

// 단일 리스트 아이템 컴포넌트
const ListItem = ({ icon, text, isEnabled, onToggle }) => {
  return (
    <div className="list-item">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
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
    "스트레칭 하기": false,
    "산책 다녀오기": false,
    "물 마시기": false,
    "눈 운동하기": false,
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
    <div className="settings">
      <h2 className="title">나의 알림</h2>
      {Object.entries(settings).map(([text, isEnabled], index) => (
        <ListItem
          key={index}
          icon={"🔔"}
          text={text}
          isEnabled={isEnabled}
          onToggle={() => toggleSwitch(text)}
        />
      ))}
      <div className="button-container">
        <Button>개발 시작하기</Button>
      </div>
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
  );
};

export default NotificationSettings;
