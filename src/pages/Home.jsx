import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [userList, setUserList] = useState([]);

  return (
    <>
      <Navbar />
      <div className="mt-16">Home</div>
    </>
  );
};

export default Home;
