import React from "react";

export const Nabvar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt" />
                &nbsp;&nbsp;José
            </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt" />
                <span> Salir</span>
            </button>
        </div>
    );
};
