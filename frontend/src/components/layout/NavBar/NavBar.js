import React from "react";
import SearchIcon from "../../../images/search.svg";
import ProfileIcon from "../../../images/profile.svg";
import CartIcon from "../../../images/cart.svg";
import MainLogo from "../../../images/logo.svg";

const NavBar = () => {
  return (
    <>
      <div className="dark:bg-gray-900">
        <div>
          <div className="relative">
            <div className="dark:bg-gray-900 bg-gray-50 px-6 py-9">
              <div className="container mx-auto flex items-center justify-between">
                {/* Heading */}
                <a href="https://localhost:3000" className="flex items-center">
                  <img
                    src={MainLogo}
                    className="mr-3 h-6 sm:h-9"
                    alt="ExOFusion Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    ExOFusion
                  </span>
                </a>

                {/* List of Buttons in Navigation */}
                <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">
                  <li>
                    <a
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      About
                    </a>
                  </li>
                </ul>

                {/* Icons in Navigation */}
                <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">
                  <div className="hidden lg:flex items-center">
                    {/* Search Icon */}
                    <button
                      aria-label="search items"
                      className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                      <img
                        className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
                        src={SearchIcon}
                        alt="search"
                      />
                    </button>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                    {/* Fav Icon */}
                    <button
                      aria-label="view cart"
                      className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                      <img
                        className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
                        src={CartIcon}
                        alt="cart"
                      />
                    </button>
                    {/* Cart Icon */}
                    <button
                      aria-label="go to profile"
                      className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                      <img
                        className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
                        src={ProfileIcon}
                        alt="profile"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
