import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  employeesList: [],
}

const { actions, reducer } = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: {
      reducer: (draft, action) => {
        draft.employeesList.push(action.payload)
      },
    },
  },
})

export const { addEmployee } = actions
export default reducer
