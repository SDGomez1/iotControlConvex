"use client";

import { useEffect, useState } from "react";

export default function LastCheckedOnline(props: {
  lastChecked: number | undefined;
}) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 60000);
  });

  let timeDifference = 0;
  if (props.lastChecked) {
    timeDifference = Math.floor((currentTime - props.lastChecked) / 60000);
    if (timeDifference < 0) {
      timeDifference = 0;
    } // Difference in minutes
  }
  return <>{timeDifference} minutos</>;
}
