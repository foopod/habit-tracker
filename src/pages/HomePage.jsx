import { Link, useNavigate } from "react-router-dom";
import { ActivityList } from "../components/ActivityList";
import { Button } from "../components/Button";
import "./HomePage.css";
import { useState } from "react";

export const HomePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("display");

  const goToAddActivity = () => {
    navigate("/add");
  };

  return (
    <div className="home-container">
      <h1>My Activities</h1>
      <ActivityList mode={mode} />
      {mode === "display" && (
        <div className="sticky-button-two">
          <Button
            onClick={() => {
              setMode("edit");
            }}
            text="Edit Activities"
            type="secondary"
          />
          <Button onClick={goToAddActivity} text={"Add Activity"} />
        </div>
      )}
      {mode === "edit" && (
        <div className="sticky-button">
          <Button
            onClick={() => {
              setMode("display");
            }}
            text="Back"
          />
        </div>
      )}
    </div>
  );
};
