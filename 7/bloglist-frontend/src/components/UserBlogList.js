import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/users'
import { initializeBlogs } from '../reducers/userBlogListReducer'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';

const UserBlogList = () => {

  const blogs = useSelector((state) => state.userBlogList);

  const dispatch = useDispatch()
  

  const getUser = async () => {
    const userId = {id: window.location.href.split('/')[4]}
    const user = await userService.getUser(userId)
      .then(responseData => {
        dispatch(initializeBlogs(responseData))
      }) 
    return user
  }

  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <div>
      <h2>{blogs.username}</h2>
      <h3>added blogs</h3>
      <Table striped>
        {blogs.blogs !== undefined && (
          <tbody>
            {blogs.blogs.map((b) => (
              <tr key={b.id}>
                <td>
                  {b.title}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  )
}

export default UserBlogList