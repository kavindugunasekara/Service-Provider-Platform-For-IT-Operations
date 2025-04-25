import { Link } from 'lucide-react';
import React, { useState } from 'react';
import SubscriptionCards from '../components/Subcard';

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');
  
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-500 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 bg-opacity-80 rounded-lg flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Logger Analysis</span>
        </div>
        
        <div className="flex space-x-4">
        <a href = '/login'>
        <button 
            onClick={() => openModal('register')}
            className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg">
            Login
          </button></a>
           <a href = '/register'> <button 
            className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg">
            Register
          </button>
          </a>
        </div>
      </nav>
      
      {/* Hero Section with glass morphism effect */}
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h5 className="text-blue-400 font-semibold mb-2">NEXT-GEN LOG ANALYTICS</h5>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Powerful Log <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Analysis</span> Made Simple
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Transform complex log data into actionable insights. Monitor, analyze, and optimize your applications with comprehensive visualization tools.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-3 rounded-md bg-gray-800 bg-opacity-50 hover:bg-opacity-70 border border-gray-700 transition-all duration-300 font-medium shadow-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="flex -space-x-2">
                
              </div>
              <span>Trusted by <span className="text-gray-500 font-medium">2,000+</span> developers</span>
            </div>
          </div>
         
          
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -right-4 -bottom-4 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            
            <div className="relative bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">server-logs-dashboard.json</div>
              </div>
             
              <div className="mt-6 bg-gray-900 bg-opacity-60 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Status Summary</span>
                  <span className="text-xs px-2 py-1 bg-green-500 bg-opacity-20 text-white rounded-full">Live</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">870</div>
                    <div className="text-xs text-gray-400">Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">855</div>
                    <div className="text-xs text-gray-400">Redirects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">555</div>
                    <div className="text-xs text-gray-400">Client Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">100</div>
                    <div className="text-xs text-gray-400">Server Errors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionCards/>
      
      {/* Services Section */}
      <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Log Analysis Services</h2>
            <p className="text-gray-300">Our comprehensive suite of log analysis tools provides deep insights into your application's performance, security, and user behavior.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-600 group-hover:bg-opacity-30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">Status Code Distribution</h3>
              <p className="text-gray-400 mb-6">Visualize HTTP status codes distribution to quickly identify success rates, client errors, and server issues within your logs.</p>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">200 OK</span>
                  <span className="text-xs text-green-400">870</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{width: '87%'}}></div>
                </div>
                
                <div className="flex justify-between mt-3 mb-2">
                  <span className="text-xs text-gray-500">404 Not Found</span>
                  <span className="text-xs text-yellow-400">222</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{width: '8%'}}></div>
                </div>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-600 group-hover:bg-opacity-30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">HTTP Method Frequency</h3>
              <p className="text-gray-400 mb-6">Analyze the distribution of HTTP methods (GET, POST, PUT, DELETE) to understand API usage patterns and client behavior.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg text-center">
                  <div className="text-green-400 text-lg font-semibold">GET</div>
                  <div className="text-2xl font-bold">687</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg text-center">
                  <div className="text-blue-400 text-lg font-semibold">POST</div>
                  <div className="text-2xl font-bold">225</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg text-center">
                  <div className="text-yellow-400 text-lg font-semibold">PUT</div>
                  <div className="text-2xl font-bold">788</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg text-center">
                  <div className="text-red-400 text-lg font-semibold">DELETE</div>
                  <div className="text-2xl font-bold">300</div>
                </div>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 text-green-400 group-hover:bg-green-600 group-hover:bg-opacity-30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors duration-300">Requests Over Time</h3>
              <p className="text-gray-400 mb-6">Track request volumes across time to identify peak usage periods, traffic patterns, and detect anomalies in real-time.</p>
              
              <div className="h-32 flex items-end justify-between space-x-1">
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '30%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '45%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '65%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '85%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '100%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '75%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '60%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-40 rounded-t-sm" style={{height: '90%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '70%'}}></div>
                <div className="w-full bg-green-500 bg-opacity-20 rounded-t-sm" style={{height: '50%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>6AM</span>
                <span>12PM</span>
                <span>6PM</span>
              </div>
            </div>
            
            {/* Service 4 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 text-red-400 group-hover:bg-red-600 group-hover:bg-opacity-30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors duration-300">IP Requests vs. Status Code</h3>
              <p className="text-gray-400 mb-6">Correlate IP addresses with status codes to identify suspicious activity, problematic clients, or potential security threats.</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                  <div>
                    <div className="font-mono text-sm">192.168.1.105</div>
                    <div className="text-xs text-gray-500">245 requests</div>
                  </div>
                  <div className="flex space-x-1">
                    <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded text-xs">200</span>
                    <span className="px-2 py-1 bg-red-500 bg-opacity-20 text-red-400 rounded text-xs">403</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                  <div>
                    <div className="font-mono text-sm">10.0.0.234</div>
                    <div className="text-xs text-gray-500">182 requests</div>
                  </div>
                  <div className="flex space-x-1">
                    <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded text-xs">200</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service 5 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 text-yellow-400 group-hover:bg-yellow-600 group-hover:bg-opacity-30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">Success vs. Failure Requests</h3>
              <p className="text-gray-400 mb-6">Get a comprehensive view of your application's health by comparing successful requests against failures over time.</p>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                      Success Rate
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-400">
                      92%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                  <div style={{width: "92%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-green-500"></div>
                </div>
                
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                      Failure Rate
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-red-400">
                      8%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                  <div style={{width: "8%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-400 to-red-500"></div>
                </div>
              </div>
            </div>
            
            {/* Service 6 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-indigo-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:bg-opacity-30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors duration-300">AI-based Anatomy Detection System</h3>
<p className="text-gray-400 mb-6">Utilizes machine learning models to analyze anatomical patterns and detect anomalies in medical data.</p>

<div className="space-y-3">
 
 
</div>

{/* Error Content Logs Section */}


            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Landing;
