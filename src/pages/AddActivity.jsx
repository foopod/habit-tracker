import { useContext, useId, useState } from "react";
import { IconSelector } from "../components/IconSelector";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate } from "react-router";
import "./AddActivity.css";
import { Button } from "../components/Button";
import { v4 as uuidv4 } from "uuid";

export const AddActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("");
  const [icon, setIcon] = useState("✅");
  const { addActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const add = () => {
    const activity = {
      name: activityName,
      goal: dailyGoal,
      icon,
      data: [],
      id: uuidv4(),
    };
    addActivity(activity);
    navigate("/");
  };

  return (
    <main>
      <form className="container">
        <h1>Add Activity</h1>
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
        <div className="button-container">
          <Button
            disabled={activityName.length < 1 || dailyGoal.length < 1}
            onClick={add}
            text="Add"
            type="primary"
          />
          <Button
            onClick={() => {
              console.log("back");
              navigate("/");
            }}
            text="Back"
            type="secondary"
          />
        </div>
      </form>
    </main>
  );
};
