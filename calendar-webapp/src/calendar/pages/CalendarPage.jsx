import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { addHours } from "date-fns";

import { CalendarEvent, CalendarModal, Nabvar } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { FabAddNew, FabDelete } from "../";

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    const { openDateModal } = useUiStore();
    const { events, selectActiveEvent } = useCalendarStore();
    const [formattedEvents, setFormattedEvents] = useState([]);

    useEffect(() => {
        setFormattedEvents(
            events.map((e) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
            }))
        );
    }, [events]);

    const eventStyleGetter = (event, start, end, isSelected) => {
        var backgroundColor = "#347CF7";
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: "3px",
            opacity: 0.8,
            color: "white",
            border: "0px",
            display: "block",
        };
        return {
            style: style,
        };
    };

    const onDoubleClick = (e) => {
        openDateModal();
    };

    const onSelectEvent = (e) => {
        selectActiveEvent({
            ...e,
            start: e.start.getTime(),
            end: e.end.getTime(),
        });
    };

    const onViewChange = (e) => {
        localStorage.setItem("lastView", e);
        setLastView(e);
    };
    const onSelectSlot = (e) => {
        const start = lastView == "month" ? addHours(e.start, 9).getTime() : e.start.getTime();
        const end = lastView == "month" ? addHours(e.start, 10).getTime() : e.end.getTime();

        selectActiveEvent({
            title: "",
            notes: "",
            start,
            end,
        });
        openDateModal();
    };

    return (
        <>
            <Nabvar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={formattedEvents}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc( 100vh - 80px )" }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClick}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable
            />

            <CalendarModal />
            <FabDelete />
            <FabAddNew />
        </>
    );
};
