import toast from 'react-hot-toast'
import { authenticate } from './helper.js';

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if (values.username) {
        const { status } = await authenticate(values.username);
        
        if (status !== 200) {
            errors.exist = toast.error("User does not exist");
        }
    }
    return errors;
}

function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username is required");
    } else if(values.username.includes(" ")) {
        error.username = toast.error("Invalid Username");
    }

    return error;
}

function passwordVerify(errors = {}, values){

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password is required");
    } else if(values.password.includes(" ")) {
        errors.password = toast.error("Invalid Password");
    } else if(values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 characters");
    } else if(!specialCharacters.test(values.password)) {
        errors.password = toast.error("Password must have special characters");
    } 

    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

export async function resetPasswordValidate(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_Password){
        errors.exist = toast.error("Passwords do not match");
    }
    
    return errors;
}


export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}


function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email Id is required");
    } else if(values.email.includes(" ")) {
        error.email = toast.error("Wrong Email Address");
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email Address...!")
    }

    return error;
}


export async function profileValidation(values){
    const errors = emailVerify({}, values);

    return errors;
}