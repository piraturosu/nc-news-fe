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
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white flex flex-col items-center rounded-lg shadow-md  border border-gray-200 ">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Hello, {user.username}!
        </h2>
        <button
          onClick={handleLogOutUser}
          className="w-full py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-200 "
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserPage;
