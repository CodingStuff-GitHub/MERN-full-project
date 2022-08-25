import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLogo from "../../images/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchResetPassword } from "../../state_management/user/updateSlice";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const registerForm = useRef(null);
  const { loading, err, message } = useSelector((state) => state.updateStore);
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    if (err) {
      setAlertOpen(true);
    } else {
      setAlertOpen(false);
    }
    if (message) {
      setMessageOpen(true);
    } else {
      setMessageOpen(false);
    }
  }, [err, message]);
  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      token,
      password: newPassword,
      confirmPassword,
    };
    dispatch(fetchResetPassword(data)).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Metadata title="ExOFusion Account" />
      <section className="h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="relative flex flex-col items-center justify-center mx-auto ">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src={MainLogo} alt="ExOFusion Logo" />
            ExOFusion
          </Link>
          {/* Login and Signup Card */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {/* Register Form Div */}
            <div
              ref={registerForm}
              className=" transition duration-500 w-full p-6 space-y-4 md:space-y-6 sm:p-8"
            >
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Your Password
              </h1>
              {/* Red Alert with error message */}
              {alertOpen && err ? (
                <div
                  className="flex text-sm text-red-700 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{err}</span>
                  </div>
                </div>
              ) : null}
              {/* Message from server */}
              {messageOpen && message ? (
                <div
                  className="flex text-sm text-green-700 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{message}</span>
                  </div>
                </div>
              ) : null}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => registerSubmit(e)}
                encType="multipart/form-data"
              >
                {/* New Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>

                {/* Submit Button */}
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Reset Password
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SetNewPassword;
