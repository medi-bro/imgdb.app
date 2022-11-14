import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-access";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Sex, Gender, Roles } from "./FormConstants";
import { validateFirstName, validateMiddleName, validateLastName, validateDateOfBirth, validateSex, validateGender, validateRole } from "./LoginsValidation";
import "./SetUpForm.css"


export const SetUpForm = () => {
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
            <Button onClick={handleSetUp} variant="contained">Submit</Button>
        </div>
    );
};

export default SetUpForm;