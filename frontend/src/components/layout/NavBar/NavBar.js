import React, { useState } from "react";
import SearchIcon from "../../../images/search.svg";
import ProfileIcon from "../../../images/profile.svg";
import CartIcon from "../../../images/cart.svg";
import MainLogo from "../../../images/logo.svg";
import { Link } from "react-router-dom";
import DropDownLink from "./DropDownLink";
import { useSelector } from "react-redux";

const links = {
  home: "/",
  products: "/products",
  contact: "/contact",
  about: "/about",
  search: "/search",
  sign: "/sign",
};
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.userStore);
  return (
    <>
      <div className="dark:bg-gray-900">
        <div className="container mx-auto relative">
          <div className="py-4 mx-4 md:mx-6">
            <div className="flex items-center justify-between dark:border-gray-700 pt-4">
              {/* Logo */}
              <Link to={links.home}>
                <div>
                  <div
                    className="hidden lg:block cursor-pointer"
                    role="img"
                    aria-label="ExOFusion Logo."
                  >
                    <div className="flex items-center">
                      <img
                        src={MainLogo}
                        className="mr-3 h-6 sm:h-9"
                        alt="ExOFusion Logo"
                      />
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        ExOFusion
                      </span>
                    </div>
                  </div>
                  <div
                    className="hidden md:block lg:hidden cursor-pointer"
                    role="img"
                    aria-label="ExOFusion Logo."
                  >
                    <div className="flex items-center">
                      <img
                        src={MainLogo}
                        className="mr-3 h-6 sm:h-9"
                        alt="ExOFusion Logo"
                      />
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        ExOFusion
                      </span>
                    </div>
                  </div>
                  <div
                    className="md:hidden cursor-pointer"
                    role="img"
                    aria-label="ExOFusion Logo."
                  >
                    <div className="flex items-center">
                      <img
                        src={MainLogo}
                        className="mr-3 h-6 sm:h-9"
                        alt="ExOFusion Logo"
                      />
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        ExOFusion
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Categories Buttons */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-6">
                  <div>
                    <Link
                      to={links.home}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Home
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={links.products}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Products
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={links.contact}
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Contact
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={links.about}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      About
                    </Link>
                  </div>
                </div>
              </div>

              {/* Account Cart Fav Buttons */}
              <div className="hidden md:flex items-center space-x-4">
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
                {isAuthenticated ? (
                  <DropDownLink />
                ) : (
                  <Link to={links.sign}>
                    <button
                      type="button"
                      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>

              {/* Options Button */}
              <div className="md:hidden">
                <button
                  aria-label="open menu"
                  onClick={() => setShowMenu(true)}
                  className="focus:outline-none focus:ring-2 focus:ring-gray-800 rounded"
                >
                  <svg
                    className="fill-stroke text-gray-800 dark:text-white"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 18H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Div */}
          <div
            id="mobile-menu"
            className={`${
              showMenu ? "flex" : "hidden"
            } dark:bg-gray-900 md:hidden absolute inset-0 z-10 flex-col w-full h-screen bg-white pt-6`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mx-4">
                <div role="img" aria-label="Luxe. Logo">
                  <div className="flex items-center">
                    <img
                      src={MainLogo}
                      className="mr-3 h-6 sm:h-9"
                      alt="ExOFusion Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                      ExOFusion
                    </span>
                  </div>
                </div>
                <button
                  aria-label="close menu"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <svg
                    className="fill-stroke"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L5 15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 5L15 15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4 mx-4">
              <div className="flex flex-col space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <Link
                    to={links.home}
                    className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    Home
                  </Link>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <div>
                    <Link
                      to={links.products}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Products
                    </Link>
                  </div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <div>
                    <Link
                      to={links.contact}
                      href="http://localhost:3000"
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <div>
                    <Link
                      to={links.about}
                      className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    >
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex items-end">
              <div className="bg-gray-50 dark:bg-gray-800 py-10 px-4 flex flex-col space-y-8 w-full">
                <div>
                  <Link to={links.search}>
                    <div className="flex">
                      <img
                        className="justify-center align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
                        src={SearchIcon}
                        alt="search"
                      />
                      <span className="text-base p-2 justify-center">
                        Search
                      </span>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to={links.home}>
                    <div className="flex">
                      <img
                        className="justify-center align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
                        src={CartIcon}
                        alt="cart"
                      />
                      <span className="text-base p-2 justify-center">Cart</span>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to={links.sign}>
                    <div className="flex">
                      <img
                        className="justify-center align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
                        src={ProfileIcon}
                        alt="profile"
                      />
                      <span className="text-base p-2 justify-center">
                        Profile
                      </span>
                    </div>
                  </Link>
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
