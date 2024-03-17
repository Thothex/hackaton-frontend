import { useState } from "react";
import { Calendar as MyCalendar } from "react-calendar";
import "./styles.scss";

function Calendar() {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));

  const handleDateChange = (data) => {
    setDate(data.toLocaleDateString("en-US"));
  };

  return (
    <div>
      <MyCalendar
        onChange={handleDateChange}
        value={date}
        locale="en"
        minDetail="month"
        prev2Label=""
        next2Label=""
      />
    </div>
  );
}

export default Calendar;
