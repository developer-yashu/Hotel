import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };
    const reult = await axios.post(`http://localhost:1010/api/login`, data);
    console.log(reult.data);

    if (email && password) {
      alert('Login successfully ')
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr bg-gray-50  px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900 relative">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-semibold hover:text-red-800 transition"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
