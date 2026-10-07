import { createBrowserRouter, Navigate } from "react-router";
import { HabitTracker, MedicalOrganizer, NotFound, Distribution, NewReport, MyReports } from "../pages";
import { AppLayout, PaysheetOrganizerLayout } from '../layouts';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/paysheet-organizer/distribution" replace />,
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
            path: 'distribution',
            element: <Distribution />
          },
          {
            path: 'new-report',
            element: <NewReport />
          },
          {
            path: 'my-reports',
            element: <MyReports />
          }
        ]
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />
  },
]);

export default router