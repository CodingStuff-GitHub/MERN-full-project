import React from "react";
import { Link } from "react-router-dom";

const links = {
  home: "/",
  products: "/products",
  contact: "/contact",
  about: "/about",
  search: "/search",
  sign: "/sign",
};

function DropDownList() {
  return (
    <div className="relative">
      <div
        id="dropdownAvatar"
        className="absolute transition-all -translate-x-32 translate-y-6 mx-auto z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium text-gray-500 truncate">
            name@flowbite.com
          </div>
        </div>
        <div
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <div>
            <Link
              to={links.home}
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </Link>
          </div>
          <div>
            <Link
              to={links.home}
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </Link>
          </div>
          <div>
            <Link
              to={links.home}
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </Link>
          </div>
        </div>
        <div className="py-1">
          <Link
            to={links.home}
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DropDownList;
