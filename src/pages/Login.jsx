import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { LOGIN_ROUTE } from "../constants";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useUserContext();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        LOGIN_ROUTE,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setMessage("Login successfully! Redirecting to Home page...");
        setToken(response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center rounded-md shadow-md h-screen w-full">
        <form className="bg-white p-6 shadow-lg rounded-md flex flex-col gap-3 w-full max-w-sm sm:max-w-md md:max-w-md mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Login
          </h2>

          <input
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
          />

          <input
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
          />

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center">
              <strong className="mr-2">Error:</strong>
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md flex items-center">
              <strong className="mr-2">Success:</strong>
              <span>{message}</span>
            </div>
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 flex items-center justify-center gap-2 transition duration-300"
            onClick={login}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
