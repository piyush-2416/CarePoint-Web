import { useState } from "react";
import { FaEye, FaEyeSlash, FaHeartbeat } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center bg-gradient-to from-cyan-100 via-blue-50 to-green-100 px-4 min-h-screen">

      {/* Background Blur Circle */}
      <div className="top-10 left-10 absolute bg-cyan-300 opacity-40 blur-[120px] rounded-full w-72 h-72"></div>
      <div className="right-10 bottom-10 absolute bg-green-300 opacity-40 blur-[120px] rounded-full w-72 h-72"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/80 shadow-2xl backdrop-blur-xl p-8 border border-white/40 rounded-3xl">

          {/* Logo */}
          <div className="flex justify-center mb-5">

            <div className="flex justify-center items-center bg-cyan-600 shadow-lg rounded-full w-20 h-20">

              <FaHeartbeat className="text-white text-4xl" />

            </div>

          </div>

          {/* Heading */}

          <h1 className="font-bold text-gray-800 text-3xl text-center">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500 text-center">
            Login to CarePoint Dashboard
          </p>

          {/* Form */}

          <form className="space-y-5 mt-8">

            {/* Email */}

            <div>

              <label className="font-semibold text-gray-700 text-sm">
                Email Address
              </label>

              <input
                type="email"
                placeholder="doctor@carepoint.com"
                className="mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 w-full transition"
              />

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold text-gray-700 text-sm">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 w-full transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="top-1/2 right-4 absolute text-gray-500 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  className="accent-cyan-600"
                />

                Remember Me

              </label>

              <a
                href="#"
                className="text-cyan-600 hover:underline"
              >
                Forgot Password?
              </a>

            </div>

            {/* Login */}

            <button
              className="bg-cyan-600 hover:bg-cyan-700 shadow-lg hover:shadow-cyan-400 py-3 rounded-xl w-full font-semibold text-white transition duration-300"
            >
              Login
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center gap-4 my-6">

            <hr className="flex-1" />

            <span className="text-gray-400 text-sm">
              OR
            </span>

            <hr className="flex-1" />

          </div>

          {/* Google */}

          <button
            className="hover:bg-gray-100 py-3 border border-gray-300 rounded-xl w-full font-medium transition"
          >
            Continue with Google
          </button>

          {/* Footer */}

          <p className="mt-6 text-gray-500 text-sm text-center">

            Don't have an account?

            <span className="ml-1 font-semibold text-cyan-600 hover:underline cursor-pointer">
              Register
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}