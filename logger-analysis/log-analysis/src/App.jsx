import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/Protectedroute';
import DashboardPage from './Pages/DashboardPage';
import Filehandle from './Pages/Filehandle';
import ForgotPasswordPage from './Pages/Forgotpassword';
import Landing from "./Pages/Landingpage";
import Login from './Pages/Login';
import Register from './Pages/Register';
import UpdateUser from "./Pages/updateUser";
import { setUser } from "./Redux/userSlice";
import Anotomy from "./Pages/Anotomydetect";
import Viewlogdata from "./Pages/Viewlogdata";
import MainAdmin from "./Pages/Mainadmin";

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUser({ email: decoded.email, token }));
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, [dispatch]);
  

  return (
    <Router>
      <div className=" flex">
        {/* Premium Navbar (Sidebar) */}
        <Navbar />

        {/* Main Content Area - adjusted margin for wider navbar */}
        <div className="flex-1 ml-0 ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/filehandle"
          element={
            <ProtectedRoute>
              <Filehandle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
            <UpdateUser/>
            </ProtectedRoute>
          }
        />

           <Route
          path="/Anotomy"
          element={
            <ProtectedRoute>
             <Anotomy/>
            </ProtectedRoute>
          }
        />

       <Route
          path="/viewlog"
          element={
            <ProtectedRoute>
             <Viewlogdata/>
            </ProtectedRoute>
          }
        />

          <Route
          path="/main-admin"
          element={
            <ProtectedRoute>
             <MainAdmin/>
            </ProtectedRoute>
          }
        />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;