import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ActivityContext } from "../context/ActivityContext";
import { Button } from "../components/Button";
import "./Calendar.css";

export const Calendar = () => {
  const { id } = useParams();
  const currentMonth = new Date().getMonth();
  const { getActivity } = useContext(ActivityContext);
  const [activity, setActivity] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const requestedActivity = getActivity(id);
      setCurrentData(
        requestedActivity.data.filter((item) => {
          return (new Date(item.date).getMonth = currentMonth);
        })
      );
      setActivity(requestedActivity);
    }
  }, [id]);

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
    <div className="home-container">
      <h1>Calendar</h1>
      <div>
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
