// Notifier.jsx
import { logDOM } from "@testing-library/react";
import React, { useEffect } from "react";

function Notifier({ message, interval }) {
  useEffect(() => {
    const notificationOptions = {
      icon: "https://s3-alpha-sig.figma.com/img/a851/75e2/bc767d8e5b73b48d3b1c2466d005e108?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DIrnYhfuEmfTdE6EtNTJLbs5fwxmo4RAaO4bTqe9bb1yhPWiTwCOK5cx7XPCXAXUUoyBFJjoj5rGs2qWcOKWvMSngkEGMHBSQ3vOphDjltEF7US1~PSeX0NNc5MlG4Jn2bQd167U0ey4IyncMFfCLA1wN0ICZ79Eruw5gjvdv-qoA0HoP3ucZcrZWRvz1gQpAy2rjlpObujfCJQv7TJI~jfZILtKWr7Nf3waRj9QrLjwHRIo0~g0izGExduQlEbonUEagFINcLmQMfVwJbsr4eKRb6c8YXf6HUoO3J~PBI8NZ5cWYMftfBi38632uWn1nUjgGF7NqLH69RI0UsGLvg__",
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
