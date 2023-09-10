import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: [ ],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    emptyComments() {
      return []
    },
    appendComment(state, action) {
      console.log(action.payload)
      return [...state, action.payload]
    }
  }
});

export const { setComments, emptyComments, appendComment } = commentSlice.actions;

export const initializeComments = (comments) => {
  return async (dispatch) => {
    dispatch(setComments(comments))
  };
};

export const addComment = (comments) => {
  return async (dispatch) => {
    dispatch(appendComment(comments))
  }
}


export default commentSlice.reducer;