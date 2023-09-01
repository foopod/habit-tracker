import { Link, useNavigate } from "react-router-dom";
import { ActivityList } from "../components/ActivityList";
import { Button } from "../components/Button";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const goToAddActivity = () => {
    navigate("/add");
  };

  return (
    <div className="home-container">
      <h1>My Activities</h1>
      <ActivityList />
      <div className="sticky-button">
        <Button onClick={goToAddActivity} text={"Add Activity"} />
      </div>
    </div>
  );
};
