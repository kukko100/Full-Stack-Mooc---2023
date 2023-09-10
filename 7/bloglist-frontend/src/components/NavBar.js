import { Link } from "react-router-dom"
import Login from "./Login"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const NavBar = () => {

  const padding = {
    margin: "5em",
    padding: "1em"
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href='#' as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href='#' as="span">
            <Login style={padding}/>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar