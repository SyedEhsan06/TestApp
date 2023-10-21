import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.Authtoken);
      navigate("/");
    } else {
      alert("Wrong Credentials");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-data-bg">
      <div className="bg-data-card border p-6 shadow-lg rounded-lg w-96 text-data-text">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-600 text-sm font-semibold">
              Name
            </label>
            <input
              required
              value={user.name}
              onChange={onChange}
              type="text"
              id="name"
              name="name"
              className="input input-bordered w-full mt-2 rounded-md px-3 py-2 focus:ring focus:ring-data-accent focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-600 text-sm font-semibold">
              Email
            </label>
            <input
              required
              value={user.email}
              onChange={onChange}
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full mt-2 rounded-md px-3 py-2 focus:ring focus:ring-data-accent focus:outline-none"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-600 text-sm font-semibold">
              Password
            </label>
            <input
              required
              value={user.password}
              onChange={onChange}
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full mt-2 rounded-md px-3 py-2 focus:ring focus:ring-data-accent focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full py-2 rounded-md hover:bg-luxury-darker focus:ring focus:ring-data-accent"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default Signup;
