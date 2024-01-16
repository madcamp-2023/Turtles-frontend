import React from "react";
import Alarm from "./Alarm";
import ToDo from "./ToDo";
import Social from "./Social";
import Stack from "@mui/material/Stack";
import MyProfile from "../components/MyProfile";
import UserProfile from "../components/UserProfile";
import ReactCalendar from "../components/ReactCalendar";
import TodoList from "../components/TodoList";
import Following from "../components/Following";
const items = [
  { id: 1, text: "물 마시기", checked: false, icon: "💧" },
  { id: 2, text: "비타민 먹기", checked: false, icon: "💊" },
];

export default function AllInOne() {
  return (
    <>
      <Stack direction="row" spacing={20}>
        <Stack direction="column">
          <MyProfile />
          <Alarm />
        </Stack>
        <Stack>
          <ReactCalendar />
          <TodoList title="todo-list" items={items} />
        </Stack>
        <Following />
      </Stack>
    </>
  );
}
