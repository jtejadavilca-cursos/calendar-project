import { useDispatch, useSelector } from "react-redux";
import { onLoadEvents, onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetActiveEvent } from "../store";
import { calendarApi } from "../api";

import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const selectActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startDeletingEvent = async (eventId) => {
        try {
            await calendarApi.delete(`/calendar/events/${eventId}`);
            dispatch(onDeleteEvent(eventId));
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Ocurrió un error al eliminar el evento", "error");
        }
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                const { user, ...updatedEvent } = calendarEvent;
                await calendarApi.patch(`/calendar/events/${calendarEvent.id}`, updatedEvent);
                dispatch(onUpdateEvent({ ...calendarEvent })); // update event
            } else {
                const { id } = (await calendarApi.post("/calendar/events", calendarEvent)).data;
                dispatch(onAddNewEvent({ ...calendarEvent, id, user })); // add new event
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Ocurrió un error al guardar el evento", "error");
        }
    };

    const startLoadingEvents = async () => {
        const { data } = await calendarApi.get("/calendar/events");

        dispatch(onLoadEvents(data));
    };

    return {
        /** properties **/
        events,
        activeEvent,

        /** methods **/
        selectActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    };
};
