import validator from 'validator';


const emailIsValid = (value) => validator.isEmail(value);

const isPhone = (value) => validator.matches(value, /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/im);

const passwordIsLength = (value) => validator.isLength(value, { min: 6 });

const nameIsLength = (value) => validator.isLength(value, { min: 2 });

const textIsLength = (value) => validator.isLength(value, { min: 10 });

const countryIsLength = (value) => validator.isLength(value, { min: 2, max: 28 });

const isEqual = (pass, rePass) => validator.equals(pass, rePass);

const isEmpty = (value) => !(validator.isEmpty(value));

const userValidation = {
    emailIsValid,
    isPhone,
    passwordIsLength,
    nameIsLength,
    textIsLength,
    isEqual,
    isEmpty,
    countryIsLength
};


export default userValidation;