import React from "react";
import SearchIcon from "../../../images/search.svg";
import ProfileIcon from "../../../images/profile.svg";
import CartIcon from "../../../images/cart.svg";
import MainLogo from "../../../images/logo.svg";
import { Link } from "react-router-dom";

const links = {
  home: "/",
  products: "/products",
  contact: "/contact",
  about: "/about",
  search: "/search",
  sign: "/sign",
};
const NavBar = () => {
  return (
    <>
      <div className="dark:bg-gray-900">
        <div>
          <div className="relative">
            <div className="dark:bg-gray-900 bg-gray-50 px-6 py-9">
              <div className="container mx-auto flex items-center justify-between">
                {/* Heading */}
                <Link to={links.home} className="flex items-center">
                  <img
                    src={MainLogo}
                    className="mr-3 h-6 sm:h-9"
                    alt="ExOFusion Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    ExOFusion
                  </span>
                </Link>

                {/* List of Buttons in Navigation */}
                <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">
                  <li>
                    <Link
                      to={links.home}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={links.products}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={links.contact}
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={links.about}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      About
                    </Link>
                  </li>
                </ul>

                {/* Icons in Navigation */}
                <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">
                  <div className="hidden lg:flex items-center">
                    {/* Search Icon */}
                    <Link to={links.search}>
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
                    </Link>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                    {/* Add to Cart Icon */}
                    <Link to={links.home}>
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
                    </Link>
                    {/* Profile Icon */}
                    <Link to={links.sign}>
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
                    </Link>
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
