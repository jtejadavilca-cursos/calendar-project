import React from "react";
import { useAuthStore } from "../../hooks";

export const Nabvar = () => {
    const { user, startLogout } = useAuthStore();
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt" />
                &nbsp;&nbsp;{user.fullName}
            </span>
            <button className="btn btn-outline-danger" onClick={startLogout}>
                <i className="fas fa-sign-out-alt" />
                <span> Salir</span>
            </button>
        </div>
    );
};
