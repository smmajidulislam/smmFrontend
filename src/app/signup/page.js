"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
    },
    dateOfBirth: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);

      const response = await fetch(
        "https://smmbackend-tgnc.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }

      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Bangladesh",
        },
        dateOfBirth: "",
        gender: "",
      });

      router.push("/verification");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Street Address</label>
            <input
              type="text"
              name="address.street"
              value={data.address.street}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your street address"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              name="address.city"
              value={data.address.city}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your city"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
