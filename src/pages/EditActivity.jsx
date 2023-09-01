import { useContext, useEffect, useId, useState } from "react";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate, useParams } from "react-router";
import { ActivityForm } from "../components/ActivityForm";
import "./AddActivity.css";

export const EditActivity = () => {
  const { id } = useParams("id");
  const { getActivity, updateActivity, deleteActivity } =
    useContext(ActivityContext);
  const [activity, setActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const requestedActivity = getActivity(id);
      setActivity(requestedActivity);
    }
  }, [id, getActivity]);

  const update = (activity) => {
    updateActivity(id, activity.name, activity.goal, activity.icon);
    navigate("/");
  };

  const remove = () => {
    deleteActivity(id);
    navigate("/");
  };

  return (
    <>
      {activity && (
        <ActivityForm
          onComplete={update}
          onDelete={remove}
          activity={activity}
        />
      )}
    </>
  );
};
