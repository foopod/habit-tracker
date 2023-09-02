import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddActivity } from "./pages/AddActivity";
import { ActivityContextProvider } from "./context/ActivityContext";
import { EditActivity } from "./pages/EditActivity";
import "./main.css";
import { Calendar } from "./pages/Calendar";
import { SettingsPage } from "./pages/SettingsPage";
import { AboutPage } from "./pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/add",
    element: <AddActivity />,
  },
  {
    path: "/edit/:id",
    element: <EditActivity />,
  },
  {
    path: "/calendar/:id",
    element: <Calendar />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ActivityContextProvider>
      <RouterProvider router={router} />
    </ActivityContextProvider>
  </React.StrictMode>
);
