import validator from 'validator';

const titleIsLength = (value) => validator.isLength(value, { min: 3, max: 18 });

const purposeIsLength = (value) => validator.isLength(value, { min: 2, max: 20 });

const placeIsLength = (value) => validator.isLength(value, { min: 2, max: 18 });

const dateIsValid = (value) => validator.isDate(value, { format: 'DD/MM/YYYY' });

const urlIsValid = (value) => validator.isURL(value);

const descriptionIsLength = (value) => validator.isLength(value, { min: 5, max: 1000 });


const causeValidation = {
    titleIsLength,
    purposeIsLength,
    placeIsLength,
    dateIsValid,
    urlIsValid,
    descriptionIsLength
}

export default causeValidation;