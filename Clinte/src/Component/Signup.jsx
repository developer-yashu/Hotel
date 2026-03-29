import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = { name, email, password };
    if (!(password && email && name)) {
      return alert("all input field are required");
    }

    const reult = await axios.post(`http://localhost:1010/api/signup`, data);
    console.log(reult.data);

    setName("");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/");
      alert("signup successfully ");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>

        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* <div>
            <label htmlFor="number" className="sr-only">
              Phone Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              placeholder="Mobile Number"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div> */}

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
              placeholder="Email address"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              // name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:text-red-800 transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
