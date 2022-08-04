import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../images/profile.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../../state_management/user/userSlice";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const loginButton = useRef(null);
  const loginForm = useRef(null);
  const registerButton = useRef(null);
  const registerForm = useRef(null);

  const loginSubmit = (e) => {
    e.preventDefault();
    const loginUserCreds = { loginEmail, loginPassword };
    dispatch(fetchUserDetails(loginUserCreds));
    console.log("Logged in successfully");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const registerFormData = new FormData();
    registerFormData.set("name", name);
    registerFormData.set("email", email);
    registerFormData.set("avatar", avatar);
    registerFormData.set("password", password);
    console.log("Registered successfully");
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
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div>{loginEmail}</div>
      <div>{loginPassword}</div>
      <section className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="flex flex-col items-center justify-center mx-auto ">
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
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
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
                      placeholder="name"
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
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign up
                  </button>
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
