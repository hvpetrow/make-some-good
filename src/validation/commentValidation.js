import validator from 'validator';

const contentIsLength = (value) => validator.isLength(value, { min: 2, max: 300 });

const commentValidation = {
    contentIsLength
}

export default commentValidation;