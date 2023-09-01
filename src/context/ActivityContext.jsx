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

  if (action.type === "add_progress") {
    const activitiesCopy = cloneDeep(activities);
    const activity = activitiesCopy.find(
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
    updateLocalStorage(activitiesCopy);
    return activitiesCopy;
  }

  if (action.type === "initialise_data") {
    return action.payload.activities;
  }
};

export const ActivityContextProvider = ({ children }) => {
  const [activities, dispatchActivityChange] = useReducer(reducer, []);

  const addActivity = (activity) => {
    dispatchActivityChange({ type: "add_activity", payload: { activity } });
  };

  const addProgress = (id, date) => {
    dispatchActivityChange({ type: "add_progress", payload: { id, date } });
  };

  useEffect(() => {
    const data = localStorage.getItem("activities");
    if (data) {
      dispatchActivityChange({
        type: "initialise_data",
        payload: { activities: JSON.parse(data) },
      });
    }
  }, []);

  return (
    <ActivityContext.Provider value={{ addActivity, addProgress, activities }}>
      {children}
    </ActivityContext.Provider>
  );
};
