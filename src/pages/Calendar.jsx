import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ActivityContext } from "../context/ActivityContext";
import { Button } from "../components/Button";
import "./Calendar.css";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Calendar = () => {
  const { id } = useParams();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [hasNextMonth, setHasNextMonth] = useState(false);
  const [hasPreviousMonth, setHasPreviousMonth] = useState(false);
  const { getActivity } = useContext(ActivityContext);
  const [activity, setActivity] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const requestedActivity = getActivity(id);
      if (requestedActivity) {
        setCurrentData(
          requestedActivity.data.filter((item) => {
            return (
              new Date(item.date).getMonth() === currentMonth &&
              new Date(item.date).getFullYear() === currentYear
            );
          })
        );
        setActivity(requestedActivity);
      }
    }
  }, [id, getActivity, currentMonth, currentYear]);

  useEffect(() => {
    // check for previous and future data
    if (activity) {
      const next = hasDataForMonth(
        activity.data,
        incrementMonth(currentMonth, currentYear)
      );
      const previous = hasDataForMonth(
        activity.data,
        decrementMonth(currentMonth, currentYear)
      );
      setHasNextMonth(next);
      setHasPreviousMonth(previous);
    }
  }, [activity, currentMonth, currentYear]);

  const incrementMonth = (month, year) => {
    if (month === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
    return { month, year };
  };

  const decrementMonth = (month, year) => {
    if (month === 0) {
      year -= 1;
      month = 11;
    } else {
      month -= 1;
    }
    return { month, year };
  };

  const hasDataForMonth = (data, { month, year }) => {
    return (
      data.filter((item) => {
        return (
          new Date(item.date).getMonth() === month &&
          new Date(item.date).getFullYear() === year
        );
      }).length > 0
    );
  };

  const renderDay = (day) => {
    const date = new Date(day.date);
    let emojiString = "";
    if (day.count > day.goal) {
      for (let i = 0; i < day.goal; i++) {
        emojiString += " " + activity.icon;
      }
      emojiString += " |";
      for (let i = 0; i < day.count - day.goal; i++) {
        emojiString += " " + activity.icon;
      }
    } else {
      for (let i = 0; i < day.count; i++) {
        emojiString += " " + activity.icon;
      }
    }

    return (
      <div className="calendar-row" key={date}>
        <p>{date.getDate()}</p>
        <p>{emojiString}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Calendar</h1>
      <div>
        <div className="calendar-pagination">
          <Button
            text={"<"}
            disabled={!hasPreviousMonth}
            onClick={() => {
              const prev = decrementMonth(currentMonth, currentYear);
              setCurrentMonth(prev.month);
              setCurrentYear(prev.year);
            }}
          />
          <h2>{months[currentMonth]}</h2>
          <Button
            text={">"}
            disabled={!hasNextMonth}
            onClick={() => {
              const prev = incrementMonth(currentMonth, currentYear);
              setCurrentMonth(prev.month);
              setCurrentYear(prev.year);
            }}
          />
        </div>
        {currentData &&
          currentData
            .sort((a, b) => new Date(a.date) > new Date(b.date))
            .map((item) => {
              return renderDay(item);
            })}
      </div>

      <div className="sticky-button">
        <Button
          onClick={() => {
            navigate("/");
          }}
          text="Back"
        />
      </div>
    </div>
  );
};
