import axios from 'axios';
import {
  Bell,
  CheckCircle,
  FileText,
  LogOut,
  Package,
  Search,
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';



    const subscriptionPackages = [
        {
          id: 0,
          name: 'Free Trial',
          price: '30-Day Trial',
          features: [
            'Up to 20 file uploads',
            'Basic log analysis',
            'Community support',
            '7-day data retention',
            'Upgrade anytime'
          ],
          color: 'gray'
        },
        { 
          id: 1, 
          name: 'Basic', 
          price: '$9.99/month', 
          features: [
            'Up to 50 file uploads',
            'Basic log analysis',
            'Email support',
            '7-day data retention'
          ],
          color: 'blue'
        },
        { 
          id: 2, 
          name: 'Standard', 
          price: '$19.99/month', 
          features: [
            'Up to 200 file uploads',
            'Advanced log analysis',
            'Priority email support',
            '30-day data retention',
            'Custom dashboards'
          ],
          color: 'green'
        },
        { 
          id: 3, 
          name: 'Premium', 
          price: '$39.99/month', 
          features: [
            'Unlimited file uploads',
            'Enterprise log analysis',
            '24/7 priority support',
            '90-day data retention',
            'Custom dashboards',
            'API access',
            'Team collaboration'
          ],
          color: 'purple'
        }
      ];
      

export default function AdminDashboard() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
 
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    heldUsers: 0,
    totalFileUploads: 0,
  });

  // Function to fetch user data
const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/admin/users');

    console.log(res);

    if (res.data.success) {
      setFilteredUsers(res.data.data);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Function to fetch user summary
const fetchSummary = async () => {
  try {
    const res = await axios.get('http://localhost:5000/user-summary'); // Update path if needed

    if (res.data.success) {
      setStats(res.data.data);
    }

  } catch (error) {
    console.error("Failed to fetch user summary:", error);
  }
};


const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);

  // If search term is empty, show all users
  if (e.target.value === "") {
    fetchUsers();  // Reset to all users
  } else {
    // Filter based on the search term
    const filteredData = filteredUsers.filter(user =>
      user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filteredData); // Update filtered users based on search
  }
};

// Remove user function with refresh
const removeUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await axios.delete(`http://localhost:5000/user/${userId}`);

    if (res.data.success) {
      alert(res.data.message);
      fetchUsers(); // Refresh user list after removal
    } else {
      alert(res.data.message || 'Failed to delete user.');
      console.error('Delete failed:', res.data.message);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Error deleting user.');
    console.error('Error deleting user:', error);
  }
};

