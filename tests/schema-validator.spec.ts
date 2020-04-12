import schemaValidator, { isEmail, reduceValidations, strValidate } from "../src";

const object = {
    name: "octocat",
    email: "octo@cat.io"
};

const correctCase = Object.keys(object).reduce((acc, el) => ({ ...acc, [el]: { isValid: true, messages: [] } }), {});

test("Test schema validator", () => {
    const validator = schemaValidator(object, {
        email: (email) =>
            reduceValidations(
                isEmail(email),
                strValidate(email, {
                    args: {
                        matches: {
                            message: "Não termina com oi",
                            rule: /io$/
                        }
                    }
                })
            ),
        name: () => ({ isValid: true, messages: [] })
    });
    expect(validator).toEqual(correctCase);
});
