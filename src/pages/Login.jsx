import React from 'react';
import ReactCalendar from '../components/ReactCalendar'; // 새로운 경로에 따라 수정
import NotificationSettings from '../components/Notifications';
import UserProfile from '../components/UserProfile';
import MyProfile from '../components/MyProfile';

function Login() {
    return (
        <div>
          <h1>My Custom Calendar</h1>
          <ReactCalendar/>
          <UserProfile/>
          <MyProfile/>

          <NotificationSettings/>
        </div>
      );
}

export default Login;
