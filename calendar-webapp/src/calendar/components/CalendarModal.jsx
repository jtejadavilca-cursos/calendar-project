import { useEffect, useState } from "react";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";

import { addHours } from "date-fns";
import es from "date-fns/locale/es";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useCalendarStore, useUiStore } from "../../hooks";

import { validateEvent } from "../../helpers";

registerLocale("es", es);

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [modalTitle, setModalTitle] = useState("Nuevo evento");

    const [errors, setErrors] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: "Evento",
        notes: "",
        start: new Date().getTime(),
        end: new Date().getTime(),
    });

    useEffect(() => {
        if (activeEvent) {
            setFormValues({
                ...activeEvent,
                start: new Date(activeEvent.start),
                end: new Date(activeEvent.end),
            });
            setModalTitle(activeEvent.id ? "Editar evento" : "Nuevo evento");
        }
    }, [activeEvent]);

    useEffect(() => {
        if (errors.length > 0) {
            const errorList = errors.reduce((acc, error) => `${acc} <br /> ${error}`, "");
            Swal.fire("Error", "<span class='text-danger'>" + errorList + "</span>", "error");
        }
    }, [errors]);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onDateChange = (date, changing) => {
        setFormValues({
            ...formValues,
            [changing]: date,
        });
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = (e) => {
        e.preventDefault();

        setIsFormSubmitted(true);

        const validationErrors = validateEvent(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(Object.values(validationErrors));
            return;
        }

        startSavingEvent({
            ...formValues,
            end: formValues.end.getTime(),
            start: formValues.start.getTime(),
            user: {
                _id: "123",
                name: "José",
            },
        });
        onCloseModal();
    };

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {modalTitle} </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        placeholderText="Fecha inicio"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        selected={formValues.start}
                        onChange={(date) => onDateChange(date, "start")}
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        className="form-control"
                        placeholderText="Fecha fin"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        selected={formValues.end}
                        onChange={(date) => onDateChange(date, "end")}
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="4"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button type="submit" className="btn btn-outline-primary col-12 mt-5">
                    <i className="far fa-save"></i>
                    <span> Guardar </span>
                </button>
            </form>
        </Modal>
    );
};
