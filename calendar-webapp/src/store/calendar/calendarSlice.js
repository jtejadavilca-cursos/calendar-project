import { createSlice } from "@reduxjs/toolkit";
import events from "../../calendar/pages/events";

const tempEvents = events;

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: tempEvents,
        activeEvent: null,
    },
    reducers: {
        createEvent: (state /* action */) => {
            state.activeEvent = null;
        },
    },
});
export const { createEvent } = calendarSlice.actions;
