import causeValidation from "./causeValidation";

export function titleValidator(e, setHasTouched, setErrors, values) {
    setHasTouched((state) => ({
        ...state,
        [e.target.name]: true
    }));

    setErrors((state) => ({
        ...state,
        [e.target.name]: causeValidation.titleIsLength(values[e.target.name])
    }));
};

export function purposeValidator(e, setHasTouched, setErrors, values) {
    setHasTouched((state) => ({
        ...state,
        [e.target.name]: true
    }));

    setErrors((state) => ({
        ...state,
        [e.target.name]: causeValidation.purposeIsLength(values[e.target.name])
    }));
};

export function placeValidator(e, setHasTouched, setErrors, values) {
    setHasTouched((state) => ({
        ...state,
        [e.target.name]: true
    }));

    setErrors((state) => ({
        ...state,
        [e.target.name]: causeValidation.placeIsLength(values[e.target.name])
    }));
};

export function dateValidator(e, setHasTouched, setErrors, values) {
    setHasTouched((state) => ({
        ...state,
        [e.target.name]: true
    }));

    setErrors((state) => ({
        ...state,
        [e.target.name]: causeValidation.dateIsValid(values[e.target.name])
    }));
};

export function urlValidator(e, setHasTouched, setErrors, values) {
    setHasTouched((state) => ({
        ...state,
        [e.target.name]: true
    }));

    setErrors((state) => ({
        ...state,
        [e.target.name]: causeValidation.urlIsValid(values[e.target.name])
    }));
};

export function descriptionValidator(e, setHasTouched, setErrors, values) {
    setHasTouched((state) => ({
        ...state,
        [e.target.name]: true
    }));

    setErrors((state) => ({
        ...state,
        [e.target.name]: causeValidation.descriptionIsLength(values[e.target.name])
    }));
};