import { useState } from "react";
import { Calendar as MyCalendar } from "react-calendar";
import "./styles.scss";
import PropTypes from "prop-types";

function Calendar({onDateChange}) {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));

  const handleDateChange = (data) => {
    setDate(data.toLocaleDateString("en-US"));
    onDateChange(data);
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

Calendar.propTypes = {
  onDateChange: PropTypes.func,
};

export default Calendar;
