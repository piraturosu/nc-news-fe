import { useContext } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { useNavigate } from "react-router-dom";
function UserPage() {
  const { user, setUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  function handleLogOutUser() {
    setUser("");
    navigate("/");
  }

  return (
    <div>
      <h2>Hello {user.username}</h2>
      <button onClick={handleLogOutUser}>Log out</button>
    </div>
  );
}

export default UserPage;
