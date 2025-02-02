import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import App from "./App"
import { Paths } from "./types/router"
import { Home } from "./pages/home/home"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.HOME} element={<App />}>
      <Route index={true} path={Paths.HOME} element={<Home />}></Route>
    </Route>,
  ),
)
