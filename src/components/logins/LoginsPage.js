import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SetUpForm from "./SetUpForm";



/*
one thing to note. creation of account != user exising in db
this is beacause of the way firebase handles auth
so we have to create the user doc, which requires additional info for consistency
this page handles all of that, but it is possible to have an user with incomplete setup (no doc in db)
its bug but dont how else to enforce required info since it is a doc read every check (if were to do so every page)
this could be fixed with removal of google sign in, but g sign in looks more professional
also, firebase automatically handles password security, no need to panic

todo
css
 */

const LoginsPage = () => {
    const [userIsSetup, setUserIsSetup] = useState(null);
    const [uid, setUid] = useState("");
    const [userTryingToSignIn, setUserTryingToSignIn] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                // console.log(currentUser.uid);
                setUid(currentUser.uid);
                checkAndSetIfUserIsSetup(currentUser.uid);
            }
        });
    }, [])

    const checkAndSetIfUserIsSetup = (uid) => {
        //originally planned to return a value, but it kept on getting set as undefined
        if(uid !== "") {
            getDoc(doc(db, "users", uid))
                .then((userDoc) => {
                    // console.log(userDoc.exists());
                    setUserIsSetup(userDoc.exists());
                })
                .catch(() => {
                    // console.log("doc error");
                    setUserIsSetup(false);
                })
        }
        else {
            // console.log("uid missing");
            setUserIsSetup(false);
        }
    }

    const handleUserPreferSignIn = () => {
        setUserTryingToSignIn(true);
    };
    const handleUserPreferSignUp = () => {
        setUserTryingToSignIn(false);
    };


    //if signed in
    if (uid) {
        if (userIsSetup === true) {
            return(<Navigate to="/"/>);
        }
        else if (userIsSetup === false) {
            return(<SetUpForm/>);
        }
        //else unsure if user is setup
        else {
            return(<></>);
        }
    }
    else {
        if (userTryingToSignIn) {
            return(<SignInForm onPreferSignUp={handleUserPreferSignUp}/>);
        }
        else {
            return(<SignUpForm onPreferSignIn={handleUserPreferSignIn}/>);
        }
    }
};

export default LoginsPage;