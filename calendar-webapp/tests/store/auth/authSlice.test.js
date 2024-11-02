import { authSlice } from "../../../src/store/auth/authSlice";
import { authFixture } from "../../fixtures/authState.fixture";

describe("authSlice", () => {
    test("test initial state", () => {
        const state = authSlice.getInitialState();
        expect(state).toEqual(authFixture.initialState);
    });

    test("test onCheckingCrendentials", () => {
        let state = authSlice.getInitialState();

        state = authSlice.reducer(state, authSlice.actions.onCheckingCrendentials());
        expect(state).toEqual(authFixture.onCheckingCrendentials);
    });

    test("test onLogin", () => {
        let state = authSlice.getInitialState();
        const user = { name: "John Doe", email: "test@gmail.com" };

        state = authSlice.reducer(state, authSlice.actions.onLogin(user));

        expect(state).toEqual(authFixture.onLogin);
    });

    test("test onLogout", () => {
        let state = authSlice.getInitialState();
        const errorMessage = "Unauthorized";

        state = authSlice.reducer(state, authSlice.actions.onLogout({ errorMessage }));

        expect(state).toEqual(authFixture.onLogout);
    });

    test("test wrongCredentials", () => {
        let state = authSlice.getInitialState();
        const errorMessage = "Wrong credentials";

        state = authSlice.reducer(state, authSlice.actions.wrongCredentials(errorMessage));

        expect(state).toEqual(authFixture.wrongCredentials);
    });

    test("test setErrorMessage", () => {
        let state = authSlice.getInitialState();
        const errorMessage = "Error message";

        state = authSlice.reducer(state, authSlice.actions.setErrorMessage(errorMessage));
        console.log("state--->>", state);

        expect(state.errorMessage).toEqual(authFixture.setErrorMessage.errorMessage);
    });

    test("test clearError", () => {
        let state = authSlice.getInitialState();

        state = authSlice.reducer(state, authSlice.actions.setErrorMessage("Error message"));
        state = authSlice.reducer(state, authSlice.actions.clearError());

        expect(state.errorMessage).toEqual(authFixture.clearError.errorMessage);
    });
});
