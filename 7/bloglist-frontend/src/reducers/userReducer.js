import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { showNotification } from "./notificationReducer";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "userSlice",
  initialState: "",
  reducers: {
    activateUser(state, action) {
      return action.payload;
    },
    deactivateUser() {
      return null;
    },
  },
});

export const { activateUser, deactivateUser } = userSlice.actions;

export const logInUser = (content) => {
  return async (dispatch) => {
    
    
    
    try {
      const loggedUser = await loginService.login(content);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      dispatch(activateUser(loggedUser));
      dispatch(showNotification('login', loggedUser.username, 5))
    } catch(error) {
      dispatch(showNotification('error', error, 5))
    }
    
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(showNotification("logout", "", 5));
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(deactivateUser());
  };
};

export const refetchUser = () => {
  return (dispatch) => {
    dispatch(
      activateUser(JSON.parse(window.localStorage.getItem("loggedBlogUser"))),
    );
  };
};

export default userSlice.reducer;
