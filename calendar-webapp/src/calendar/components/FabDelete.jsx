import React from "react";
import { useCalendarStore } from "../../hooks";
import Swal from "sweetalert2";

export const FabDelete = () => {
    const { activeEvent, startDeletingEvent } = useCalendarStore();
    const onHandleClickDelete = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este evento",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                startDeletingEvent(activeEvent._id);
                Swal.fire("Eliminado", "El evento ha sido eliminado", "success");
            }
        });
    };

    return (
        activeEvent &&
        activeEvent._id && (
            <button className="btn btn-danger fab fab-delete" onClick={onHandleClickDelete}>
                <i className="fas fa-trash"></i>
            </button>
        )
    );
};
