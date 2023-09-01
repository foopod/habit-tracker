import { format } from "date-fns";
import "./Activity.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const Activity = ({ activity }) => {
  const { addProgress } = useContext(ActivityContext);
  let today = activity.data.find((day) => {
    return day.date === format(new Date(), "dd/MM/yyyy");
  });

  if (!today) {
    today = { count: 0, date: format(new Date(), "dd/MM/yyyy") };
  }

  const getProps = () => {
    const props = [
      "Awesome!",
      "Great job!",
      "Nice work!",
      "Heck Yes!",
      "Boo yah!",
      "GG.",
      "I'm impressed!",
      "Way to go!",
      "That's dope!",
      "Muy Bien!",
      "Terrific!",
      "Noice!",
      "Superb!",
    ];
    return props[Math.floor(Math.random() * props.length)];
  };

  const getProgress = () => {
    if (today.count < activity.goal) {
      return (
        <>
          <ProgressBar
            bgColor="#414bb2"
            completed={(today.count / activity.goal) * 100}
            isLabelVisible={false}
          />
          <p className="activity-hint">
            only {activity.goal - today.count} to go
          </p>
        </>
      );
    } else if (today.count > activity.goal) {
      return (
        <>
          <ProgressBar
            bgColor="#414bb2"
            baseBgColor="#31E981"
            completed={(activity.goal / today.count) * 100}
            isLabelVisible={false}
          />
          <p className="activity-hint">
            {getProps()} {today.count - activity.goal} over your goal
          </p>
        </>
      );
    } else {
      return (
        <>
          <ProgressBar
            bgColor="#414bb2"
            completed={(today.count / activity.goal) * 100}
            isLabelVisible={false}
          />
          <p className="activity-hint">{getProps()}</p>
        </>
      );
    }
  };

  return (
    <div className="activity-container">
      <span className="activity-icon">{activity.icon}</span>
      <div className="activity-data">
        <p className="activity-name">{activity.name}</p>
        {getProgress()}
      </div>
      <button
        onClick={() => {
          addProgress(activity.id, today.date);
        }}
        className="activity-add-one"
      >
        +
      </button>
    </div>
  );
};
