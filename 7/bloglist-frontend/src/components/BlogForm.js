import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const BlogForm = ({ user }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const [formVisible, setFormVisible] = useState(false);

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user,
    };
    dispatch(createBlog(blog));
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };


  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? "none" : "" };
    const showWhenVisible = { display: formVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>create blog</button>
        </div>
        <div style={showWhenVisible}>
        <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
        <Form.Label>title:</Form.Label>
          
          <Form.Control
            className="blogFormTitleInput"
            type="text"
            value={newTitle}
            name="title"
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            className="blogFormAuthorInput"
            type="text"
            value={newAuthor}
            name="author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        <div>
          <Form.Label>url:</Form.Label>
          <Form.Control
            className="blogFormUrlInput"
            type="text"
            value={newUrl}
            name="url"
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <Button variant="primary" type="submit">create</Button>
        <Button variant="secondary" onClick={() => setFormVisible(false)}>cancel</Button>
        </Form.Group>
      </Form>
      
        </div>
      </div>
    );
  };

  return (
    <div>
      {blogForm()}
    </div>
  );
};

export default BlogForm;
