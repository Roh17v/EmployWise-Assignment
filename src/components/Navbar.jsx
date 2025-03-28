import React from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, setToken } = useUserContext();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 w-full bg-blue-600 text-white py-3 px-5 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-lg">Navbar</div>
        <div>
          {token ? (
            <button
              className="rounded-md p-2 bg-white text-black cursor-pointer"
              onClick={() => setToken(null)}
            >
              Logout
            </button>
          ) : (
            <button
              className="rounded-md p-2 bg-white text-black cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
