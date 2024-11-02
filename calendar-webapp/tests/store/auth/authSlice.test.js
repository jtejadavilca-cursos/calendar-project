import { authSlice } from "../../../src/store/auth/authSlice";

describe("authSlice", () => {
    test("test initial state", () => {
        const state = authSlice.getInitialState();
        expect(state).toEqual({ status: "checking", user: {}, errorMessage: undefined });
    });

    test("test onCheckingCrendentials", () => {
        let state = authSlice.getInitialState();

        state = authSlice.reducer(state, authSlice.actions.onCheckingCrendentials());
        expect(state.status).toEqual("checking");
        expect(state.user).toEqual({});
        expect(state.errorMessage).toEqual(undefined);
    });

    test("test onLogin", () => {
        let state = authSlice.getInitialState();
        const user = { name: "John Doe", email: "test@gmail.com" };

        state = authSlice.reducer(state, authSlice.actions.onLogin(user));

        expect(state.status).toEqual("authenticated");
        expect(state.user).toEqual(user);
        expect(state.errorMessage).toEqual(undefined);
    });
});
