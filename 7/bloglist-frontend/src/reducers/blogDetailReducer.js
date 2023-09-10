import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogDetailSlice = createSlice({
  name: "blogDetailSlice",
  initialState: null,
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    emptyState() {
      return []
    }
  },
});

export const { setBlog, emptyState } = blogDetailSlice.actions;

export const empty = () => {
  return (dispatch) => {
    dispatch(emptyState())
  }
}

export const getBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getBlog(id)
    dispatch(setBlog(blog))
  }
}

export const likeBlog = (content) => {
  return async (dispatch) => {
    await blogService.update(content.id, content);
    const blog = await blogService.getBlog(content.id);
    dispatch(setBlog(blog));
  };
};

export const commentBlog = (content) => {
  return async (dispatch) => {
    await blogService.update(content.id, content);
    const blog = await blogService.getBlog(content.id);
    
    dispatch(setBlog(blog));
  };
}

export default blogDetailSlice.reducer;
