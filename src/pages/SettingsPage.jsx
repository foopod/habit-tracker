import { useContext } from "react";
import { Button } from "../components/Button";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../context/ThemeContext";

export const SettingsPage = () => {
  const { activities, initialiseData } = useContext(ActivityContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const downloadData = () => {
    const dataString =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(activities));
    const link = document.createElement("a");
    link.setAttribute("href", dataString);
    link.setAttribute("download", "activity-data.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const displayError = (err) => {
    toast.error(err.toString(), {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const uploadData = () => {
    try {
      const uploader = document.createElement("input");
      uploader.setAttribute("type", "file");
      uploader.setAttribute("accept", ".json");
      document.body.appendChild(uploader);
      uploader.onchange = (e) => {
        try {
          if (e.target.files[0].name.split(".").pop() !== "json") {
            throw new Error("Wrong file type");
          }
          const reader = new FileReader();
          reader.onload = onReaderLoad;
          reader.readAsText(e.target.files[0]);
        } catch (err) {
          displayError(err);
        }
      };
      uploader.click();
    } catch (err) {
      displayError(err);
    }
  };

  const onReaderLoad = (e) => {
    try {
      if (e.target.readyState != 2) return;
      if (e.target.error) {
        displayError(e.target.error);
      }
      const fileContent = JSON.parse(e.target.result);
      if (Array.isArray(fileContent)) {
        initialiseData(fileContent);
      } else {
        throw new Error("Wrong format");
      }
      toast.success("Upload Complete", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      displayError(err);
    }
  };

  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="settings-container">
        <p className="text">About this app</p>
        <Button
          onClick={() => navigate("/about")}
          text={"More"}
          type="secondary"
        />
        <p className="text">Change Theme</p>
        <Button
          onClick={toggleTheme}
          text={`Swap to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        />
        <p className="text">Export Data</p>
        <Button onClick={downloadData} text={"Download"} />
        <p className="text">Import Data</p>
        <Button onClick={uploadData} text={"Upload"} type={"scary"} />
        <p className="notice">* this will override all current activity data</p>
      </div>
      <ToastContainer position="top-center" theme="light" />
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
