import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from './theme';
import { AuthProvider } from './contexts';
import router from "./routes/routes.tsx";
import './index.css'

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)