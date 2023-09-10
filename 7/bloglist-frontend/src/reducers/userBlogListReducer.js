import { createSlice } from "@reduxjs/toolkit";

const userBlogListSlice = createSlice({
  name: "userBlogListSlice",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    emptyUsers() {
      return []
    }
  }
});

export const { setBlogs } = userBlogListSlice.actions;

export const initializeBlogs = (blogs) => {
  return async (dispatch) => {
    dispatch(setBlogs(blogs))
  };
};


export default userBlogListSlice.reducer;