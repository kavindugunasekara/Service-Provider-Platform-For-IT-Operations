import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    userRole: "",
    userpkg: "",     // 👈 Add this line
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      if (res.data.statusCode === 201) {
        alert("User registered successfully");
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-400 ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Create an Account</h1>
        <p className="text-center text-gray-500">Enter details to register your company</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <select
            name="userRole"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={formData.userRole}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
            <option value="owner">Owner</option>
          </select>

          <select
            name="userpkg"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={formData.userRole}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Package</option>
            <option value="Trail">30 day Trail</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
      
          </select>
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;