// Toggle user status with refresh
const toggleUserStatus = async (userId, status) => {
  const newStatus = status === 'Active' ? 'Hold' : 'Active';

  try {
    const res = await axios.put('http://localhost:5000/user/status', {
      userId,
      status: newStatus,
    });

    if (res.data.success) {
      alert(res.data.message);
      fetchUsers(); // Refresh user list after status change
    } else {
      alert(res.data.message || 'Failed to update status.');
      console.error('Failed to update status:', res.data.message);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Error updating status.');
    console.error('Error updating status:', error);
  }
};

// Open user details modal
const viewUserDetails = (user) => {
  setSelectedUser(user);
  setShowUserModal(true);
};

// Initial page load
useEffect(() => {
  fetchUsers();
  fetchSummary();
}, [fetchUsers]);



  // Package statistics


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-md">
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">A</div>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="mt-8">
          
          <SidebarItem 
            icon={<Users size={20} />} 
            text="Manage Users" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          />
          <SidebarItem 
            icon={<Package size={20} />} 
            text="Subscriptions" 
            active={activeTab === 'subscriptions'} 
            onClick={() => setActiveTab('subscriptions')}
          />
        
          
          
          <div className="absolute bottom-0 left-0 w-64 p-4">
          <Link 
  to="/" 
  className="flex items-center px-4 py-3 text-gray-300 hover:text-white transition-colors"
  onClick={() => {
    // Remove the token (or any relevant session data)
    localStorage.removeItem("authToken"); // If token is stored in localStorage
    sessionStorage.removeItem("authToken"); // If token is stored in sessionStorage
    
    // Optionally close the mobile menu
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }}
>
  <FaSignOutAlt className="mr-3 text-lg" />
  Log Out
</Link>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'subscriptions' && 'Subscription Packages'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'users' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
  <StatCard title="Total Users" value={stats.totalUsers} bgColor="bg-blue-500" />
  <StatCard title="Active Users" value={stats.activeUsers} bgColor="bg-green-500" />
  <StatCard title="Held Users" value={stats.heldUsers} bgColor="bg-yellow-500" />
  <StatCard title="File Uploads" value={stats.totalFileUploads} bgColor="bg-purple-500" />
</div>
              
              {/* Users Table */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">User List</h3>
                  <div className="flex space-x-4">
                    <div className="relative">
                    <input
      type="text"
      placeholder="Search users..."
      className="pl-10 pr-4 py-2 border rounded-lg"
      value={searchTerm}
      onChange={handleSearchChange} // Update filtered users based on search term
    />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Register Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id.slice(0, 6)}...</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.registrationDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                              ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                              ${user.package === 'Premium' ? 'bg-blue-100 text-blue-800' : 
                                user.package === 'Standard' ? 'bg-green-100 text-green-800' : 
                                'bg-purple-100 text-purple-800'}`}>
                              {user.package}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <FileText size={16} className="text-gray-400" />
                              <span>{user.filesUploaded}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button 
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => viewUserDetails(user)}
                              >
                                View
                              </button>

                              <button 
                                className={`${user.status === 'Active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                                onClick={() => toggleUserStatus(user.id,user.status)}
                              >
                                {user.status === 'Active' ? 'Hold' : 'Activate'}
                              </button>

                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => removeUser(user.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'subscriptions' && (
            <>
              {/* Subscription Stats */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Basic Plans" value={packageStats.Basic} bgColor="bg-blue-500" />
                <StatCard title="Standard Plans" value={packageStats.Standard} bgColor="bg-green-500" />
                <StatCard title="Premium Plans" value={packageStats.Premium} bgColor="bg-purple-500" />
              </div> */}
              
              {/* Subscription Packages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPackages.map(pkg => (
                  <div key={pkg.id} className={`bg-white rounded-lg shadow overflow-hidden border-t-4 ${
                    pkg.color === 'blue' ? 'border-blue-500' : 
                    pkg.color === 'green' ? 'border-green-500' : 
                    'border-purple-500'
                  }`}>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-2xl font-bold mb-4">{pkg.price}</p>
                      <div className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle size={16} className={
                              pkg.color === 'blue' ? 'text-blue-500' : 
                              pkg.color === 'green' ? 'text-green-500' : 
                              'text-purple-500'
                            } />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        
                       
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      
      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <div className="w-auto h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-gray-600">
                {selectedUser.email.slice(0,20)}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">ID</label>
                <div className="mt-1 text-sm">{selectedUser.id}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-sm">{selectedUser.email}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Package</label>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${selectedUser.package === 'Basic' ? 'bg-blue-100 text-blue-800' : 
                      selectedUser.package === 'Standard' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'}`}>
                    {selectedUser.package}
                  </span>
               
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Files Uploaded</label>
                <div className="mt-1 text-sm">{selectedUser.filesUploaded}</div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="bg-white text-gray-700 px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setShowUserModal(false)}
              >
                Close
              </button>
              <button 
  className={`px-4 py-2 rounded-lg text-white ${
  selectedUser.status === 'Active' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
  }`}
    onClick={() => {
    toggleUserStatus(selectedUser.id,selectedUser.status);
    setShowUserModal(false);
  }}
>
  {selectedUser.status === 'Active' ? 'Hold Account' : 'Activate Account'}
</button>
            </div>
          </div>
        </div>
      )}


   
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ icon, text, active, onClick }) {
  return (
    <div 
      className={`flex items-center space-x-3 px-6 py-3 cursor-pointer ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
      onClick={onClick}>
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, bgColor }) {
  return (
    <div className="rounded-lg shadow overflow-hidden">
      <div className={`${bgColor} p-4 text-white`}>
        <h4 className="text-lg font-medium">{title}</h4>
      </div>
      <div className="bg-white p-4">
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}