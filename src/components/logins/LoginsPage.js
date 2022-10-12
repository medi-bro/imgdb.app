import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/*
one thing to note. creation of account != user exising in db
this is beacause of the way firebase handles auth
so we have to create the user doc, which requires additional info for consistency
this page handles all of that, but it is possible to have an user with incomplete setup (no doc in db)
its bug but dont how else to enforce required info since it is a doc read every check (if were to do so every page)
this could be fixed with removal of google sign in, but g sign in looks more professional
also, firebase automatically handles password security, no need to panic

todo
validate fields
text field submit handlers
css
 */


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
        //validate fields
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setPassword("");
            })
            .catch((error) => {
                setPassword("");
            });
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
                <Button id="sign-in" onClick={handleSignIn}>Sign In</Button>
                <Button onClick={signInWithGoogle}>Sign In With Google</Button>
                <Button onClick={props.onPreferSignUp}>Sign Up Instead</Button>
            </div>
    );
};

const SignUpForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        //validate fields
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setPassword("");
            })
            .catch((error) => {
                setPassword("");
            });
    };

    return(
        <div id="sign-up-form">
            <h1>Create Account</h1>
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
            <Button id="sign-up" onClick={handleSignUp}>Sign Up</Button>
            <Button onClick={signInWithGoogle}>Sign Up With Google</Button>
            <Button onClick={props.onPreferSignIn}>Sign In Instead</Button>
        </div>
    );
};

const SetUpForm = () => {
    const Sex = {
        male: "male",
        female: "female",
        intersex: "intersex"
    };
    const Gender = {
        man: "man",
        woman: "woman",
        other: "other"
    };
    const Roles = {
        paient: "paitent",
        doctor: "doctor",
        consultant: "consultant",
        ct: "ct"
    };

    const navigate = useNavigate();

    const [uid, setUid] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null); //dayjs date class
    const [sex, setSex] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                // console.log(currentUser.uid);
                setUid(currentUser.uid);
                setEmail(currentUser.email);
                if (currentUser.displayName) {
                    //try parse name from display name
                    const names = currentUser.displayName.split(" ");
                    switch(names.length) {
                        case 1:
                            setFirstName(names[0]);
                            setMiddleName("");
                            setLastName("");
                            break;
                        case 2:
                            setFirstName(names[0]);
                            setMiddleName("");
                            setLastName(names[1]);
                            break;
                        case 3:
                            setFirstName(names[0]);
                            setMiddleName(names[1]);
                            setLastName(names[2]);
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }, [])

    const assembleUserData = () => {
        return {
            email: email,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dateOfBirth: Timestamp.fromDate(dateOfBirth.toDate()), //no null check, dont fuck up
            sex: sex,
            gender: gender,
            pictureUrl: "https://lh3.googleusercontent.com/a/ALm5wu3bR4cCcp4Y9b6p9VuKdTpzKGjA4NEwCIpry0B-=s83-c-mo",
            roles: [role]
        };
    }

    const handleSetUp = () => {
        //validate required fields
        //only uid, email, first, last, dob, sex required for setup
        const userData = assembleUserData();
        setDoc(doc(db, "users", uid), userData)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return(
        <div id="set-up-form">
            <h1>Setup Account</h1>
            <TextField 
                id="first-name" 
                label="First Name"
                value={firstName}
                onChange={(event) => {setFirstName(event.target.value)}}/>
            <TextField 
                id="middle-name" 
                label="Middle Name"
                value={middleName}
                onChange={(event) => {setMiddleName(event.target.value)}}/>
            <TextField 
                id="last-name" 
                label="Last Name"
                value={lastName}
                onChange={(event) => {setLastName(event.target.value)}}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={(value) => {setDateOfBirth(value);}}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                    labelId="sex-label"
                    id="sex"
                    value={sex}
                    label="Sex"
                    onChange={(event) => {setSex(event.target.value)}}
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={Sex.male}>{Sex.male}</MenuItem>
                    <MenuItem value={Sex.female}>{Sex.female}</MenuItem>
                    <MenuItem value={Sex.intersex}>{Sex.intersex}</MenuItem>
                </Select>
                <FormHelperText>Error text here</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    label="Gender"
                    onChange={(event) => {setGender(event.target.value)}}
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={Gender.man}>{Gender.man}</MenuItem>
                    <MenuItem value={Gender.woman}>{Gender.woman}</MenuItem>
                    <MenuItem value={Gender.other}>{Gender.other}</MenuItem>
                </Select>
                <FormHelperText>Error text here</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    label="Role"
                    onChange={(event) => {setRole(event.target.value)}}
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={Roles.paient}>{Roles.paient}</MenuItem>
                    <MenuItem value={Roles.doctor}>{Roles.doctor}</MenuItem>
                    <MenuItem value={Roles.consultant}>{Roles.consultant}</MenuItem>
                    <MenuItem value={Roles.ct}>{Roles.ct}</MenuItem>
                </Select>
                <FormHelperText>Error text here</FormHelperText>
            </FormControl>
            <Button id="sign-up" onClick={handleSetUp}>Submit</Button>
        </div>
    );
};

export const LoginsPage = () => {
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