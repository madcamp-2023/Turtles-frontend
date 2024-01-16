import React from "react";
import Alarm from "./Alarm";
import Stack from "@mui/material/Stack";
import MyProfile from "../components/MyProfile";
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
        <Stack direction="column" spacing={4}>
          <MyProfile />
          <Alarm />
        </Stack>
        <Stack spacing={4}>
          <ReactCalendar />
          <TodoList title="오늘의 건강 관리" items={items} />
        </Stack>
        <Following />
      </Stack>
    </>
  );
}
