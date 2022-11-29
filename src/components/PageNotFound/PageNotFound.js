import { Link } from "react-router-dom";
import "./PageNotFound.css";

export const PageNotFound = () => {
    return (
        <div id="page-not-found">
            <h1>Are you lost?</h1>
            <p>That page doesn't exist.</p>
            <Link to="/">Go home</Link>
        </div>
    )
};