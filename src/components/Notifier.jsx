// Notifier.jsx
import { logDOM } from "@testing-library/react";
import React, { useEffect } from "react";

function Notifier({ message, interval }) {
  useEffect(() => {
    const notificationOptions = {
      icon: "https://github.com/madcamp-2023/w3-essh-frontend/assets/79096116/64bf7473-c399-40a1-8ec9-c479b931c973",
    };
    const notificationInterval = setInterval(() => {
      // Use native notification API
      if (Notification.permission === "granted") {
        new Notification(message, notificationOptions);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(message);
          }
        });
      }
    }, interval * 60 * 1000); // n minutes * n seconds * 1000 milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(notificationInterval);
  }, [message, interval]);

  return null; // No need for a placeholder component
}

export default Notifier;
