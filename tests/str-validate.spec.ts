import { strValidate } from "../src";

const correctCase = "cinco";

test("Test correct email", () => {
    const validations = strValidate(correctCase, {
        defaultMessage: "Tá errado",
        args: {
            exactLength: {
                message: "Tem que ter cinco de tamanho nos chars",
                rule: 5
            }
        }
    });
    expect(validations).toEqual({ isValid: true, messages: [] });
});
