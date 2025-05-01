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
      <Routes>
        <Route path="/" element={<OCListGeneralPage/>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/my-ocs" element={<UserOCPage user={user} />} />
        <Route path="/oc/:id" element={<OCDetailPage />} />
        <Route path="/oc/edit/:id" element={<OCEditPage />} />
        <Route path="/oc/add" element={<NewOCPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
