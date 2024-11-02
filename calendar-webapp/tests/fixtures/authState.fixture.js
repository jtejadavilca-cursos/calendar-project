export const authFixture = {
    initialState: {
        status: "checking", // "checking" | "authenticated" | "not-authenticated"
        user: {},
        errorMessage: undefined,
    },
    onCheckingCrendentials: {
        status: "checking",
        user: {},
        errorMessage: undefined,
    },

    onLogin: {
        status: "authenticated",
        user: { name: "John Doe", email: "test@gmail.com" },
        errorMessage: undefined,
    },

    onLogout: {
        status: "not-authenticated",
        user: {},
        errorMessage: "Unauthorized",
    },

    wrongCredentials: {
        status: "not-authenticated",
        errorMessage: "Credenciales incorrectas",
        user: {},
    },

    setErrorMessageOnregister: {
        errorMessage: "Error al registrar",
    },

    clearError: {
        errorMessage: undefined,
    },
};
