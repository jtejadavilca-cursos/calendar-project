import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onLoadEvents: (state, { payload }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach((event) => {
                const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => (event.id === payload.id ? payload : event));
        },
        onDeleteEvent: (state, { payload }) => {
            if (state.activeEvent && state.activeEvent.id) {
                state.events = state.events.filter((event) => event.id !== payload);
                state.activeEvent = null;
            }
        },
    },
});
export const { onLoadEvents, onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetActiveEvent } = calendarSlice.actions;
