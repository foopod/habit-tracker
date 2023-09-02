import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { HomePage } from "./HomePage";
import { AddActivity } from "./AddActivity";
import { EditActivity } from "./EditActivity";
import { Calendar } from "./Calendar";
import { SettingsPage } from "./SettingsPage";
import { AboutPage } from "./AboutPage";
import { ThemeContext } from "../context/ThemeContext";

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

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
};
