import { calendarApi } from "../../src/api";
//import axios from "axios";

//jest.mock("axios");
//axios.create.mockReturnThis();
beforeEach(() => {
    localStorage.setItem("token", "my-test-token"); // Configura un token de prueba
});

afterEach(() => {
    localStorage.clear(); // Limpia localStorage después de cada test
});
describe("Calendar API", () => {
    test("debe tener la configuración por defecto:", () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    // test("debe de tener el x-token en el header de todas las peticiones ", async () => {
    //     const token = "ABC-123-XYZ";
    //     localStorage.setItem("token", token);
    //     console.log("url", calendarApi.defaults.baseURL);
    //     const res = await calendarApi.post("/api/auth/login", {
    //         email: "email@test.com",
    //         password: "123456",
    //     });

    //     console.log("res", res);

    //     expect(res.config.headers["x-access-token"]).toBe(token);
    // });
    // it("should add the token to the headers if available in localStorage", async () => {
    //     // Configura un mock para una respuesta de axios
    //     axios.create.mockReturnThis();
    //     axios.interceptors.request.use.mockImplementation((callback) => callback);

    //     const testConfig = { headers: {} };
    //     console.log("----calendarApi.interceptors", calendarApi.interceptors);

    //     const interceptedConfig = await calendarApi.interceptors.request.handlers[0].fulfilled(testConfig);

    //     // Valida que el token haya sido añadido
    //     expect(interceptedConfig.headers["x-access-token"]).toBe("my-test-token");
    // });

    // it("should not add token if not in localStorage", async () => {
    //     // Limpia el token de localStorage
    //     localStorage.removeItem("token");

    //     const testConfig = { headers: {} };

    //     const interceptedConfig = await calendarApi.interceptors.request.handlers[0].fulfilled(testConfig);

    //     // Valida que el token no esté en los headers
    //     expect(interceptedConfig.headers["x-access-token"]).toBeUndefined();
    // });
});
