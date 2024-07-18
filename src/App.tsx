import { Outlet } from "react-router-dom"
import "./App.scss"
// import { Quotes } from "./components/quotes/Quotes"
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
        <Outlet />
    </div>
  )
}

export default App
