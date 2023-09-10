// import userService from '../services/users'
import { useEffect } from "react"
import { initializeUsers } from "../reducers/userListReducer"
import { useDispatch, useSelector } from "react-redux"
import User from './User'
import Table from "react-bootstrap/esm/Table"

const UserList = () => {
  const userList = useSelector((state) => state.userList)
  const dispatch = useDispatch()

  const titleStyle = {
    marginLeft: "5em"
  }

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <p style={titleStyle}>blogs created</p>
      <Table striped>
        <tbody>
          {userList.map((user) => (
            <User key={user.id} user={user}/>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList