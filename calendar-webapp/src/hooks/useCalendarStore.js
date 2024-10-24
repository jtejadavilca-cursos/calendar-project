import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const selectActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        return calendarEvent._id
            ? dispatch(onUpdateEvent({ ...calendarEvent })) // update event
            : dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })); // add new event
    };

    return {
        /** properties **/
        events,
        activeEvent,

        /** methods **/
        selectActiveEvent,
        startSavingEvent,
    };
};
