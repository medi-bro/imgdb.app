import { useState, useEffect } from "react";
import { auth } from "../../firebase-access";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./LoginButton.css";

const LoginButton = () => {
  const navigate = useNavigate();

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Sign In");

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate("/");
      });
  };

  const handleOnClick = () => {
    if (isUserSignedIn) {
      handleSignOut();
    } else {
      handleSignIn();
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsUserSignedIn(true);
        setButtonLabel("Log Out");
      } else {
        setIsUserSignedIn(false);
        setButtonLabel("Log In");
      }
    });
  }, []);

  return (
    <Button id="login-button" onClick={handleOnClick}>
      {buttonLabel}
    </Button>
  );
};

export default LoginButton;
