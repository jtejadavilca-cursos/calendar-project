import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";
import { useState } from "react";
import Modal from "react-modal";
// Datepicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateEvent } from "../../helpers/calendarEventValidator";

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
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [errors, setErrors] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "Evento",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
    });

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
        setIsModalOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateEvent(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(Object.values(validationErrors));
            return;
        }

        onCloseModal();
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
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

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

                {errors.length > 0 && (
                    <div className="alert alert-danger mt-2 p-1" role="alert">
                        {errors.map((error, i) => (
                            <span key={i}>
                                {"-"} {error} <br key={"l" + i} />
                            </span>
                        ))}
                    </div>
                )}
            </form>
        </Modal>
    );
};
