import React from "react";
import { PlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className="flex justify-between w-full items-center">
      <img
        src="https://logoeps.com/wp-content/uploads/2014/05/21601-news-logo-icon-vector-icon-vector-eps.png"
        alt="news-logo"
        className="size-30"
      />
      <h1>Best news in town</h1>
      <div className="flex flex-row items-center">
        <div className="flex flex-column items-center">
          <PlusIcon className="size-7" />
          <p>Add article</p>
        </div>
        <UserCircleIcon className="size-12" />
      </div>
    </header>
  );
}

export default Header;
