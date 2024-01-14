import React from "react";
import TodoList from "../components/TodoList";
import ReactCalendar from "../components/ReactCalendar";
import '../components/TodoList.css';

const items = [
  { id: 1, text: '물 마시기', checked: false, icon: '💧' },
  { id: 2, text: '비타민 먹기', checked: false, icon: '💊' },
];


function ToDo() {

  return (
    <div>
      <div>This is Todo page</div>
      <TodoList title="투두리스트" items={items} />
      <div className="calendar-container">
        <ReactCalendar />
      </div>
    </div>
  );
}

export default ToDo;
