"use client";
import LoadingScreen from "components/common/LoadingScreen";
import Sidebar from "components/dashboard/Sidebar";
import Navbar from "components/landingPage/Navbar";
import { useState } from "react";

export default function page() {
  const [change, setChange] = useState(false);
  return (
    <div>
      <button onClick={() => setChange(!change)}>change</button>
      {change ? <Navbar /> : <LoadingScreen />}
    </div>
  );
}
