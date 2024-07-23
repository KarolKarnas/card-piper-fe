import { Outlet } from "react-router-dom"
import "./App.scss"
// import { Quotes } from "./components/quotes/Quotes"
import logo from "./logo.svg"
import { Header } from "./components/header/header"

const App = () => {
  return (
    <div className="App">
    <Header />
        <Outlet />
    </div>
  )
}

export default App
