import MainLayout from "../layouts/MainLayout";
import Categories from "../pages/Category/Categories";
import HomeDash from "../pages/Home/HomeDash";
import Tasks from "../pages/Task/Tasks";

export const MainRoutes = {


    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/", element: <HomeDash />
        },
        {
            path: "/categories", element: <Categories />
        },
        {
            path: "/tasks", element: <Tasks />
        }
    ]


}