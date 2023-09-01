import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ActivityContext } from "../context/ActivityContext";
import { IconSelector } from "./IconSelector";
import { Button } from "./Button";

export const ActivityForm = ({ activity, onComplete, onDelete }) => {
  const [activityName, setActivityName] = useState(activity?.name || "");
  const [dailyGoal, setDailyGoal] = useState(activity?.goal || "");
  const [icon, setIcon] = useState(activity?.icon || "✅");
  const navigate = useNavigate();

  const update = () => {
    const newActivity = {
      name: activityName,
      goal: Number(dailyGoal),
      icon,
    };
    onComplete(newActivity);
    navigate("/");
  };

  return (
    <main>
      <form className="container">
        <h1>{activity ? "Edit Activity" : "Add Activity"}</h1>
        <label htmlFor="activityName">Activity Name</label>
        <input
          id="activityName"
          value={activityName}
          type="text"
          onChange={(e) => {
            setActivityName(e.target.value);
          }}
        />
        <label htmlFor="dailyGoal">Daily Goal</label>
        <input
          id="dailyGoal"
          value={dailyGoal}
          type="number"
          onChange={(e) => {
            setDailyGoal(e.target.value);
          }}
        />
        <IconSelector icon={icon} setIcon={setIcon} />
        {activity ? (
          <div className="button-container">
            <Button
              disabled={activityName.length < 1 || dailyGoal.length < 1}
              onClick={update}
              text="Done"
              type="primary"
            />
            <Button onClick={onDelete} text="Delete" type="scary" />
          </div>
        ) : (
          <div className="button-container">
            <Button
              disabled={activityName.length < 1 || dailyGoal.length < 1}
              onClick={update}
              text="Add"
              type="primary"
            />
            <Button
              onClick={() => {
                navigate("/");
              }}
              text="Back"
              type="secondary"
            />
          </div>
        )}
      </form>
    </main>
  );
};
