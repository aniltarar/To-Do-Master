import MainLayout from "../layouts/MainLayout";
import { roleLoader } from "../loader/roleLoader";
import Categories from "../pages/Category/Categories";
import HomeDash from "../pages/Home/HomeDash";
import NotFound from "../pages/NotFound/NotFound";
import TaskDetail from "../pages/Task/TaskDetail";
import Tasks from "../pages/Task/Tasks";

export const MainRoutes = {


    path: "/",
    element: <MainLayout />,

    children: [
        {
            path: "/", element: <HomeDash />, loader: () => roleLoader(["user",]),
        },
        {
            path: "/categories", element: <Categories />, loader: () => roleLoader(["user"]),
        },
        {
            path: "/tasks", element: <Tasks />, loader: () => roleLoader(["user"]),
        },
        {
            path: "/tasks/:id", element: <TaskDetail />, loader: () => roleLoader(["user"]),
        },
        {
            path: "*", element: <NotFound />
        }
    ]


}