import { FnValidate, SchemaValidator, Validations } from "./types";

export const schemaValidator = <T>(object: T, schema: SchemaValidator<Partial<T>>): Validations<T> =>
    Object.entries(schema).reduce((acc, el: any): Validations<T> => {
        const [key, fn]: [keyof T, FnValidate<any, any>] = el;
        const source = fn(object[key], object);
        acc[key] = { isValid: source.isValid, messages: source.messages.filter(Boolean) };
        return acc;
    }, {} as Validations<T>);
