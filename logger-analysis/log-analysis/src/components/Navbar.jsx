import { useState, useEffect } from 'react';
import { FaChartLine, FaHome, FaCog, FaSignOutAlt, FaUser, FaBars, FaTimes, FaFile, FaBug, FaDatabase } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/' || location.pathname== '/forgot-password' ||location.pathname == '/login' || location.pathname === '/register' || location.pathname === '/main-admin';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render navbar on login/register pages
  if (isLoginOrRegister) {
    return null;
  }

  // Check if screen is small
  const isMobile = windowWidth < 768;

  return (
    <>
      {/* Mobile toggle button - visible only on small screens */}
      {isMobile && (
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-md shadow-md"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Navbar - full width on desktop, slide-in on mobile */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl z-40 transition-all duration-300 ${
          isMobile 
            ? `w-72 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'w-72'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="p-6 border-b border-blue-600/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <FaChartLine className="text-blue-700 text-xl" />
              </div>
              <span className="font-bold text-xl tracking-tight truncate">Logger Analyzer</span>
            </div>
          </div>

          {/* Menu section */}
          <div className="p-4 flex-1 overflow-y-auto">
            <p className="text-xs font-medium text-blue-300 uppercase tracking-wider px-4 mb-3">Main Menu</p>
            <nav className="space-y-2">
              <Link 
                to="/home" 
                className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-80 rounded-lg text-gray-200 hover:text-white transition-all duration-200"
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
              >
                <FaHome className="mr-3 text-lg" />
                Home
              </Link>

              <Link 
                to="/Anotomy" 
                className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-80 rounded-lg text-gray-200 hover:text-white transition-all duration-200"
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
              >
                <FaBug className="mr-3 text-lg" />
                Anotomy Analysis
              </Link>
              <Link 
                to="/viewlog" 
                className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-80 rounded-lg text-gray-200 hover:text-white transition-all duration-200"
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
              >
                <FaDatabase className="mr-3 text-lg" />
                View Logs
              </Link>
              <Link 
                to="/filehandle" 
                className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-80 rounded-lg text-gray-200 hover:text-white transition-all duration-200"
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
              >
                <FaFile className="mr-3 text-lg" />
                File handle
              </Link>

              
            </nav>

            {/* Additional menu sections */}
            <p className="text-xs font-medium text-blue-300 uppercase tracking-wider px-4 mb-3 mt-6">Account</p>
            <nav className="space-y-2">
              <Link 
                to="/profile" 
                className="flex items-center px-4 py-3 hover:bg-black hover:bg-opacity-80 rounded-lg text-gray-200 hover:text-white transition-all duration-200"
                onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}>
                <FaUser className="mr-3 text-lg" />
                Profile
              </Link>
            </nav>
          </div>

          {/* Footer section */}
          <div className="p-4 border-t border-blue-600/40">
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
        </div>
      </div>

      {/* Overlay - only visible on mobile when menu is open */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;