import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import DropDownList from "./DropDownList.js";

function DropDownLink() {
  const [showDropdown, setShowDropdown] = useState(false);

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
          className="justify-center flex align-middle p-1 hover:bg-gray-300 rounded-full h-10 w-10"
          src="https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png"
          alt="user avatar"
        />
      </button>
      {showDropdown ? <DropDownList /> : null}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => DropDownLink.handleClickOutside,
};

export default onClickOutside(DropDownLink, clickOutsideConfig);
