const MessageAddSuccessful = ({ newName, message } ) => {
    const messageStyle = {
        color: "green",
        background: "lightgray",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={messageStyle}>
            <em>{message} {newName}</em>
        </div>
    )
}

const MessageAlreadyDeleted = ({ personDeleted }) => {
    const messageStyle = {
        color: "red",
        background: "lightgray",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={messageStyle}>
            <em>Information of {personDeleted} has already been removed from server</em>
        </div>
    )
}

export default { MessageAddSuccessful, MessageAlreadyDeleted }