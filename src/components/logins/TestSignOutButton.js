import { useState, useEffect } from "react";
import { auth } from "../../firebase-access";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";

export const TestSignOutButton = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out.");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser)
                setIsUserSignedIn(true);
            else
                setIsUserSignedIn(false);
        });
    }, [])

    return(<Button id="sign-in" onClick={handleSignOut} variant="contained" disabled={!isUserSignedIn}>Sign Out</Button>);
};