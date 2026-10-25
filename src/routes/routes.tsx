import { createBrowserRouter, Navigate } from "react-router";
import { HabitTracker, MedicalOrganizer, NotFound, Distribution, NewReport, MyReports, Login, UsernameSetup } from "../pages";
import { AppLayout, AuthLayout, PaysheetOrganizerLayout } from "../layouts";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "username",
            element: <UsernameSetup />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: (
              <Navigate
                to="/paysheet-organizer/distribution"
                replace
              />
            ),
          },
          {
            path: "/habit-tracker",
            element: <HabitTracker />,
            handle: {
              title: "Habit Tracker",
              subtitle: "Track habits through month",
            },
          },
          {
            path: "/medical-organizer",
            element: <MedicalOrganizer />,
            handle: {
              title: "Medical Organizer",
              subtitle: "Organize medicine schedules",
            },
          },
          {
            path: "/paysheet-organizer",
            element: <PaysheetOrganizerLayout />,
            handle: {
              title: "Paysheet Organizer",
              subtitle: "Organize fortnight income",
            },
            children: [
              {
                path: "distribution",
                element: <Distribution />,
              },
              {
                path: "new-report",
                element: <NewReport />,
              },
              {
                path: "my-reports",
                element: <MyReports />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;