import { NavLink } from "react-router-dom";
import LoginButton from "./logins/LoginButton";

export const Navbar = () => {
  return (
    <nav className="nav">
      <a href="/" className="Logo-space">
        <img className="Logo" src="/imgs/md_logoa.png" alt=""></img>
        <img className="title" src="/imgs/MD_titlea.png" alt=""></img>
      </a>
      <ul className="Navbar-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/cases">My Cases</NavLink>
        </li>
        <li>
          <NavLink to="/consultants">Consultants</NavLink>
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
};
