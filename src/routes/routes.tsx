import { createBrowserRouter, Navigate } from "react-router";
import { HabitTracker, MedicalOrganizer, PaysheetOrganizer, NotFound } from "../pages";
import { AppLayout } from '../layouts';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/paysheet-organizer" replace />,
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
        element: <PaysheetOrganizer />,
        handle: {
          title: "Paysheet Organizer",
          subtitle: "Organize fortnight income",
        },
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />
  },
]);

export default router