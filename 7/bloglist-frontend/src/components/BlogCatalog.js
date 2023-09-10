
import { useEffect } from "react"
import { initializeBlogs } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Table from 'react-bootstrap/Table';

const BlogCatalog = () => {
  const blogs = useSelector((state) => state.blog)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[])  

  return (
    <div>
      <BlogForm></BlogForm>
      <Table striped>
      {blogs !== null && (
        <tbody>
          {blogs.map((b) => (
              <Blog key={b.id} blog={b}></Blog>
          ))}
        </tbody>
      )}
      </Table>
    </div>
  )

}

export default BlogCatalog