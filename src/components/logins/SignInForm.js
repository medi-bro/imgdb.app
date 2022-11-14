import { useState } from "react";
import { auth } from "../../firebase-access";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { TextField, Button } from "@mui/material";
import { validateEmail, validatePassword} from "./LoginsValidation";
import "./SignInForm.css"


const proiderGoogle = new GoogleAuthProvider();
const signInWithGoogle = () => {
    signInWithPopup(auth, proiderGoogle)
        .catch((error) => {
            console.log(error);
        });
};

const SignInForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        let isAnyInvalid = false;
        isAnyInvalid = isAnyInvalid || validateEmail(email)[0];
        isAnyInvalid = isAnyInvalid || validatePassword(password)[0];

        if (isAnyInvalid === false) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setPassword("");
                })
                .catch((error) => {
                    setPassword("");
                });
        }
        else {
            setPassword("");
        }
    };

    return(        
        <div id="sign-in-form">
                <h1>Sign In</h1>
                <TextField 
                    id="email" 
                    label="Email"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}/>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}/>
                <Button id="sign-in" type="submit" onClick={handleSignIn} variant="contained">Sign In</Button>
                <Button onClick={signInWithGoogle} variant="contained">Sign In With Google</Button>
                <Button id="sign-up-instead" onClick={props.onPreferSignUp}>Sign Up Instead</Button>
            </div>
    );
};

export default SignInForm;