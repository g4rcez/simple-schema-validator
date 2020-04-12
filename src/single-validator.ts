import { FieldValidations } from "./types";

export const reduceValidations = (...fns: FieldValidations[]): FieldValidations => {
    const messages: string[] = [];
    const isValid = fns.every((item) => {
        if (!item.isValid) {
            messages.push(...item.messages);
        }
        return item.isValid;
    });
    return { isValid, messages };
};

export type SingleValidatorArgs<T> = FieldValidations | ((value: T) => FieldValidations);

export const singleValidator = <T>(value: T, ...fns: SingleValidatorArgs<T>[]): FieldValidations => {
    const messages: string[] = [];
    const isValid = fns.every((x) => {
        if (typeof x === "function") {
            const result = x(value);
            messages.push(...result.messages.filter(Boolean));
            return result.isValid;
        }
        messages.push(...x.messages.filter(Boolean));
        return x.isValid;
    });
    return { isValid, messages };
};

export const acceptWithoutTest = (): FieldValidations => ({ isValid: true, messages: [] });
