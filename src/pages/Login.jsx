import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { HOST } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login button clicked!");
  };

  const login = async () => {
    try {
      const response = await axios.post(HOST, {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Logged In successfully");
      }
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center rounded-md shadow-md h-screen w-full">
        <form className="bg-white p-6 shadow-lg rounded-md flex flex-col gap-3 max-w-sm mx-auto">
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

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition duration-300"
            onClick={handleSubmit}
          >
            Login
          </button>

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
        </form>
      </div>
    </>
  );
};

export default Login;
