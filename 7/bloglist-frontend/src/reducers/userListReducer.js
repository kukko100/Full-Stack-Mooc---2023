import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userListSlice = createSlice({
  name: "userListSlice",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return [...state, action.payload]
    },
    emptyUsers() {
      return []
    }
  }
});

export const { setUsers, emptyUsers } = userListSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    dispatch(emptyUsers())
    try {
      const users = await userService.getAll();
      {users.map((user) => (
        dispatch(setUsers(user))
      ))}
    } catch(error) {
      console.log(error)
    }
  };
};


export default userListSlice.reducer;