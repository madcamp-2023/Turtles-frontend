import React from "react";
import Notifications from "../components/Notifications";
import { Button } from "@mui/base";
import Sidebar from "../components/Sidebar";
import Notifier from "../components/Notifier";

function Alarm() {
  return (
    <div>
      <div>This is Alarm page</div>
      <Notifications />
      {/* <Notifier interval={5} message={"notification in alarm"} /> */}
    </div>
  );
}

export default Alarm;
