import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const AuthRoutes = {
    path: "/auth",
    element: <AuthLayout />,
    children: [
        {
            path: "register",
            element: <Register />
        },
        {
            path: "login",
            element: <Login />
        }
    ]
}