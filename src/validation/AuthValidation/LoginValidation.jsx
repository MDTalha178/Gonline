
export const  loginValidation = (data) => {
    const errors = {};
    let isError = false;
    if (!data.email) {
        errors.email = 'Email is required';
        isError = true
    }
    if (!data.password) {
        errors.password = 'Password is required';
        isError = true
    }
    return isError;
}

export const signupValidation  = (data) => {
    const errors = {};
    let isError = false;
    if (!data.last_name) {
        errors.email = 'Last name is required';
        isError = true
    }
    if (!data.first_name) {
        errors.password = 'First name is required';
        isError = true
    }
    if (!data.email) {
        errors.email = 'Email is required';
        isError = true
    }
    if (!data.phone) {
        errors.phone = 'Phone number is required';
        isError = true
    }
    if (!data.password) {
        errors.password = 'Password is required';
        isError = true
    }
    if (!data.confirm_password) {
        errors.confirm_password = 'Confirm password is required';
        isError = true
    }
    return isError;
}

export const validateData = (data, method) => {
    console.log(method);
    if (method === 'signup') {
        return signupValidation(data);
    }
    return loginValidation(data);
};