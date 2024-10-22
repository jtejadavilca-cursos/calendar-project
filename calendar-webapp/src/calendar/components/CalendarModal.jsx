import { useState } from "react";
import Modal from "react-modal";

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

    const onCloseModal = () => {
        console.log("onCloseModal");
        setIsModalOpen(false);
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
            <h1>Hello World!</h1>
            <hr />
            <p>Adipisicing nulla nostrud aliquip magna. Ea dolore irure culpa duis eu.</p>
        </Modal>
    );
};
