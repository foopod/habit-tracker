import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddActivity } from "./pages/AddActivity";
import { ActivityContextProvider } from "./context/ActivityContext";
import { EditActivity } from "./pages/EditActivity";
import "./main.css";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ActivityContextProvider>
      <RouterProvider router={router} />
    </ActivityContextProvider>
  </React.StrictMode>
);
