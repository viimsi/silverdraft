import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
