
const Form = (props) => {
    return (
        <div>
            <form onSubmit={props.addPerson}>
                <h2>add a new</h2>
                <div>
                name: <input 
                    value={props.newName}
                    onChange={props.handleNameChange}
                />
                </div>
                <div>
                number: <input 
                    value={props.newNum}
                    onChange={props.handleNumChange}
                />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form