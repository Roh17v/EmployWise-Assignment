import React from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useUserContext();
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
