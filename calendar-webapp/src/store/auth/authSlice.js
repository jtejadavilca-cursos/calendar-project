import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "checking", // "checking" | "authenticated" | "not-authenticated"
        user: {
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
        },
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
        logout: (state, { payload }) => {
            state.status = "not-authenticated";
            state.user = {};
            state.errorMessage = payload?.errorMessage;
        },
        wrongCredentials: (state, { payload }) => {
            state.status = "not-authenticated";
            state.errorMessage = payload;
            state.user = {};
        },
    },
});
export const { onLogin, logout, onCheckingCrendentials, wrongCredentials } = authSlice.actions;
