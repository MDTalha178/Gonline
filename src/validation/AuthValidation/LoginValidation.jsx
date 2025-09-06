const basicMobileRegex = /^[6-9]\d{9}$/;

export const  loginValidation = (data) => {
    const errors = {
        email: '',
        password: '',
        isError: false
    };
    let isError = false;
    if (!data.email) {
        errors.email = 'Email is required';
        errors.isError = true
        isError = true
    }
    if (!data.password) {
        errors.password = 'Password is required';
        errors.isError = true
        isError = true
    }
    return errors;
}

export const signupValidation  = (data) => {
    const errors = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        isError: false
    }
    let isError = false;
    if (!data.last_name) {
        errors.last_name = 'Last name is required';
        errors.isError = true
    }
    if (!data.first_name) {
        errors.first_name = 'First name is required';
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
        errors.isError = true
        isError = true
    }
    if(!data.phone){
        errors.phone = 'Phone number is required';
        errors.isError = true
        isError = true
        
    }
    if (!basicMobileRegex.test(data?.phone)) {
        errors.phone = 'Invalid phone number';
        errors.isError = true
        isError = true
    }
    return errors;
}



export const validateData = (data, method) => {
    console.log(method);
    if (method == 'signup') {
        return signupValidation(data);
    }
    return loginValidation(data);
};

export const phoneValidation = (name,  value) =>{
    const numericValue = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedValue = numericValue.slice(0, 10);
    
    // Create synthetic event for parent handler
    return {
        target: {
            name: 'phone',
            value: limitedValue
        }
    };

}