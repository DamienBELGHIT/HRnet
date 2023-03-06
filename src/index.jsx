import React from "react"
import ReactDOM from "react-dom/client"
import NewEmployee from "./pages/NewEmployee"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./index.css"
import ListEmployee from "./pages/ListEmployees"
import { Provider } from "react-redux"
import store from "./utils/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/" element={<NewEmployee />} />
            <Route path="employee-list" element={<ListEmployee />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
)
