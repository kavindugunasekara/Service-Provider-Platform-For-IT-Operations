import axios from "axios";
import { AlertCircle, ArrowLeft, Building, CheckCircle, Eye, EyeOff, Lock, Mail, Package, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const [formData, setFormData] = useState({
    company: "",
    userrole: "",
    email: "",
    password: "",
    userpkg:""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/user/me?email=${email}`);
        setFormData(response.data.user);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.put("http://localhost:5000/update", formData);
      if (res.data.statusCode === 200) {
        setSuccess("User updated successfully");
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6 ml-72">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white text-center">
          <User size={40} className="mx-auto" />
          <h1 className="text-2xl font-bold">Update Profile</h1>
        </div>

        <div className="p-6">
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center">
              <CheckCircle size={18} className="mr-2" /> {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Building size={16} className="mr-2 text-gray-500" /> Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User size={16} className="mr-2 text-gray-500" /> Role
              </label>
              <select
                name="userrole"
                value={formData.userrole || ''}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
               <option value="">Select Package</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail size={16} className="mr-2 text-gray-500" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
  <label className="flex items-center text-sm font-medium text-gray-700">
    <Package size={16} className="mr-2 text-gray-500" /> Package Type
  </label>
  <select
    name="userpkg"
    value={formData.userpkg || ''}
    onChange={handleChange}
    required
    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
  >

    <option value="Trail">Trail</option>
    <option value="Premium">Premium</option>
    <option value="Standard">Standard</option>
    <option value="Basic">Basic</option>
    {/* Add more options as needed */}
  </select>
</div>

<div>
  <label className="flex items-center text-sm font-medium text-gray-700">
    <Lock size={16} className="mr-2 text-gray-500" /> Password
  </label>
  <div className="relative">
    <input
      type="password"  // Always hide the password
      name="password"
      value={formData.password || ''}
      onChange={handleChange}
      className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>


            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isLoading ? "Processing..." : (
                <><Save size={18} className="mr-2 inline" /> Save Changes</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;