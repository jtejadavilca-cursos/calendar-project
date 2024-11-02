require("dotenv").config({ path: ".env.test" });
jest.mock("./src/helpers", () => ({
    getEnvVariables: () => {
        return { ...process.env };
    },
}));
