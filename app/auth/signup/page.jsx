"use client"; 
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill all fields");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    // Save the updated users data in localStorage
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign up successful! Please login to continue.");
    setFormData({ name: "", email: "", phone: "", password: "" }); 
    router.push('/auth/login');
  };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto lg:mt-10">
        <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-900 text-center lg:text-start">Sign <span className="text-yellow-700">Up</span></h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-yellow-900 font-semibold rounded-lg hover:bg-yellow-400"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-yellow-500 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
