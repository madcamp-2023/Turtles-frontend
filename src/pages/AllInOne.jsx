import React from "react";
import Alarm from "./Alarm";
import Stack from "@mui/material/Stack";
import MyProfile from "../components/MyProfile";
import ReactCalendar from "../components/ReactCalendar";
import TodoList from "../components/TodoList";
import Following from "../components/Following";
import GoogleSearch from "../components/GoogleSearch";

const items = [
];
const uid = localStorage.getItem("uid");

export default function AllInOne() {
  return (
    <>
      <Stack direction="column" spacing={8}>
        <GoogleSearch />
        <Stack direction="row" spacing={20}>
          <Stack direction="column" spacing={4}>
            <MyProfile />
            <Alarm />
          </Stack>
          <Stack spacing={4}>
            <ReactCalendar uid={uid} />
            <TodoList title="오늘의 건강 관리" items={items}/>
          </Stack>
          <Following />
        </Stack>
      </Stack>
    </>
  );
}
