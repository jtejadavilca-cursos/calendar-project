import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "checking", // "checking" | "authenticated" | "not-authenticated"
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onCheckingCrendentials: (state) => {
            state.status = "checking";
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = "authenticated";
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = "not-authenticated";
            state.user = {};
            state.errorMessage = payload?.errorMessage;
        },
        wrongCredentials: (state, { payload }) => {
            state.status = "not-authenticated";
            state.errorMessage = payload;
            state.user = {};
        },
        setErrorMessage: (state, { payload }) => {
            state.errorMessage = payload;
        },
        clearError: (state) => {
            state.errorMessage = undefined;
        },
    },
});
export const { onLogin, onLogout, onCheckingCrendentials, wrongCredentials, setErrorMessage, clearError } =
    authSlice.actions;
