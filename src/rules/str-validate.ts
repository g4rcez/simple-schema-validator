import { FieldValidations } from "../types";

type Rule<T> = {
    rule: T;
    message: string;
};

type StrValidations = Partial<{
    exactLength: Rule<number>;
    nonNullOrEmpty: Rule<boolean>;
    minLength: Rule<number>;
    maxLength: Rule<number>;
    matches: Rule<RegExp>;
}>;

type Fn = (value: string, rule: any) => boolean;

const validateFrom: { [key in keyof StrValidations]: Fn } = {
    exactLength: (value: string, rule: number): boolean => value.length === rule,
    nonNullOrEmpty: (value: string): boolean => value !== undefined && value !== null && value !== "",
    minLength: (value: string, rule: number): boolean => value.length >= rule,
    maxLength: (value: string, rule: number): boolean => value.length <= rule,
    matches: (value: string, rule: RegExp): boolean => !!value.match(rule)
};

export function strValidate(
    str: string,
    { args = {}, defaultMessage = "Not Correct" }: { args?: StrValidations; defaultMessage?: string }
): FieldValidations {
    const messages = [];
    let isValid = typeof str === "string";
    if (!isValid) {
        messages.push(defaultMessage);
    }
    Object.entries(args)
        .filter(([, value]) => !!value)
        .forEach((el) => {
            const [key, value]: [keyof StrValidations, Rule<any>] = el as any;
            const result = validateFrom[key]!(str, value.rule);
            if (!result) {
                isValid = false;
                messages.push(value.message);
            }
        }, {} as FieldValidations);
    return { isValid, messages };
}
