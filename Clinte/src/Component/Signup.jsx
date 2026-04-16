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
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us today</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-4 text-lg rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all shadow-lg"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-4 text-lg rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all shadow-lg"
              />
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-4 text-lg rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all shadow-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
