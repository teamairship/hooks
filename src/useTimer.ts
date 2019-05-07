import { useEffect, useState } from "react";

const useDataFetch = (total: number) => {
  const [seconds, setSeconds] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("0");
  const [hours, setHours] = useState<string>("0");
  const [days, setDays] = useState<string>("0");

  function calculateTime() {
    const days = Math.floor(total / (60 * 60 * 24));
    const hours = Math.floor((total % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((total % (60 * 60)) / 60);
    const seconds = Math.floor(total % 60);
    formatTimeSegment(days, setDays);
    formatTimeSegment(hours, setHours);
    formatTimeSegment(minutes, setMinutes);
    formatTimeSegment(seconds, setSeconds);
  }

  function formatTimeSegment(
    n: number,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (n < 10) {
      setter(`0${n}`);
    } else {
      setter(`${n}`);
    }
  }

  useEffect(() => {
    calculateTime();
  }, [total]);

  return { days, hours, minutes, seconds };
};

export default useDataFetch;
