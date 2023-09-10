import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <tr className="blog" style={blogStyle}>
      <td className="title-author">
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </td>
    </tr>
  );
};

export default Blog;
