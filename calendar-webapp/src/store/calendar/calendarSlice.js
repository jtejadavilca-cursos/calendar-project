import { createSlice } from "@reduxjs/toolkit";
export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        currentEvent: null,
    },
    reducers: {
        createEvent: (state /* action */) => {
            state.currentEvent = null;
        },
    },
});
export const { createEvent } = calendarSlice.actions;
