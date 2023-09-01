import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import { Activity } from "./Activity";

export const ActivityList = () => {
  const { activities } = useContext(ActivityContext);
  return (
    <div>
      {activities.length > 0 ? (
        activities.map((activity) => {
          return <Activity key={activity.name} activity={activity} />;
        })
      ) : (
        <p>You have no activities.</p>
      )}
    </div>
  );
};
