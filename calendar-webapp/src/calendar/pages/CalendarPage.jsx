import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import myEventsList from "./events";

import { CalendarEvent, CalendarModal, Nabvar } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

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
        console.log("onDoubleClick", { doubleClick: e });
    };

    const onSelectEvent = (e) => {
        console.log("onSelectEvent", { select: e });
    };

    const onViewChange = (e) => {
        console.log("onViewChange", { view: e });
        localStorage.setItem("lastView", e);
    };

    return (
        <>
            <Nabvar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={myEventsList}
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
            />

            <CalendarModal />
        </>
    );
};
