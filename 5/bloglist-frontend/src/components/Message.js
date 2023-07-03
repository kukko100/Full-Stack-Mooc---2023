const MessageAddSuccessful = ({ blogName, authorName } ) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={messageStyle}>
      <em>a new blog {blogName} by {authorName} added</em>
    </div>
  )
}

const MessageError = ({ errorMessage }) => {
  const messageStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={messageStyle}>
      <em>{errorMessage}</em>
    </div>
  )
}

export default { MessageAddSuccessful, MessageError }