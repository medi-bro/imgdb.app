import { useState } from "react";
import { auth } from "../../firebase-access";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { TextField, Button } from "@mui/material";
import { validateEmail, validatePassword } from "./LoginsValidation";
import "./SignUpForm.css"

const proiderGoogle = new GoogleAuthProvider();
const signInWithGoogle = () => {
    signInWithPopup(auth, proiderGoogle)
        .catch((error) => {
            console.log(error);
        });
};

const SignUpForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const [emailHintText, setEmailHintText] = useState("");
    const [passwordHintText, setPasswordHintText] = useState("");

    const handleSignUp = () => {
        let isAnyInvalid = false;
        let isInvalid = false; //js being ass
        isInvalid = handleValidateEmail(email);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidatePassword(password);
        isAnyInvalid = isAnyInvalid || isInvalid;

        if (isAnyInvalid === false) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setPassword("");
                })
                .catch((error) => {
                    setPassword("");
                })
        }  
    };

    const handleValidateEmail = (email) => {
        const [isError, hintText] = validateEmail(email);
        setIsEmailInvalid(isError);
        setEmailHintText(hintText);
        return isError;
    };
    const handleValidatePassword = (password) => {
        const [isError, hintText] = validatePassword(password);
        setIsPasswordInvalid(isError);
        setPasswordHintText(hintText);
        return isError;
    };

    return(
        <div id="sign-up-form">
            <h1>Create Account</h1>
            <TextField 
                id="email" 
                label="Email"
                value={email}
                onChange={(event) => {setEmail(event.target.value); handleValidateEmail(event.target.value);}}
                error={isEmailInvalid}
                helperText={emailHintText}
                />
            <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => {setPassword(event.target.value); handleValidatePassword(event.target.value);}}
                error={isPasswordInvalid}
                helperText={passwordHintText}
                />
            <Button id="sign-up" type="submit" onClick={handleSignUp}  variant="contained">Sign Up</Button>
            <Button onClick={signInWithGoogle} variant="contained">Sign Up With Google</Button>
            <Button id="sign-in-instead" onClick={props.onPreferSignIn}>Sign In Instead</Button>
        </div>
    );
};

export default SignUpForm;