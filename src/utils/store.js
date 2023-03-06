import employeesReducer from "../features/employees"
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
  reducer: {
    employees: employeesReducer,
  },
})
