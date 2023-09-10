import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import userListReducer from "./reducers/userListReducer";
import userBlogListReducer from "./reducers/userBlogListReducer"
import blogDetailReducer from "./reducers/blogDetailReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
    userList: userListReducer,
    userBlogList: userBlogListReducer,
    blogDetail: blogDetailReducer,
    comments: commentReducer
  },
});

export default store;
