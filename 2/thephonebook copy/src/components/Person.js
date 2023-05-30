const Person = ({ person, handleDelete }) => {
    return (
        <li>
            {person.name} {person.number} {person.deleteButton}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
        </li>
    )
}

export default Person