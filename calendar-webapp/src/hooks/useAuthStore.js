import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
    clearError,
    onCheckingCrendentials,
    onClearCalendar,
    onLogin,
    onLogout,
    setErrorMessage,
    wrongCredentials,
} from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        try {
            dispatch(onCheckingCrendentials());

            const resp = await calendarApi.post("/auth/login", { email, password });

            const { token, user } = resp.data;

            localStorage.setItem("token", token);

            dispatch(onLogin(user));
        } catch (error) {
            dispatch(wrongCredentials("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }
    };

    const startRegister = async ({ fullName, email, password }) => {
        try {
            dispatch(onCheckingCrendentials());

            const resp = await calendarApi.post("/auth/signup", { fullName, email, password });

            const { token, user } = resp.data;

            localStorage.setItem("token", token);

            dispatch(onLogin(user));
        } catch (error) {
            dispatch(setErrorMessage("Error al registrar"));
            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return dispatch(onLogout());
        }

        try {
            const resp = await calendarApi.post("/auth/renew");

            const { user, token: newToken } = resp.data;

            localStorage.setItem("token", newToken);
            dispatch(onLogin(user));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = async () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch(onClearCalendar());
    };

    return {
        // Properties
        errorMessage,
        status,
        user,

        // Methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    };
};
