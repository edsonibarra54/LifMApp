import { createBrowserRouter } from "react-router";
import HabitTracker from '../pages/HabitTracker.tsx';
import MedicalOrganizer from '../pages/MedicalOrganizer.tsx';
import PaysheetOrganizer from '../pages/PaysheetOrganizer.tsx';

const router = createBrowserRouter([
  {
    path: "/habit-tracker",
    element: <HabitTracker></HabitTracker>,
  },
  {
    path: "/medical-organizer",
    element: <MedicalOrganizer></MedicalOrganizer>,
  },
  {
    path: "/paysheet-organizer",
    element: <PaysheetOrganizer></PaysheetOrganizer>,
  },
]);

export default router