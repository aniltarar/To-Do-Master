import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import { MainRoutes } from "./routes/MainRoutes"
import { AuthRoutes } from "./routes/AuthRoutes"

function App() {
  const router = createBrowserRouter([AuthRoutes, MainRoutes], {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    }
  })


  return <RouterProvider router={router} future={{v7_startTransition:true}} />
}

export default App
