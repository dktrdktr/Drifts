import { useState } from "react";
import Heading from "./Heading";

const LoginForm = ({ setUserAuth }) => {
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // use a helper function to verify login
    try {
      console.log("login succesful");
      throw new Error("Credentials invalid");
      // setLoginError(false);
      // setUserAuth(true);
    } catch {
      setLoginError(true);
    }
  };

  return (
    <div className="flex w-fit h-fit m-8 place-self-center">
      <div className="shadow rounded-3xl bg-white p-4 rounded w-full">
        <Heading title={"Welcome to MarkThatDown"} />
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {loginError && (
            <p className="mb-2 text-sm text-red-600">
              <span className="font-medium">Oops!</span> Credentials invalid!
            </p>
          )}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
