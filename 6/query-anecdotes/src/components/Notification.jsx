import { useReducer } from 'react'

const Notification = (notification) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: ""
  }

  if (notification.notification === '') {
    style.display = "none"
  }

  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `You have voted for:  '${action.payload.content}'`
    case "CREATE":
      return `You have created a new anecdote:  '${action.payload}'`
    case "HIDE":
      return ""
    case "ERROR":
      return `ERROR:  '${action.payload}'`
    default:
      return state
  }
}