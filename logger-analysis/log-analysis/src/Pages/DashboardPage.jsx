import React from 'react';
import { FaBell, FaChartLine, FaFileUpload, FaSearch, FaUserAlt } from 'react-icons/fa';
import Analysislog from '../components/Analysislog';
import { useLogData } from '../components/Logcontext';
import LogFileUpload from '../components/Logfile';
import Navbar from '../components/Navbar';
import LogAnalysisChart from '../components/Piechart';
import LogUsers from '../components/logUserscount';

const DashboardPage = () => {

  const { rowCount,uploadedFileCount } = useLogData(); // Use context


  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-6 sm:p-8 ml-5 sm:ml-16 lg:ml-66">
        {/* Top Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="mt-1 text-gray-500">Welcome back! Here's an overview of your log analysis</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="relative">
                <FaBell className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">3</span>
              </div>
              
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <FaUserAlt />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <FaFileUpload size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Files Uploaded</h3>
                <div className="text-2xl font-bold text-gray-800">{uploadedFileCount}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="ml-1 text-gray-500">from last week</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                <FaSearch size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Analyzed Logs</h3>
                <div className="text-2xl font-bold text-gray-800">{rowCount}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 font-medium">+24%</span>
              <span className="ml-1 text-gray-500">from last month</span>
            </div>
          </div>
          
      
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                <FaChartLine size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
                <div className="text-2xl font-bold text-gray-800">{rowCount}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-red-600 font-medium">-3%</span>
              <span className="ml-1 text-gray-500">from last week</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Log File Upload</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">Latest</span>
            </div>
            <div className="p-5">
              <LogFileUpload/>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Log Analysis</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">Active</span>
            </div>
            <div className="p-5">
              <Analysislog/>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">User Statistics</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">Updated</span>
            </div>
            <div className="p-5 flex justify-center">
              <LogUsers/>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Log Analysis Summary</h2>
              <p className="text-sm text-gray-500 mt-1">Visualization of processed log data</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">Daily</button>
              <button className="px-3 py-1 text-sm border border-blue-500 rounded-md bg-blue-50 text-blue-700">Weekly</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">Monthly</button>
            </div>
          </div>
          <div className="p-5">
            <LogAnalysisChart/>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center text-sm text-gray-500">
          <div>
            &copy; 2025 Log Analysis Dashboard. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Help</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;