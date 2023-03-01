import { Link } from "react-router-dom"
import "./index.css"

export default function ListEmployee() {
  return (
    <main>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <table id="employee-table" className="display"></table>
        <Link to="/">Home</Link>
      </div>
    </main>
  )
}
