"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Page = () => {
  const [randomNumber, setRandomNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    const getPassword = localStorage.getItem("password");
    setEmail(getEmail);
    setPass(getPassword);
  }, []);

  const handleChange = (e) => {
    setRandomNumber(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, randomNumber }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setSuccess(true);
        try {
          const loginResult = await signIn("credentials", {
            redirect: false,
            email: result.email,
            password: pass,
          });

          if (!loginResult.error) {
            router.push("/");
          }
        } catch (error) {
          setError("Login failed. Please try again.");
        }

        localStorage.clear();
      } else {
        setError("Invalid OTP. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          OTP Verification
        </h2>
        <form className="mt-6" onSubmit={handleOtpSubmit}>
          <div>
            <label className="block text-gray-600">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={randomNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the OTP sent to your email"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-4">
              OTP Verified successfully!
            </p>
          )}
          {loading && (
            <p className="text-blue-500 text-center mt-4">Verifying OTP...</p>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Didn't receive the OTP?{" "}
          <Link href="/resend-otp" className="text-blue-500 hover:underline">
            Resend OTP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
