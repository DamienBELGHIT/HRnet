import { useState } from "react"
import { Link } from "react-router-dom"
import Dropdown from "../../components/Dropdown"
import Modal from "../../components/Modal"
import { states } from "../../assets/data/states"
import { departments } from "../../assets/data/departments"
import { addEmployee } from "../../features/employees"
import "./index.css"
import { useDispatch } from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function NewEmployee() {
  const dispatch = useDispatch()

  const statesName = states.map((state) => state.name)

  const [modalVisible, setModalVisible] = useState(false)
  const [department, setDepartment] = useState(departments[0])
  const [stateUS, setStateUS] = useState(statesName[0])
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())

  function formatDate(date) {
    let year = date.getFullYear()
    let month = (1 + date.getMonth()).toString().padStart(2, "0")
    let day = date.getDate().toString().padStart(2, "0")

    return month + "/" + day + "/" + year
  }

  const handleSubmit = (e) => {
    setModalVisible(true)
    e.preventDefault()

    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const street = e.target.street.value
    const city = e.target.city.value
    const zipCode = e.target.zipCode.value
    const state =
      states[states.findIndex((stateElem) => stateElem.name === stateUS)]
        .abbreviation

    const employee = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: formatDate(dateOfBirth),
      startDate: formatDate(startDate),
      department: department,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    }

    dispatch(addEmployee(employee))

    e.target.reset()
  }

  return (
    <main>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" name="street" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" name="city" />

            <label htmlFor="state">State</label>

            <Dropdown
              options={statesName}
              onValueChange={(val) => setStateUS(val)}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" name="zipCode" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Dropdown
            options={departments}
            name="department"
            onValueChange={(val) => setDepartment(val)}
          />
          <input type="submit" value="Save" />
        </form>
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        Employee Created !
      </Modal>
    </main>
  )
}
