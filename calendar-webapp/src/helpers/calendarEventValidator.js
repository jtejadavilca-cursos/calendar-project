import { differenceInSeconds } from "date-fns";

export const validateEvent = (formValues) => {
    const { title, notes, start, end } = formValues;

    const errors = {};

    if (title.trim().length < 2) {
        errors.title = {};
        errors.title.order = 3;
        errors.title.message = "Title is required and must be at least 2 characters long";
    }

    if (notes.trim().length < 5) {
        errors.notes = {};
        errors.notes.order = 4;
        errors.notes.message = "Notes must be at least 5 characters long";
    }

    if (!start) {
        errors.start = {};
        errors.start.order = 1;
        errors.start.message = "Start date is required";
    }

    if (!end) {
        errors.end = {};
        errors.end.order = 2;
        errors.end.message = "End date is required";
    }

    if (start) {
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (difference < 0) {
            errors.start = {};
            errors.start.order = 1;
            errors.start.message = "Start date must be before end date.";
        }
    }
    return formatErrors(errors);
};

const formatErrors = (errors) => {
    const formattedErrors = Object.values(errors)
        .sort((a, b) => a.order - b.order)
        .map((error) => "- " + error.message);
    return formattedErrors;
};
