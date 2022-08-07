import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserLogin,
  fetchUserRegister,
} from "../../state_management/user/userSlice";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = registerUser;
  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const [alertOpen, setAlertOpen] = useState(false);

  const loginButton = useRef(null);
  const loginForm = useRef(null);
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const registerButton = useRef(null);
  const registerForm = useRef(null);

  const { loading, err, isAuthenticated } = useSelector(
    (state) => state.userStore
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        pathname: "/account",
      });
    }
    if (err) {
      loginEmailRef.current.classList.remove("border-gray-300");
      loginEmailRef.current.classList.add("border-red-500");
      loginPasswordRef.current.classList.remove("border-gray-300");
      loginPasswordRef.current.classList.add("border-red-500");
      setAlertOpen(true);
    } else {
      loginEmailRef.current.classList.add("border-gray-300");
      loginEmailRef.current.classList.remove("border-red-500");
      loginPasswordRef.current.classList.add("border-gray-300");
      loginPasswordRef.current.classList.remove("border-red-500");
      setAlertOpen(false);
    }
  }, [err, isAuthenticated, navigate]);

  const loginSubmit = (e) => {
    e.preventDefault();
    const loginUserCreds = { loginEmail, loginPassword };
    dispatch(fetchUserLogin(loginUserCreds));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const registerFormData = new FormData();
    registerFormData.set("name", name);
    registerFormData.set("email", email);
    registerFormData.set("avatar", avatar);
    registerFormData.set("password", password);
    dispatch(fetchUserRegister(registerFormData));
  };

  const switchTabs = (_e, tab) => {
    if (tab === "register") {
      registerButton.current.classList.add("border-b-2", "border-indigo-500");
      loginButton.current.classList.remove("border-b-2", "border-indigo-500");

      loginForm.current.classList.add("translate-x-full", "absolute");
      registerForm.current.classList.remove("-translate-x-full", "absolute");
    }
    if (tab === "login") {
      loginButton.current.classList.add("border-b-2", "border-indigo-500");
      registerButton.current.classList.remove(
        "border-b-2",
        "border-indigo-500"
      );

      registerForm.current.classList.add("-translate-x-full", "absolute");
      loginForm.current.classList.remove("translate-x-full", "absolute");
    }
    setAlertOpen(false);
    loginEmailRef.current.classList.add("border-gray-300");
    loginEmailRef.current.classList.remove("border-red-500");
    loginPasswordRef.current.classList.add("border-gray-300");
    loginPasswordRef.current.classList.remove("border-red-500");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
    }
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
            {/* Login and Register Options */}
            <div
              className="w-full inline-flex rounded-md shadow-sm"
              role="group"
            >
              <button
                ref={registerButton}
                type="button"
                className="border-b-2 border-indigo-500 w-full py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg hover:bg-gray-100 hover:text-blue-700"
                onClick={(e) => {
                  switchTabs(e, "register");
                }}
              >
                Register
              </button>

              <button
                type="button"
                ref={loginButton}
                className="w-full py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg hover:bg-gray-100 hover:text-blue-700"
                onClick={(e) => {
                  switchTabs(e, "login");
                }}
              >
                Login
              </button>
            </div>

            <div className="relative flex overflow-hidden">
              {/* Login Form Div */}
              <div
                ref={loginForm}
                className="absolute translate-x-full w-full transition duration-500 p-6 space-y-4 md:space-y-6 sm:p-8"
              >
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
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
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => loginSubmit(e)}
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      ref={loginEmailRef}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required={true}
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                      }}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      ref={loginPasswordRef}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                      }}
                    />
                  </div>

                  {/* Forget Password Link */}
                  <div className="grid justify-items-end">
                    <Link
                      to="/forgot"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                  )}
                </form>
              </div>

              {/* Register Form Div */}
              <div
                ref={registerForm}
                className=" transition duration-500 w-full p-6 space-y-4 md:space-y-6 sm:p-8"
              >
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
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
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => registerSubmit(e)}
                  encType="multipart/form-data"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your Name"
                      required={true}
                      onChange={registerDataChange}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required={true}
                      onChange={registerDataChange}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      onChange={registerDataChange}
                    />
                  </div>
                  {/* Avatar Upload */}
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="file_input"
                    >
                      Upload avatar
                    </label>
                    <div className="flex flex-row space-x-2">
                      <img
                        className="w-10 h-10 rounded-full border"
                        src={avatarPreview}
                        alt="Rounded avatar"
                      />
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        accept="image/*"
                        name="avatar"
                        onChange={(e) => registerDataChange(e)}
                      />
                    </div>
                  </div>
                  {/* Forget Password Link */}
                  <div className="grid justify-items-end">
                    <Link
                      to="/forgot"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {/* Submit Button */}
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign up
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSignup;
