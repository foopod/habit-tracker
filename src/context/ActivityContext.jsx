import { createContext, useEffect, useReducer, useState } from "react";
import { cloneDeep } from "lodash";

export const ActivityContext = createContext({
  activities: [],
});

const updateLocalStorage = (activities) => {
  localStorage.setItem("activities", JSON.stringify(activities));
};

const reducer = (activities, action) => {
  if (action.type === "add_activity") {
    const updatedActivities = [...activities, action.payload.activity];
    updateLocalStorage(updatedActivities);
    return updatedActivities;
  }

  if (action.type === "update_activity") {
    const updatedActivities = cloneDeep(activities);
    const activity = updatedActivities.find(
      (activity) => activity.id === action.payload.id
    );
    activity.name = action.payload.name;
    activity.goal = action.payload.goal;
    activity.icon = action.payload.icon;
    updateLocalStorage(updatedActivities);
    return updatedActivities;
  }

  if (action.type === "delete_activity") {
    const updatedActivities = activities.filter((activity) => {
      return !(activity.id === action.payload.id);
    });
    updateLocalStorage(updatedActivities);
    return updatedActivities;
  }

  if (action.type === "add_progress") {
    const updatedActivities = cloneDeep(activities);
    const activity = updatedActivities.find(
      (activity) => activity.id === action.payload.id
    );
    let day = activity.data.find((data) => data.date === action.payload.date);
    if (!day) {
      day = {
        count: 0,
        date: action.payload.date,
        goal: activity.goal,
      };
      activity.data.push(day);
    }
    day.count += 1;
    updateLocalStorage(updatedActivities);
    return updatedActivities;
  }

  if (action.type === "initialise_data") {
    updateLocalStorage(action.payload.activities);
    return action.payload.activities;
  }
};

export const ActivityContextProvider = ({ children }) => {
  const [activities, dispatchActivityChange] = useReducer(reducer, []);
  const [installPrompt, setInstallPrompt] = useState(null);

  const addActivity = (activity) => {
    dispatchActivityChange({ type: "add_activity", payload: { activity } });
  };

  const deleteActivity = (id) => {
    dispatchActivityChange({ type: "delete_activity", payload: { id } });
  };

  const updateActivity = (id, name, goal, icon) => {
    dispatchActivityChange({
      type: "update_activity",
      payload: { id, name, goal, icon },
    });
  };

  const getActivity = (id) => {
    return activities.find((activity) => activity.id === id);
  };

  const addProgress = (id, date) => {
    dispatchActivityChange({ type: "add_progress", payload: { id, date } });
  };

  const initialiseData = (data) => {
    dispatchActivityChange({
      type: "initialise_data",
      payload: { activities: data },
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("activities");
    if (data) {
      initialiseData(JSON.parse(data));
    }
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      alert("s");
      // Save the event because you'll need to trigger it later.
      setInstallPrompt(e);
    });
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        installPrompt,
        addActivity,
        addProgress,
        getActivity,
        updateActivity,
        deleteActivity,
        activities,
        initialiseData,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
