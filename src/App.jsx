import { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import axios from 'axios';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import OAuthSuccess from './pages/OAuthSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Protected Route Component
const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const res = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/oauth-success" element={<OAuthSuccess setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute user={user}>
            <Home user={user} setUser={setUser} />
          </ProtectedRoute>
        } />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;