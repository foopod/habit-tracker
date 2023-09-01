import { format } from "date-fns";
import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import "./Activity.css";
import { ActivityData } from "./ActivityData";
import { Button } from "./Button";
import { useNavigate } from "react-router";

export const Activity = ({ activity, mode }) => {
  const { addProgress } = useContext(ActivityContext);
  const navigate = useNavigate();

  let today = activity.data.find((day) => {
    return day.date === format(new Date(), "dd/MM/yyyy");
  });

  if (!today) {
    today = { count: 0, date: format(new Date(), "dd/MM/yyyy") };
  }

  return (
    <div className="activity-container">
      <span className="activity-icon">{activity.icon}</span>
      <ActivityData activity={activity} count={today.count} />
      {mode === "display" && (
        <button
          onClick={() => {
            addProgress(activity.id, today.date);
          }}
          className="activity-add-one"
        >
          +
        </button>
      )}
      {mode === "edit" && (
        <div className="activity-edit-button">
          <Button
            onClick={() => {
              navigate(`/edit/${activity.id}`);
            }}
            text={"Edit"}
          />
        </div>
      )}
    </div>
  );
};
