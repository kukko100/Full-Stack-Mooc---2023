import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";
import { logOutUser } from "../reducers/userReducer";

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      action.payload.sort((a, b) => b.likes - a.likes);
      return action.payload;
    },
    setBlog(state, action) {
      return action.payload
    },
    emptyState() {
      return []
    }
  },
});

export const { appendBlog, setBlogs, setBlog, emptyState } = blogSlice.actions;

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

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  
  return async (dispatch) => {
    if (localStorage.getItem("loggedBlogUser") === null) {
      dispatch(showNotification("errorCustom", "You have to log in to create a new blog", 5))
    } else {
      try {
        const newBlog = await blogService.create(blog);
        dispatch(appendBlog(newBlog));
        dispatch(showNotification("create", blog.title, 5));
      } catch (error) {
        dispatch(logOutUser())
        dispatch(showNotification("error", error, 5));
      }
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, blog);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const commentBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, blog);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
}

export default blogSlice.reducer;
