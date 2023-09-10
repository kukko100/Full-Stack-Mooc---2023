import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  style: {
    display: "none",
  },
  content: "",
  userAction: "",
  variant:""
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    voteNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = "you liked: ";
      state.variant = "success"
      return state;
    },
    hideNotification(state) {
      state.style.display = "none";
      state.variant = ""
      return state;
    },
    createNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = "you created a new blog: ";
      state.variant = "success"
      return state;
    },
    errorNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = `there was an error: `;
      state.variant = "danger"
      return state;
    },
    loginNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = "you signed in with user: ";
      state.variant = "primary"
      return state;
    },
    logoutNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = "you have logged out";
      state.variant = "primary"
      return state;
    },
    deleteNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = "you deleted blog: ";
      state.variant = "success"
      return state;
    },
    commentNotification(state, action) {
      state.content = action.payload;
      state.style.display = "";
      state.userAction = "you commented on the blog: ";
      state.variant = "success"
      return state;
    }
  },
});

export const {
  voteNotification,
  hideNotification,
  createNotification,
  errorNotification,
  loginNotification,
  logoutNotification,
  deleteNotification,
  commentNotification,
} = notificationSlice.actions;

export const showNotification = (userAction, content, timeOutDuration) => {
  if (userAction === "vote") {
    return (dispatch) => {
      dispatch(voteNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction === "create") {
    return (dispatch) => {
      dispatch(createNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction === "login") {
    return (dispatch) => {
      dispatch(loginNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction === "logout") {
    return (dispatch) => {
      dispatch(logoutNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction === "delete") {
    return (dispatch) => {
      dispatch(deleteNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction ==="comment") {
    return (dispatch) => {
      dispatch(commentNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction === "error") {
    return (dispatch) => {
      dispatch(errorNotification(content.response.data.error));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  } else if (userAction === "errorCustom") {
    return (dispatch) => {
      dispatch(errorNotification(content));
      setTimeout(() => {
        dispatch(hideNotification());
      }, timeOutDuration * 1000);
    };
  }
};

export default notificationSlice.reducer;
