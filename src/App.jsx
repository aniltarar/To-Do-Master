import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import { MainRoutes } from "./routes/MainRoutes"
import {AuthRoutes} from "./routes/AuthRoutes"

function App() {
  const router = createBrowserRouter([AuthRoutes,MainRoutes])

  
  return <RouterProvider router={router} />
}

export default App
