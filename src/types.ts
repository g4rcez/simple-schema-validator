export type SchemaValidate = { isValid: boolean; message: string };

export type FnValidate<Schema, Value> = (value: Value, object: Schema) => FieldValidations;

export type SchemaValidator<T> = { [key in keyof T]: FnValidate<T, T[key]> };

export type Validations<T> = { [key in keyof T]: { isValid: boolean; messages: string[] } };

export type FieldValidations = { isValid: boolean; messages: string[] };

export type SingleTest<T> = (value: T) => SchemaValidate;
