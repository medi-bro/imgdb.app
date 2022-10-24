import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <>
        <h1>Home</h1>
        <Link to="/login">Login</Link><br/>
        <Link to="/consultants">Consultants</Link>
        </>
    )
};