import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav">
      <a href="/" className="Logo">
        Medical Direct
      </a>
      <ul className="Navbar-links">
        <li>
          <NavLink to="/Homepage">Home</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};
