import ProgressBar from "@ramonak/react-progress-bar";
import { getRandom } from "../util/crypto";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ActivityData = ({ activity, count }) => {
  const { theme } = useContext(ThemeContext);

  const getProps = () => {
    const props = [
      "Awesome!",
      "Great job!",
      "Nice work!",
      "Heck Yes!",
      "Boo yah!",
      "GG.",
      "I'm impressed!",
      "Way to go!",
      "That's dope!",
      "Muy Bien!",
      "Terrific!",
      "Noice!",
      "Superb!",
    ];
    return props[
      Math.floor(getRandom(activity.id + activity.date) * props.length)
    ];
  };

  const getProgress = () => {
    if (count < activity.goal) {
      return (
        <>
          <ProgressBar
            bgColor="var(--primary-color)"
            baseBgColor={theme === "dark" ? "gray" : "lightgray"}
            completed={(count / activity.goal) * 100}
            isLabelVisible={false}
            height={"18px"}
            margin={"5px 0"}
          />
          <p className="activity-hint">only {activity.goal - count} to go</p>
        </>
      );
    } else if (count > activity.goal) {
      return (
        <>
          <ProgressBar
            bgColor="var(--primary-color)"
            baseBgColor="var(--highlight-color)"
            completed={(activity.goal / count) * 100}
            isLabelVisible={false}
            height={"18px"}
            margin={"5px 0"}
          />
          <p className="activity-hint">
            {getProps(activity.name)} {count - activity.goal} over your goal
          </p>
        </>
      );
    } else {
      return (
        <>
          <ProgressBar
            bgColor="var(--primary-color)"
            baseBgColor={theme === "dark" ? "gray" : "lightgray"}
            completed={(count / activity.goal) * 100}
            isLabelVisible={false}
            height={"18px"}
            margin={"5px 0"}
          />
          <p className="activity-hint">{getProps()}</p>
        </>
      );
    }
  };

  return (
    <div className="activity-data">
      <p className="activity-name">{activity.name}</p>
      {getProgress()}
    </div>
  );
};
