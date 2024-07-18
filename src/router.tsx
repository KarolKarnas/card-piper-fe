import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import App from "./App"
import { Paths } from "./types/router"
import { SignIn } from "./pages/sign-in/sign-in"
import { Home } from "./pages/home/home"
import { QuotesPage } from "./pages/quotes/quotes"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.HOME} element={<App />}>
      <Route index={true} path={Paths.HOME} element={<Home />}></Route>
      <Route path={Paths.SIGN_IN} element={<SignIn />}></Route>
      <Route path={Paths.QUOTES} element={<QuotesPage />}></Route>
    </Route>,
  ),
)
