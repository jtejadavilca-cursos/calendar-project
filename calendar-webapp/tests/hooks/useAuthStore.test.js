import { act, renderHook, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice } from "../../src/store";
import { authFixture } from "../fixtures";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";

const getMockStore = (authInitialState, calendarInitialState = {}) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            calendar: calendarSlice.reducer,
        },
        preloadedState: {
            auth: { ...authInitialState },
            calendar: { ...calendarInitialState },
        },
    });
};

//mock calendarApi
// jest.mock("../../src/api", () => {
//     return {
//         calendarApi: {
//             post: jest.fn(() => {
//                 return Promise.resolve({
//                     data: { token: "123456", user: { email: "test@gmail.com", name: "John Doe" } },
//                 });
//             }),
//         },
//     };
// });

describe("Testing useAuthStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // jest.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        // jest.useRealTimers();
    });

    test("Test startLogin", () => {
        const mockStore = getMockStore(authFixture.initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: "checking",
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
    });

    test("Test startLogin", async () => {
        const mockStore = getMockStore(authFixture.initialState);
        require("../../src/api").calendarApi.post = jest.fn(() => {
            return Promise.resolve({
                data: { token: "123456", user: { email: "test@gmail.com", name: "John Doe" } },
            });
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        const { startLogin } = result.current;
        await act(async () => {
            await startLogin({ email: "test@gmail.com", password: "123456" });
        });

        const { auth } = mockStore.getState();

        expect(auth).toEqual(authFixture.onLogin);
        expect(localStorage.getItem("token")).toBe("123456");
    });

    test("Test startLogin with error", async () => {
        const mockStore = getMockStore(authFixture.initialState);

        require("../../src/api").calendarApi.post = jest.fn(() => {
            return Promise.reject({ response: { data: { message: "Credenciales incorrectas" } } });
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        await act(async () => {
            await result.current.startLogin({ email: "test@gmail.com", password: "1234567" });
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual(authFixture.wrongCredentials);
        await waitFor(() => expect(result.current.errorMessage).toBeUndefined());
    });

    test("Test startRegister", async () => {
        const mockStore = getMockStore(authFixture.initialState);

        require("../../src/api").calendarApi.post = jest.fn(() => {
            return Promise.resolve({
                data: { token: "123456", user: { email: "test@gmail.com", name: "John Doe" } },
            });
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        await act(async () => {
            await result.current.startRegister({ fullName: "John Doe", email: "test@gmail.com", password: "123456" });
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual(authFixture.onLogin);
        expect(localStorage.getItem("token")).toBe("123456");
    });

    test("Test startRegister with error", async () => {
        const mockStore = getMockStore(authFixture.initialState);

        require("../../src/api").calendarApi.post = jest.fn(() => {
            return Promise.reject({ response: { data: { message: "Error message" } } });
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        await act(async () => {
            await result.current.startRegister({ fullName: "John Doe", email: "test@gmail.com", password: "123456" });
        });

        const { errorMessage } = result.current;
        expect({ errorMessage }).toEqual(authFixture.setErrorMessageOnregister);
        await waitFor(() => expect(result.current.errorMessage).toBeUndefined());
    });

    test("Test checkAuthToken without value in localStorage", async () => {
        const mockStore = getMockStore(authFixture.initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { auth } = mockStore.getState();

        console.log({ auth });

        expect({
            status: "not-authenticated",
            user: {},
            errorMessage: undefined,
        }).toEqual(auth);
    });

    test("Test checkAuthToken with value in localStorage", async () => {
        const mockStore = getMockStore(authFixture.initialState);

        require("../../src/api").calendarApi.post = jest.fn(() => {
            return Promise.resolve({
                data: { token: "654321", user: { email: "test@gmail.com", name: "John Doe" } },
            });
        });
        localStorage.setItem("token", "123456");

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { auth } = mockStore.getState();

        expect({
            status: "authenticated",
            user: { email: "test@gmail.com", name: "John Doe" },
            errorMessage: undefined,
        }).toEqual(auth);

        expect(localStorage.getItem("token")).toBe("654321");
    });

    test("Test startLogout", async () => {
        const mockStore = getMockStore(authFixture.onLogin, {
            isLoadingEvents: true,
            events: [
                {
                    id: "1",
                    title: "Event 1",
                    start: new Date().toISOString(),
                    end: new Date().toISOString(),
                    user: { name: "John Doe", email: "test@gmail.com" },
                },
            ],
            activeEvent: null,
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        await act(async () => {
            await result.current.startLogout();
        });

        const { auth, calendar } = mockStore.getState();

        expect({
            status: "not-authenticated",
            user: {},
            errorMessage: undefined,
        }).toEqual(auth);

        expect({
            isLoadingEvents: false,
            events: [],
            activeEvent: null,
        }).toEqual(calendar);
    });
});
