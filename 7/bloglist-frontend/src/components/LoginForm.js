import PropTypes from "prop-types";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div className="loginFormDiv">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            id="usernameInput"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="logInButton" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
