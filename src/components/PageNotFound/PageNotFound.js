import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <>
        <h1>Are you lost?</h1>
        <p>That page doesn't exist.</p>
        <Link to="/">Go home</Link>
        </>
    )
};