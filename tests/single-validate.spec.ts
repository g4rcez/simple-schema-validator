import { isEmail, SchemaValidate, reduceValidations } from "../src";

const correctCase = { email: "email.email@gmail.com" };

test("Single validation test", () => {
    const validations = isEmail(correctCase.email, {
        defaultMessage: "Não é email",
        singleTests: [
            (email): SchemaValidate => ({ isValid: email.endsWith("gmail.com"), message: "Tem que ser gmail" }),
            (email): SchemaValidate => {
                const [name] = email.split("@");
                const isValid = name.split(".").length === 2;
                return { isValid, message: "Nome e sobrenome separados por ponto" };
            }
        ]
    });
    expect(reduceValidations(validations)).toEqual({ isValid: true, messages: [] });
});
