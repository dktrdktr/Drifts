import { useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({ setUserAuth }) => {
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      const response = await axios.post(`/login`, { user });
      if (response.status === 200) {
        Cookies.set("id", response.data.id);
        setLoginError(false);
        setUserAuth(true);
      } else {
        new Error("Credentials invalid");
      }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
          {loginError && (
            <p className="my-2 text-sm text-red-600">
              <span className="font-medium">Oops!</span> Credentials invalid!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
