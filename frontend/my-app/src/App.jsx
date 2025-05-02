import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import OCListGeneralPage from './pages/OCListGeneralPage';
import UserOCPage from './pages/UserOCPage';
import OCDetailPage from './pages/OCDetailPage';
import OCEditPage from './pages/OCEditPage';
import NewOCPage from './pages/NewOCPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<OCListGeneralPage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/oc/:id"
            element={
                <OCDetailPage />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-ocs"
            element={
              <ProtectedRoute user={user}>
                <UserOCPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/oc/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <OCEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/oc/add"
            element={
              <ProtectedRoute user={user}>
                <NewOCPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
