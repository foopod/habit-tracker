import { useContext, useId, useState } from "react";
import { IconSelector } from "../components/IconSelector";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate, useParams } from "react-router";
import "./AddActivity.css";
import { Button } from "../components/Button";
import { v4 as uuidv4 } from "uuid";
import { ActivityForm } from "../components/ActivityForm";

export const AddActivity = () => {
  const { addActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const add = (activity) => {
    const newActivity = {
      name: activity.name,
      goal: activity.goal,
      icon: activity.icon,
      data: [],
      id: uuidv4(),
    };
    addActivity(newActivity);
    navigate("/");
  };

  return <ActivityForm onComplete={add} />;
};
