import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import GroupProvider from "./providers/GroupProvider.tsx";
import { MessageProvider } from "./providers/MessageProvider.tsx";
import App from "./App.tsx";
import Group from "./pages/Group.tsx";
import ExpenseProvider from "./providers/ExpenseProvider.tsx";
import Profile from "./pages/Profile.tsx";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

updateSW();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/group/:id",
        element: <Group />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <GroupProvider>
          <ExpenseProvider>
            <RouterProvider router={router} />
          </ExpenseProvider>
        </GroupProvider>
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>
);
