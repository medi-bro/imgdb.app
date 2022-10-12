import { Link } from "react-router-dom";
import { TestSignOutButton } from "./logins/TestSignOutButton";

export const HomePage = () => {
    return (
        <>
        <h1>Home</h1>
        <TestSignOutButton/><br/>
        <Link to="/login">Login</Link>
        </>
    )
};