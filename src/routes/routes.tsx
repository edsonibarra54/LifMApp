import { createBrowserRouter, Navigate } from "react-router";
import HabitTracker from '../pages/HabitTracker.tsx';
import MedicalOrganizer from '../pages/MedicalOrganizer.tsx';
import PaysheetOrganizer from '../pages/PaysheetOrganizer.tsx';
import App from '../App.tsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/paysheet-organizer" replace />,
      },
      {
        path: "/habit-tracker",
        element: <HabitTracker/>,
        handle: {
          title: 'Habit Tracker',
          subtitle: 'Track habits through month',
        },
      },
      {
        path: "/medical-organizer",
        element: <MedicalOrganizer/>,
        handle: {
          title: 'Medical Organizer',
          subtitle: 'Organize medicine schedules',
        },
      },
      {
        path: "/paysheet-organizer",
        element: <PaysheetOrganizer/>,
        handle: {
          title: 'Paysheet Organizer',
          subtitle: 'Organize fortnight income',
        },
      },
    ],
  }
]);

export default router