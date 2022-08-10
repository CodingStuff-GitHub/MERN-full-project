import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Account = () => {
  const { user } = useSelector((state) => state.userStore);
  return (
    <>
      <div>
        <div className="w-full bg-gray-100 pt-24 p-10">
          <div className="rounded shadow-md bg-white">
            <div className="m-auto w-full flex justify-center">
              <div className="-mt-16 h-32 w-32">
                <img
                  src={user.avatar.url}
                  alt="user avatar"
                  className=" rounded-full object-cover h-full w-full shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-6 mt-4">
              <div className="font-bold text-3xl text-center pb-1">
                {user.name}
              </div>
              {user.role === "admin" && (
                <p className="text-gray-800 text-sm text-center">{user.role}</p>
              )}
              <p className="text-gray-800 text-sm text-center">{user.email}</p>
            </div>
            <div className="w-full flex items-center justify-center flex-col mx-auto px-8 py-4 sm:flex-row">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                My Orders
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
