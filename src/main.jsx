import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ActivityContextProvider } from "./context/ActivityContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./main.css";
import { App } from "./pages/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ActivityContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ActivityContextProvider>
  </React.StrictMode>
);
