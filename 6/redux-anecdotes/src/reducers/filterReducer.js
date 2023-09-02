import { createSlice } from '@reduxjs/toolkit'

const initialState = { filterValue: ""}

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    filterChange(state, action) {
      const filterValuePayload = action.payload
      state = { filterValue: filterValuePayload }
      return state
    }
  }
})

// const filterReducer = (state = '', action) => {
//   switch(action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//     }
// }

// export const filterChange = (filterValue) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filterValue
//   }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer