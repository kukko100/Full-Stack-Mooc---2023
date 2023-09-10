import { Link } from "react-router-dom"

const User = ({ user }) => {

  const userStyle = {
    wordSpacing: "3em"
  }
  
  return (
    <tr style={userStyle}>
      <td>
        <Link to={`/userblogs/${user.id}`}>{user.username} </Link> {user.blogs.length}
      </td>
    </tr>
  )
}

export default User