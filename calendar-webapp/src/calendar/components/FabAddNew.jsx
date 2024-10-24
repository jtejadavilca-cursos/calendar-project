import React from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { addHours } from "date-fns";

export const FabAddNew = () => {
    const { selectActiveEvent } = useCalendarStore();
    const { openDateModal } = useUiStore();

    const onHandleClickNew = () => {
        selectActiveEvent({
            title: "",
            notes: "",
            start: new Date().getTime(),
            end: addHours(new Date(), 2).getTime(),
        });
        openDateModal();
    };

    return (
        <button className="btn btn-primary fab fab-add" onClick={onHandleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    );
};
