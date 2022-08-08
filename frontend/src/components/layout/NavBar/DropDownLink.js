import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import { useSelector } from "react-redux";
import ProfileIcon from "../../../images/profile.svg";
import { Link } from "react-router-dom";

//map function okay?

const links = {
  home: "/",
  products: "/products",
  contact: "/contact",
  about: "/about",
  search: "/search",
  sign: "/sign",
  account: "/account",
};

function DropDownLink() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((state) => state.userStore.user);

  DropDownLink.handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <button
        id="dropdownUserAvatarButton"
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
        type="button"
      >
        <img
          className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10 border border-gray-200"
          src={user.avatar ? user.avatar : ProfileIcon}
          alt="user avatar"
        />
      </button>
      {showDropdown ? (
        <div className="relative">
          <div
            id="dropdownAvatar"
            className="absolute transition-all -translate-x-32 translate-y-6 mx-auto z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
              <div>{user.name}</div>
              <div className="font-medium text-gray-500 truncate">
                {user.email}
              </div>
            </div>
            <div
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUserAvatarButton"
            >
              {user.role === "admin" ? (
                <div>
                  <Link
                    to={links.home}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : null}

              <div>
                <Link
                  to={links.home}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Orders
                </Link>
              </div>
              <div>
                <Link
                  to={links.account}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile
                </Link>
              </div>
            </div>
            <div className="py-1">
              <Link
                to={links.home}
                onClick={() => setShowDropdown(!showDropdown)}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Log out
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => DropDownLink.handleClickOutside,
};

export default onClickOutside(DropDownLink, clickOutsideConfig);
