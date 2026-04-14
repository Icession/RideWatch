import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = ['/', '/home', '/login', '/register'].includes(location.pathname);

  if (hideNavbar) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">Ride<strong>Watch</strong></h2>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;