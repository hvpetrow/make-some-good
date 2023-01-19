import validator from 'validator';

const titleIsLength = (value) => validator.isLength(value, { min: 3, max: 28 });

const purposeIsLength = (value) => validator.isLength(value, { min: 2, max: 30 });

const placeIsLength = (value) => validator.isLength(value, { min: 2, max: 28 });

const dateIsValid = (value) => validator.isDate(value, { format: 'DD/MM/YYYY' });

const urlIsValid = (value) => value === '' ? true : validator.isURL(value);

const descriptionIsLength = (value) => validator.isLength(value, { min: 5, max: 800 });


const causeValidation = {
    titleIsLength,
    purposeIsLength,
    placeIsLength,
    dateIsValid,
    urlIsValid,
    descriptionIsLength
}

export default causeValidation;