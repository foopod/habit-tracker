import { useContext } from "react";
import { Button } from "../components/Button";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SettingsPage = () => {
  const { activities, initialiseData } = useContext(ActivityContext);
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

  const uploadData = () => {
    const uploader = document.createElement("input");
    uploader.setAttribute("type", "file");
    uploader.setAttribute("accept", ".json");
    document.body.appendChild(uploader);
    uploader.onchange = (e) => {
      const reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(e.target.files[0]);
    };
    uploader.click();
  };

  const onReaderLoad = (e) => {
    if (e.target.readyState != 2) return;
    if (e.target.error) {
      alert("Error reading file.");
    }
    const fileContent = JSON.parse(e.target.result);
    initialiseData(fileContent);
    toast.success("Upload Complete", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="settings-container">
        <p>Export Data</p>
        <Button onClick={downloadData} text={"Download"} />
        <p>Import Data</p>
        <Button onClick={uploadData} text={"Upload"} />
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
