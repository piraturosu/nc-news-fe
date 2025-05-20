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
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Select Your Username
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <select
              name="username"
              id="username"
              value={currentUserName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="" disabled>
                Choose a username
              </option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
