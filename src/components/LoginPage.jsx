import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { user, setUser } = useContext(LoggedInUserContext);
  const [users, setUsers] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((usersFromApi) => {
      setUsers(usersFromApi);
    });
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    users.forEach((oneUser) => {
      if (oneUser.username === currentUserName) {
        setUser(oneUser);
        setLoginSuccessful(true);
      }
    });
  }

  function handleChange(event) {
    setCurrentUserName(event.target.value);
  }

  if (loginSuccessful) {
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        onChange={handleChange}
        className="text-center"
      >
        <label htmlFor="username">
          <h2>Select your username:</h2>
        </label>
        <select
          name="username"
          id="username"
          className="w-full p-2 border border-black rounded-md"
        >
          <option value="blank"></option>
          {users.map((user) => {
            return (
              <option key={user.username} value={user.user_id}>
                {user.username}
              </option>
            );
          })}
        </select>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
