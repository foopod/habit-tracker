import { useState } from "react";
import { useNavigate } from "react-router";
import { IconSelector } from "./IconSelector";
import { Button } from "./Button";
import "./ActivityForm.css";

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

  const isDisabled = () => {
    if (activityName.length < 1 || dailyGoal.length < 1) {
      return true;
    }
    // not a number
    const goalNumber = Number(dailyGoal);
    if (Number.isNaN(goalNumber)) {
      return true;
    }
    // less than one
    if (goalNumber < 1) {
      return true;
    }
    // decimals?
    if (goalNumber % 1 !== 0) {
      return true;
    }

    return false;
  };

  return (
    <main>
      <form className="add-activity-container">
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
          min={1}
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
              disabled={isDisabled()}
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
