import React from 'react';
import ReactCalendar from '../components/ReactCalendar'; // 새로운 경로에 따라 수정
import NotificationSettings from '../components/Notifications';
import UserProfile from '../components/UserProfile';
import MyProfile from '../components/MyProfile';
import TodoList from '../components/TodoList';

const items = [
  { id: 1, text: '물 마시기', checked: false, icon: '💧' },
  { id: 2, text: '비타민 먹기', checked: false, icon: '💊' },
];

function Login() {
    return (
        <div>
          <h1>My Custom Calendar</h1>
          <ReactCalendar/>
          <UserProfile/>
          <MyProfile/>
          <TodoList title="투두리스트" items={items} />
          <NotificationSettings/>
        </div>
      );
}

export default Login;
