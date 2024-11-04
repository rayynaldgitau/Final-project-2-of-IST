// src/utils/validateLogin.js

const validateLogin = (values) => {
     let errors = {};

     // Email validation
     if (!values.email) {
          errors.email = 'Email address is required';
     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = 'Email address is invalid';
     }

     // Password validation
     if (!values.password) {
          errors.password = 'Password is required';
     } else if (values.password.length < 6) {
          errors.password = 'Password must be at least 6 characters';
     }

     return errors;
};

export default validateLogin;
