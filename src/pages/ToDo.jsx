import React from "react";
import TodoList from "../components/TodoList";
import ReactCalendar from "../components/ReactCalendar";
import '../components/TodoList.css';

const items = [];

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
