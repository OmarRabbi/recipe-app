"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authContext";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );
    if (user) {
      alert("Login successful!");
      login();
      setLoginData({ email: "", password: "" });
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  useEffect(() => {
    setErrorMessage(""); 
  }, [loginData]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto mt-5 lg:mt-10">
        <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-900 text-center lg:text-start">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-yellow-900 font-semibold rounded-lg hover:bg-yellow-400"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-yellow-500 hover:underline font-medium">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
