import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  },
  content: '',
  userAction: ''
}

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    voteNotification(state, action) {
      state.content = action.payload.content
      state.style.display = ''
      state.userAction = 'you voted'
      return state
    },
    hideNotification(state, action) {
      state.style.display = 'none'
      return state
    },
    createNotification(state, action) {
      state.content = action.payload
      state.style.display = ''
      state.userAction = 'you created a new anecdote'
      return state
    }
  }
})

export const { voteNotification, hideNotification, createNotification } = notificationSlice.actions

export const showNotification = (userAction, content, timeOutDuration) => {
  if (userAction === 'vote') {
    return dispatch => {
      dispatch(voteNotification(content))
      setTimeout(() => {
        dispatch(hideNotification())
      }, timeOutDuration * 1000)
    }
  } else if (userAction === 'create') {
    return dispatch => {
      dispatch(createNotification(content))
      setTimeout(() => {
        dispatch(hideNotification())
      }, timeOutDuration * 1000)
    }
  }
}

export default notificationSlice.reducer