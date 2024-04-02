import { useEffect, useState } from "react";
import { Calendar as MyCalendar } from "react-calendar";
import { useSelector } from "react-redux";
import "./styles.scss";
import PropTypes from "prop-types";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Calendar({ initialDate, onDateChange, getDatesToCurrentDisable }) {
  const { language } = useSelector((state) => state.language);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
    }
  }, [initialDate]);
  const handleDateChange = (data) => {
    setDate(data.toLocaleDateString("en-US"));
    onDateChange(data);
  };

  const formatMonthYear = (locale, date) => {
    const month = capitalizeFirstLetter(
      date.toLocaleString(locale, { month: "long" })
    );
    const year = date.toLocaleString(locale, { year: "numeric" });
    return `${month} ${year}`;
  };

  return (
    <div>
      <MyCalendar
        onChange={handleDateChange}
        value={date}
        tileDisabled={getDatesToCurrentDisable}
        locale={language}
        minDetail="month"
        prev2Label=""
        next2Label=""
        formatMonthYear={(locale, date) => formatMonthYear(locale, date)}
      />
    </div>
  );
}

Calendar.propTypes = {
  onDateChange: PropTypes.func,
  initialDate: PropTypes.string,
  getDatesToCurrentDisable: PropTypes.func,
};

export default Calendar;
