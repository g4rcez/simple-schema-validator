import { isEmail, SchemaValidate } from "../src";

const correctCase = "email.email@gmail.com";

test("Test correct email", () => {
    const validations = isEmail(correctCase, {
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
    expect(validations).toEqual({ isValid: true, messages: [] });
});
