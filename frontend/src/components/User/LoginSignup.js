import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../images/profile.svg";

const LoginSignup = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
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

  const loginSubmit = () => {
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
        if (reader.result === 2) {
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
                <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
                  {/* Email */}
                  <div>
                    <label
                      for="email"
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
                      required=""
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                      }}
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <label
                      for="password"
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
                      required=""
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
                  onSubmit={(e) => registerSubmit}
                  enctype="multipart/form-data"
                >
                  {/* Name */}
                  <div>
                    <label
                      for="name"
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
                      required=""
                      onChange={registerDataChange}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      for="email"
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
                      required=""
                      onChange={registerDataChange}
                    />
                  </div>
                  {/* Avatar Upload */}
                  <div>
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      for="file_input"
                    >
                      Upload avatar
                    </label>
                    <div className="flex flex-row space-x-2">
                      <img
                        class="w-10 h-10 rounded-full border"
                        src={profile}
                        alt="Rounded avatar"
                      />
                      <input
                        class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div>
                    <label
                      for="password"
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
                      required=""
                    />
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label
                      for="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSignup;
