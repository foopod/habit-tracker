import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import { Activity } from "./Activity";
import "./ActivityList.css";

export const ActivityList = ({ mode }) => {
  const { activities } = useContext(ActivityContext);
  return (
    <div className="activity-list">
      {activities.length > 0 ? (
        activities.map((activity) => {
          return <Activity key={activity.id} activity={activity} mode={mode} />;
        })
      ) : (
        <p>You have no activities.</p>
      )}
    </div>
  );
};
