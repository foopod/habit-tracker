import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import "./AboutPage.css";
import { useEffect } from "react";

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>About</h1>
      <div className="about-container">
        <h2>Why?</h2>
        <p>
          I made this app to help manage habits that I want to build in my life.
        </p>
        <h2>How do I use this app?</h2>
        <p>
          Add an activity that you want to keep track of and set yourself a goal
          for how many times you want to achieve it each day.
        </p>
        <p>
          Try to limit yourself only one or two at a time. Once you have those
          down for a month or so, go ahead and add another.
        </p>
        <h2>How does it work?</h2>
        <p>Your data is just that, yours.</p>
        <p>
          It is stored on your device and we never send it anywhere. There are
          no ads or tracking.
        </p>
        <p>
          You will also notice that there is import/export functionality if you
          ever want to take your data somewhere else or make your own back-ups.
        </p>
        <h2>More Features</h2>
        <p>
          I am working on a calendar view at the moment, it is still
          experimental. But you can access it by clicking on the activity's
          emoji from the main list view. The idea is to give you a longer look
          at your activities over time.
        </p>
      </div>
      <div className="sticky-button">
        <Button
          onClick={() => {
            navigate("/");
          }}
          text={"Back"}
        />
      </div>
    </div>
  );
};
