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
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            console.log("onAddNewEvent", payload);
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            console.log("onUpdateEvent", payload);
            state.events = state.events.map((event) => (event._id === payload._id ? payload : event));
        },
    },
});
export const { onAddNewEvent, onUpdateEvent, onSetActiveEvent } = calendarSlice.actions;
