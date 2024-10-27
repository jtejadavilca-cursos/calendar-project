import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice } from "./";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    /* Para cuando sea necesario desactivar la comprobación de serialización de Redux Toolkit
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    */
});
