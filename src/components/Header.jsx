import { useContext } from "react";
import { PlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import UserCard from "./UserCard";

function Header() {
  const { user, setUser } = useContext(LoggedInUserContext);
  return (
    <header className="flex justify-between w-full items-center">
      <Link to="/">
        <img
          src="https://logoeps.com/wp-content/uploads/2014/05/21601-news-logo-icon-vector-icon-vector-eps.png"
          alt="news-logo"
          className="size-30"
        />
      </Link>
      <h1>Best news in town</h1>
      <div className="flex flex-row items-center">
        <div className="flex flex-column items-center">
          <PlusIcon className="size-7" />
          <p>Add article</p>
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
