import { SchemaValidate, SingleTest, FieldValidations } from "../types";

export const RE_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const emailDomainNameEquals = (
    email: string,
    { domain, message }: { domain: string; message: string }
): SchemaValidate => ({ isValid: email.endsWith(domain), message });

export function isEmail(
    email: string,
    {
        defaultMessage = "Not correct email",
        singleTests = []
    }: Partial<{ defaultMessage?: string; singleTests?: SingleTest<string>[] }> = {}
): FieldValidations {
    const messages: string[] = [];
    let isValid = RE_EMAIL.test(email as string);
    if (!isValid) {
        messages.push(defaultMessage);
    }
    if (singleTests.length > 0) {
        singleTests.forEach((x) => {
            const test = x(email);
            if (!test.isValid) {
                isValid = false;
                messages.push(test.message);
            }
        });
    }
    return { isValid, messages };
}
