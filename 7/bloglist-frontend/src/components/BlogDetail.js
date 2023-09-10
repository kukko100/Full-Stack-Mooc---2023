import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { getBlog, likeBlog, commentBlog } from "../reducers/blogDetailReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeComments } from "../reducers/commentReducer"


const BlogDetail = () => {
  const [commentField, setCommentField] = useState('')
  const blog = useSelector((state) => state.blogDetail)
  const blogId = {id: window.location.href.split('/')[4]}
  const dispatch = useDispatch();

  const navigate = useNavigate()
  

  useState(() => {
    dispatch(getBlog(blogId.id))
    dispatch(initializeComments())
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  const handleLikeButton = () => {
    const tempBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(likeBlog(tempBlog));
    dispatch(showNotification("vote", blog.title, 5));
  };

  const handleDeleteButton = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id);
      dispatch(showNotification("delete", blog.title, 5));
      navigate("/")
    }
  };

  const getLoggedBlogUser = () => {
    if (JSON.parse(localStorage.getItem("loggedBlogUser")) === null) {
      return "";
    }
    return JSON.parse(localStorage.getItem("loggedBlogUser")).id;
  };

  const handleComment = (event) => {
    event.preventDefault()
    
    const tempBlog = {
      ...blog,
      comments: [...blog.comments, commentField]
    };
    setCommentField('')

    dispatch(commentBlog(tempBlog));
    dispatch(showNotification("comment", blog.title, 5));
  }

  return (
    
    <div className="blog" style={blogStyle}>
      {blog !== null && (
        <div className="title-author">
          <h3> {blog.title} {blog.author} </h3>
            <div className="url-likes">
              <a href={blog.url}>{blog.url}</a>
              <br />
              <div className="numberOfLikes">{blog.likes} likes</div>
              <button className="likeButton" onClick={handleLikeButton}>like</button>
            </div>
            <p>added by {blog.user.name}</p>
            
            {blog.user.id === getLoggedBlogUser() && (
              <button onClick={handleDeleteButton}>Delete</button>
            )}
            <div className="comments">
              <h3>comments</h3>
              <form onSubmit={handleComment}>
                <input 
                  onChange={(event) => setCommentField(event.target.value)}
                  value={commentField}></input>
                <button>add comment</button>
              </form>
              <div>
                {blog.comments.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </div>
            </div>
            
        </div>
      )}
    </div>
  );
};

export default BlogDetail;