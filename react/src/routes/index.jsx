import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Userinput from "../components/Userinput.jsx";
import Landingpage from "../components/Landingpage.jsx";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
    return (
        <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <Navigate to="/login" replace />
            </SignedOut>
        </>
    );
};

// Public Route wrapper component
const PublicRoute = ({ children }) => {
    return (
        <>
            <SignedIn>
                <Navigate to="/home" replace />
            </SignedIn>
            <SignedOut>{children}</SignedOut>
        </>
    );
};

// Root Route wrapper component
const RootRoute = ({ children }) => {
    return (
        <>
            <SignedIn>
                <Navigate to="/home" replace />
            </SignedIn>
            <SignedOut>{children}</SignedOut>
        </>
    );
};

export const routes = [
    {
        path: "/",
        element: <RootRoute><Landingpage /></RootRoute>,
    },
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        path: "/sign-up",
        element: <PublicRoute><SignUp /></PublicRoute>,
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <Userinput />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]; 