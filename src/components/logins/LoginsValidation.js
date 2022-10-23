import { Sex, Gender, Roles } from "./FormConstants";
import { Timestamp } from "firebase/firestore";

export const validateEmail = (input) => {
    let isError = false;
    let hintText = "";
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (input === "") {
        isError = true;
        hintText = "";
    }
    else if (!emailRegex.test(input)) {
        isError = true;
        hintText = "Please enter a valid email";
    }

    return [isError, hintText];
};
export const validatePassword = (input) => {
    let isError = false;
    let hintText = "";
    const passwordRegex = /(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[!-/:-@[-`{-~]).{6,}/;

    if (input.length < 6 || input.length > 64) {
        isError = true;
        hintText = "Password must be between 6 and 64 characters long"
    }
    else if (input.length < 24 && !passwordRegex.test(input)) {
        isError = true;
        hintText = "Short passwords must contain 1 of each: a lowercase letter, a uppercase letter, a number, and a special character";
    }

    return [isError, hintText];
};

export const validateFirstName = (input) => {
    let isError = false;
    let hintText = "";
    const whiteSpaceRegex = /.*\s+.*/;

    if (input === "") {
        isError = true;
        hintText = "";
    }
    else if (input.length > 20) {
        isError = true;
        hintText = "Name is too long"
    }
    else if (whiteSpaceRegex.test(input)) {
        isError = true;
        hintText = "Name must not contain spaces"
    }

    return [isError, hintText];
};

export const validateMiddleName = (input) => {
    let isError = false;
    let hintText = "";
    const whiteSpaceRegex = /.*\s+.*/;

    if (input === "") {
        //not a required field
        isError = false;
        hintText = "";
    }
    else if (input.length > 20) {
        isError = true;
        hintText = "Name is too long"
    }
    else if (whiteSpaceRegex.test(input)) {
        isError = true;
        hintText = "Name must not contain spaces"
    }
    
    return [isError, hintText];
};
export const validateLastName = (input) => {
    let isError = false;
    let hintText = "";
    const whiteSpaceRegex = /.*\s+.*/;

    if (input === "") {
        isError = true;
        hintText = "";
    }
    else if (input.length > 20) {
        isError = true;
        hintText = "Name is too long"
    }
    else if (whiteSpaceRegex.test(input)) {
        isError = true;
        hintText = "Name must not contain spaces"
    }
    
    return [isError, hintText];
};
export const validateDateOfBirth = (input) => {
    let isError = false;
    let hintText = "";
    if (input === null) {
        isError = true;
        hintText = "Enter a valid date of birth";
    }
    else  {
        const dateConversion = input.toDate();
        const timestampConversion = Timestamp.fromDate(dateConversion);
        if (timestampConversion === null || timestampConversion === undefined) {
            isError = true;
            hintText = "Error when converting date to Timestamp";
        }
        //ideally this would be governed by EULA requriements
        //but for right now this would allow for newborns to be registered
        else if (dateConversion.getTime() > Date.now()) {
            isError = true;
            hintText = "Enter a valid date of birth";
        }
    }
    
    return [isError, hintText];
};
export const validateSex = (input) => {
    let isError = false;
    let hintText = "";
    const validOptions = Object.values(Sex);

    if (!validOptions.includes(input)) {
        isError = true;
        hintText = "Must choose a valid option";
    }

    return [isError, hintText];
};
export const validateGender = (input) => {
    let isError = false;
    let hintText = "";
    const validOptions = Object.values(Gender);

    if (input === "") {
        //not a required field
        isError = false;
        hintText = "";
    }
    else if (!validOptions.includes(input)) {
        isError = true;
        hintText = "Option must be valid";
    }
    
    return [isError, hintText];
};
export const validateRole = (input) => {
    let isError = false;
    let hintText = "";
    const validOptions = Object.values(Roles);

    if (!validOptions.includes(input)) {
        isError = true;
        hintText = "Must choose a valid option";
    }
    
    return [isError, hintText];
};
