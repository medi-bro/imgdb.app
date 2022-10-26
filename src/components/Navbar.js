import { NavLink } from "react-router-dom";
import { LoginButton } from "./logins/LoginButton";

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
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/cases">My Cases</NavLink>
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
};
