import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({ setUserAuth }) => {
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios({
        url: "/login",
        method: "post",
        params: { email: email, password: password },
      });
      if (login.data.id && login.data.id !== undefined) {
        Cookies.set("id", login.data.id);
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
      <div className="shadow rounded-xl bg-white p-4 rounded-xl w-full">
        <h1 className="mb-8 font-medium text-center">
          Welcome to MarkThatDown
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Log In
          </button>
          {loginError && (
            <p className="mt-4 text-sm text-red-600">
              <span className="font-medium">Oops!</span> Credentials invalid!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
