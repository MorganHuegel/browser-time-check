import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(null);
  const [utcTime, setUtcTime] = useState(null);
  const [isoTime, setIsoTime] = useState(null);

  const userAgent = window.navigator.userAgent;
  let browserName = "Could not detect";
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Google Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Microsoft Edge";
  }

  useEffect(() => {
    const updateTime = setInterval(() => {
      const now = new Date();
      const localTZ = now
        .toLocaleTimeString("en-us", { timeZoneName: "short" })
        .split(" ")[2];
      setTime(`${now.toDateString()} ${now.toLocaleTimeString()} (${localTZ})`);
      setUtcTime(now.toUTCString());
      setIsoTime(
        now
          .toISOString()
          .replace("T", " ")
          .slice(0, now.toISOString().lastIndexOf("."))
      );
    }, 1000);
    return () => clearInterval(updateTime);
  }, []);

  return (
    <div className="app">
      <header>
        <h2>What time does your browser have?</h2>
      </header>
      <div className="text-row">
        <p>Browser</p>
        <p className="time-box">{browserName}</p>
      </div>
      <div className="text-row">
        <p>Current local time</p>
        <p className="time-box">{time}</p>
      </div>
      <div className="text-row">
        <p>Current UTC time</p>
        <p className="time-box">{utcTime}</p>
      </div>
      <div className="text-row">
        <p>Current ISO time</p>
        <p className="time-box">{isoTime}</p>
      </div>
    </div>
  );
}

export default App;
