import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="TravelEase" />
          <span>TravelEase</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>

          {currentUser ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/history" className="nav-link">Booking History</Link>
              <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>

        {/* User Greeting */}
        {currentUser && (
          <div className="user-greeting">
            Welcome, {currentUser.firstName || currentUser.username}!
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
