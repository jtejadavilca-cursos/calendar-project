import { calendarSlice } from "../../../src/store/calendar/calendarSlice";
import { calendarFixture } from "../../fixtures/calendarState.fixture";

describe("calendarSlice", () => {
    test("test initial state", () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(calendarFixture.initialState);
    });

    test("test onLoadEvents", () => {
        let state = calendarSlice.getInitialState();

        state = calendarSlice.reducer(state, calendarSlice.actions.onLoadEvents(calendarFixture.mockedEvents));

        expect(state.events).toEqual(calendarFixture.mockedEvents);
        expect(state.isLoadingEvents).toBeFalsy();
    });

    test("test load more events", () => {
        let state = calendarSlice.getInitialState();

        state = calendarSlice.reducer(state, calendarSlice.actions.onLoadEvents(calendarFixture.mockedEvents));
        state = calendarSlice.reducer(state, calendarSlice.actions.onLoadEvents(calendarFixture.mockedNewEvents));

        expect(state.events).toEqual([...calendarFixture.mockedEvents, calendarFixture.mockedNewEvents[1]]);
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events.length).toBe(3);
    });

    test("test onSetActiveEvent", () => {
        let state = calendarSlice.getInitialState();
        const activeEvent = calendarFixture.mockedEvents[0];

        state = calendarSlice.reducer(state, calendarSlice.actions.onSetActiveEvent(activeEvent));

        expect(state.activeEvent).toEqual(activeEvent);
    });

    test("test onAddNewEvent", () => {
        let state = calendarSlice.getInitialState();
        const newEvent = calendarFixture.mockedNewEvents[1];

        state = calendarSlice.reducer(state, calendarSlice.actions.onAddNewEvent(newEvent));

        expect(state.events).toEqual([newEvent]);
        expect(state.activeEvent).toBeNull();
    });

    test("test onUpdateEvent", () => {
        let state = calendarSlice.getInitialState();
        const updatedEvent = { ...calendarFixture.mockedEvents[0], title: "Updated title" };

        state = calendarSlice.reducer(state, calendarSlice.actions.onLoadEvents(calendarFixture.mockedEvents));
        state = calendarSlice.reducer(state, calendarSlice.actions.onUpdateEvent(updatedEvent));

        expect(state.events[0]).toEqual(updatedEvent);
    });

    test("test onDeleteEvent", () => {
        let state = calendarSlice.getInitialState();
        const activeEvent = calendarFixture.mockedEvents[0];
        const eventId = activeEvent.id;

        state = calendarSlice.reducer(state, calendarSlice.actions.onLoadEvents(calendarFixture.mockedEvents));
        state = calendarSlice.reducer(state, calendarSlice.actions.onSetActiveEvent(activeEvent));
        state = calendarSlice.reducer(state, calendarSlice.actions.onDeleteEvent(eventId));

        expect(state.events).toEqual(calendarFixture.mockedEvents.slice(1));
        expect(state.activeEvent).toBeNull();
    });

    test("test onClearCalendar", () => {
        let state = calendarSlice.getInitialState();

        state = calendarSlice.reducer(state, calendarSlice.actions.onLoadEvents(calendarFixture.mockedEvents));
        state = calendarSlice.reducer(state, calendarSlice.actions.onClearCalendar());

        expect(state.events).toEqual([]);
        expect(state.activeEvent).toBeNull();
    });
});
