import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, logOutUser, refetchUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(refetchUser())
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logInUser({ username: username, password: password }));
    setUsername("");
    setPassword("");

  };

  const handleLogOut = () => {
    dispatch(logOutUser(user));
    navigate('/')
    setLoginVisible(false)
  };

  return (
    <div>
      {!window.localStorage.getItem("loggedBlogUser") && loginForm()}
      {window.localStorage.getItem("loggedBlogUser") && (
        <div>
          <div>
            <>{user.username} logged in</>
            <button onClick={handleLogOut}>log out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login