import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Sex, Gender, Roles } from "./FormConstants";
import { validateEmail, validatePassword, validateFirstName, validateMiddleName, 
    validateLastName, validateDateOfBirth, validateSex, validateGender, validateRole } from "./LoginsValidation";

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
                <Button onClick={props.onPreferSignUp}>Sign Up Instead</Button>
            </div>
    );
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
            <Button onClick={props.onPreferSignIn}>Sign In Instead</Button>
        </div>
    );
};

const SetUpForm = () => {
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

    const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
    const [isMiddleNameInvalid, setIsMiddleNameInvalid] = useState(false);
    const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
    const [isDateOfBirthInvalid, setIsDateOfBirthInvalid] = useState(false);
    const [isSexInvalid, setIsSexInvalid] = useState(false);
    const [isGenderInvalid, setIsGenderInvalid] = useState(false);
    const [isRoleInvalid, setIsRoleInvalid] = useState(false);

    const [firstNameHintText, setFirstNameHintText] = useState("");
    const [middleNameHintText, setMiddleNameHintText] = useState("");
    const [lastNameHintText, setLastNameHintText] = useState("");
    const [dateOfBirthHintText, setDateOfBirthHintText] = useState("");
    const [sexHintText, setSexHintText] = useState("");
    const [genderHintText, setGenderHintText] = useState("");
    const [roleHintText, setRoleHintText] = useState("");

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
        //only uid, email, first, last, dob, sex, role required for setup
        let isAnyInvalid = false;
        let isInvalid = false; //js being ass
        isInvalid = handleValidateFirstName(firstName);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidateMiddleName(middleName);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidateLastName(lastName);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidateDateOfBirth(dateOfBirth);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidateSex(sex);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidateGender(gender);
        isAnyInvalid = isAnyInvalid || isInvalid;
        isInvalid = handleValidateRole(role);
        isAnyInvalid = isAnyInvalid || isInvalid;
        if (isAnyInvalid === false) {
            const userData = assembleUserData();
            setDoc(doc(db, "users", uid), userData)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleValidateFirstName = (firstName) => {
        const [isError, hintText] = validateFirstName(firstName);
        setIsFirstNameInvalid(isError);
        setFirstNameHintText(hintText);
        return isError;
    };
    const handleValidateMiddleName = (middleName) => {
        const [isError, hintText] = validateMiddleName(middleName);
        setIsMiddleNameInvalid(isError);
        setMiddleNameHintText(hintText);
        return isError;
    };
    const handleValidateLastName = (lastName) => {
        const [isError, hintText] = validateLastName(lastName);
        setIsLastNameInvalid(isError);
        setLastNameHintText(hintText);
        return isError;
    };
    const handleValidateDateOfBirth = (dateOfBirth) => {
        const [isError, hintText] = validateDateOfBirth(dateOfBirth);
        setIsDateOfBirthInvalid(isError);
        setDateOfBirthHintText(hintText);
        return isError;
    };
    const handleValidateSex = (sex) => {
        const [isError, hintText] = validateSex(sex);
        setIsSexInvalid(isError);
        setSexHintText(hintText);
        return isError;
    };
    const handleValidateGender = (gender) => {
        const [isError, hintText] = validateGender(gender);
        setIsGenderInvalid(isError);
        setGenderHintText(hintText);
        return isError;
    };
    const handleValidateRole = (role) => {
        const [isError, hintText] = validateRole(role);
        setIsRoleInvalid(isError);
        setRoleHintText(hintText);
        return isError;
    };

    return(
        <div id="set-up-form">
            <h1>Setup Account</h1>
            <TextField 
                id="first-name" 
                label="First Name"
                value={firstName}
                onChange={(event) => {setFirstName(event.target.value); handleValidateFirstName(event.target.value);}}
                error={isFirstNameInvalid}
                helperText={firstNameHintText}
                required
                />
            <TextField 
                id="middle-name" 
                label="Middle Name"
                value={middleName}
                onChange={(event) => {setMiddleName(event.target.value); handleValidateMiddleName(event.target.value);}}
                error={isMiddleNameInvalid}
                helperText={middleNameHintText}
                />
            <TextField 
                id="last-name" 
                label="Last Name"
                value={lastName}
                onChange={(event) => {setLastName(event.target.value); handleValidateLastName(event.target.value);}}
                error={isLastNameInvalid}
                helperText={lastNameHintText}
                required
                />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={(value) => {setDateOfBirth(value); handleValidateDateOfBirth(value);}}
                    renderInput={(params) => <TextField {...params} error={isDateOfBirthInvalid} helperText={dateOfBirthHintText} required/>}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }} required>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                    labelId="sex-label"
                    id="sex-select"
                    value={sex}
                    label="Sex"
                    onChange={(event) => {setSex(event.target.value); handleValidateSex(event.target.value);}}
                    error={isSexInvalid}
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={Sex.male}>{Sex.male}</MenuItem>
                    <MenuItem value={Sex.female}>{Sex.female}</MenuItem>
                    <MenuItem value={Sex.intersex}>{Sex.intersex}</MenuItem>
                </Select>
                <FormHelperText>{sexHintText}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    value={gender}
                    label="Gender"
                    onChange={(event) => {setGender(event.target.value); handleValidateGender(event.target.value);}}
                    error={isGenderInvalid}
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={Gender.man}>{Gender.man}</MenuItem>
                    <MenuItem value={Gender.woman}>{Gender.woman}</MenuItem>
                    <MenuItem value={Gender.other}>{Gender.other}</MenuItem>
                </Select>
                <FormHelperText>{genderHintText}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    onChange={(event) => {setRole(event.target.value); handleValidateRole(event.target.value);}}
                    error={isRoleInvalid}
                    required
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={Roles.paient}>{Roles.paient}</MenuItem>
                    <MenuItem value={Roles.doctor}>{Roles.doctor}</MenuItem>
                    <MenuItem value={Roles.consultant}>{Roles.consultant}</MenuItem>
                    <MenuItem value={Roles.ct}>{Roles.ct}</MenuItem>
                </Select>
                <FormHelperText>{roleHintText}</FormHelperText>
            </FormControl>
            <Button id="sign-up" onClick={handleSetUp} variant="contained">Submit</Button>
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