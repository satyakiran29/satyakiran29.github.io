import { useEffect, useState } from "react";

const getIstSnapshot = () => {
  const now = new Date();
  const timeText = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const hour24 = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(now)
  );

  const isOnlineHours = hour24 >= 9 && hour24 < 23;

  return {
    timeText,
    isOnlineHours,
    statusLabel: isOnlineHours ? "Active hours" : "Off hours",
  };
};

export const useIstStatus = () => {
  const [status, setStatus] = useState(getIstSnapshot);

  useEffect(() => {
    const id = setInterval(() => {
      setStatus(getIstSnapshot());
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return status;
};
