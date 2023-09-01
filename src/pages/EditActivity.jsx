import { useContext, useEffect, useId, useState } from "react";
import { IconSelector } from "../components/IconSelector";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import "./AddActivity.css";

export const EditActivity = () => {
  const { id } = useParams("id");
  const { getActivity, updateActivity, deleteActivity } =
    useContext(ActivityContext);
  const [activityName, setActivityName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("");
  const [icon, setIcon] = useState("✅");

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const activity = getActivity(id);
      setActivityName(activity.name);
      setDailyGoal(activity.goal);
      setIcon(activity.icon);
    }
  }, [id]);

  const update = () => {
    updateActivity(id, activityName, dailyGoal, icon);
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
            onClick={update}
            text="Done"
            type="primary"
          />
          <Button
            onClick={() => {
              deleteActivity(id);
              navigate("/");
            }}
            text="Delete Activity"
            type="scary"
          />
        </div>
      </form>
    </main>
  );
};
