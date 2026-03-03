import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup ? "/auth/signup" : "/auth/login";
      const { data } = await API.post(url, form);

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border px-4 py-2 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>

      <p
        className="text-sm text-center mt-4 cursor-pointer text-gray-500"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "New user? Create account"}
      </p>
    </div>
  </div>
);
}