import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { USER_ROUTE } from "../constants";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropDownRef = useRef();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${USER_ROUTE}?page=${page}`);
        if (response.status === 200) {
          setUsers(response.data.data);
          setTotalPages(response.data?.total_pages);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const handlePrevPage = () => {
    setDropdownOpen(null);
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setDropdownOpen(null);
    if (page < totalPages) setPage(page + 1);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${USER_ROUTE}/${selectedUser.id}`,
        selectedUser
      );

      if (response.status === 200) {
        if (selectedUser) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUser.id ? selectedUser : user
            )
          );
        }
        alert("User Info updated sucessfully!");
      }
      console.log(response);
    } catch (error) {
      alert("Unable to Save Changes. Try Again!");
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Profiles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array(6)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center animate-pulse"
                  >
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded mt-3"></div>
                    <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
                    <div className="h-8 w-24 bg-gray-300 rounded mt-3"></div>
                  </div>
                ))
            : users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center relative"
                >
                  <div className="absolute right-3">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === user.id ? null : user.id
                        )
                      }
                      className="text-gray-700 text-xl font-bold"
                    >
                      ⋮
                    </button>
                    {dropdownOpen === user.id && (
                      <div
                        ref={dropDownRef}
                        className="absolute right-2 mt-2 w-32 bg-white shadow-lg rounded-lg z-999"
                      >
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-24 h-24 rounded-full shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mt-3">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ))}
        </div>

        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 backdrop-blur flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Edit Profile
              </h2>
              <img
                src={selectedUser.avatar}
                alt={selectedUser.first_name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <input
                type="text"
                name="first_name"
                value={selectedUser.first_name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-3"
                placeholder="First Name"
              />
              <input
                type="text"
                name="last_name"
                value={selectedUser.last_name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-3"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-3"
                placeholder="Email"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
