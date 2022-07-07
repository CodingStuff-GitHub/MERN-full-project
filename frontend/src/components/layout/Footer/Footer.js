import React from "react";
import FacebookIcon from "../../../images/facebook.svg";
import InstagramIcon from "../../../images/instagram.svg";
import TwitterIcon from "../../../images/twitter.svg";

const Footer = () => {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        {/* Footer Text */}
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="localhost:3000" className="hover:underline">
            ExOFusion™
          </a>
          . All Rights Reserved.
        </span>
        {/* Social Links */}
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img
              className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
              src={FacebookIcon}
              alt="facebook"
            />
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img
              className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
              src={InstagramIcon}
              alt="instagram"
            />
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img
              className="justify-center flex align-middle p-2 hover:bg-gray-300 rounded-full h-10 w-10"
              src={TwitterIcon}
              alt="twitter"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
