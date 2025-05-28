import { useContext } from "react";
import { PlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import UserCard from "./UserCard";

function Header() {
  const { user } = useContext(LoggedInUserContext);
  return (
    <header className="w-auto flex justify-between p-4 bg-white shadow-md items-center">
      <Link to="/">
        <img
          src="https://logoeps.com/wp-content/uploads/2014/05/21601-news-logo-icon-vector-icon-vector-eps.png"
          alt="news-logo"
          className="w-20 h-auto sm:w-28"
        />
      </Link>
      <h1 className="hidden sm:text-2xl sm:block md:text-3xl md:block">
        Best news in town
      </h1>
      <div className="flex flex-row items-center">
        <div className="flex flex-column items-center">
          {user && (
            <Link to="/create-article">
              <div className="flex flex-col items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full p-2 mr-4 sm:flex-row">
                <PlusIcon className="size-5 sm:size-7" />
                <p className="text-xs sm:text-sm sm:block">Create</p>
              </div>
            </Link>
          )}
        </div>
        <Link to={user ? `/users/${user.user_id}` : "/login"}>
          {user ? (
            <UserCard user={user} />
          ) : (
            <div className="ml-5">
              <UserCircleIcon className="size-12" />
              <p>Log in</p>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
