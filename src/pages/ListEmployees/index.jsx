import { Link } from "react-router-dom"
import "./index.css"
import DataTable from "../../components/DataTable"
import { selectEmployees } from "../../utils/selectors"
import { useSelector } from "react-redux"

export default function ListEmployee() {
  const employeesData = useSelector(selectEmployees)
  return (
    <main>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <DataTable
          data={employeesData.employeesList}
          columns={[
            { title: "First Name", data: "firstName" },
            { title: "Last Name", data: "lastName" },
            { title: "Start Date", data: "startDate" },
            { title: "Department", data: "department" },
            { title: "Date of Birth", data: "dateOfBirth" },
            { title: "Street", data: "street" },
            { title: "City", data: "city" },
            { title: "State", data: "state" },
            { title: "Zip Code", data: "zipCode" },
          ]}
        />
        <Link to="/">Home</Link>
      </div>
    </main>
  )
}
