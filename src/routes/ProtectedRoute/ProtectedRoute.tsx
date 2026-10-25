import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks";
import { LoadingPage } from "../../pages";

export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return <LoadingPage />;
    }

    return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}