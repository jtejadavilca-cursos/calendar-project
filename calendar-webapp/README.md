# Proyecto para registrar eventos en el calendarios (Parte Front hecho con React + Vite)

Este proyecto fue desarrollado en el curso [React: De cero a experto](https://www.udemy.com/course/react-cero-experto) de Fernando Herrera. Contiene bootstrap css (CDN adicionado en el archivo `index.html`) además de otras diferentes librerías.

# Dependencias instaladas:

-   [react-router-dom](https://reactrouter.com/en/main)
-   [react-big-calendar](https://www.npmjs.com/package/react-big-calendar)
-   [date-fns](https://www.npmjs.com/package/date-fns)
-   [react-modal](https://www.npmjs.com/package/react-modal)
-   [react-datepicker](https://www.npmjs.com/package/react-datepicker)

# Material utilizado (Compartido en el [curso Reac: Cero a experto de F.H.](https://www.udemy.com/course/react-cero-experto)):

## [calendar-messages-es.js](https://gist.github.com/Klerith/1658fc368898dd673fc5a9a01ccb12ff#file-calendar-messages-es-js)

```js
export const messages = {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total) => `+ Ver más (${total})`,
};
```

## [login.css](https://gist.github.com/Klerith/74a0c4426599f3bc25b7f4e8d95b6a7f#file-login-css)

```css
.login-container {
    margin-top: 15%;
}
.login-form-1 {
    border-radius: 5px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    padding: 5%;
}
.login-form-1 h3 {
    text-align: center;
    color: #333;
}
.login-form-2 {
    border-radius: 5px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    padding: 5%;
    background: #0062cc;
}
.login-form-2 h3 {
    text-align: center;
    color: #fff;
}
.login-container form {
    padding: 10%;
}
.btnSubmit {
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}
.login-form-1 .btnSubmit {
    color: #fff;
    background-color: #0062cc;
}
.login-form-2 .btnSubmit {
    background-color: #fff;
    color: #0062cc;
}
.login-form-2 .ForgetPwd {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .ForgetPwd {
    color: #0062cc;
    font-weight: 600;
    text-decoration: none;
}
```

### [LoginScreen.js](https://gist.github.com/Klerith/74a0c4426599f3bc25b7f4e8d95b6a7f#file-loginscreen-js)

```js
import React from "react";
import "./login.css";

export const LoginScreen = () => {
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="Correo" />
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" className="form-control" placeholder="Contraseña" />
                        </div>
                        <div className="form-group mb-2">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="Nombre" />
                        </div>
                        <div className="form-group mb-2">
                            <input type="email" className="form-control" placeholder="Correo" />
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" className="form-control" placeholder="Contraseña" />
                        </div>

                        <div className="form-group mb-2">
                            <input type="password" className="form-control" placeholder="Repita la contraseña" />
                        </div>

                        <div className="form-group mb-2">
                            <input type="submit" className="btnSubmit" value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
```

### [modal.css](https://gist.github.com/Klerith/5f490092ce9bd5775cb1d91162be0cea#file-modal-css)

```css
/* Modal */
.ReactModalPortal > div {
    opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
    align-items: center;
    display: flex;
    justify-content: center;
    transition: opacity 0.2s ease-in-out;
    z-index: 999;
}

.modal-fondo {
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
}

.ReactModalPortal .ReactModal__Overlay--after-open {
    opacity: 1;
}

.ReactModalPortal .ReactModal__Overlay--before-close {
    opacity: 0;
}

.modal {
    background: white;
    border-radius: 5px;
    color: rgb(51, 51, 51);
    display: inline;
    max-height: 620px;
    max-width: 500px;
    outline: none;
    padding: 10px;
}
```

### [EventModal.js](https://gist.github.com/Klerith/8c9b2178830045b3f5126422bd0223e1#file-eventmodal-js)

```js
<h1> Nuevo evento </h1>
<hr />
<form className="container">

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <input className="form-control" placeholder="Fecha inicio" />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <input className="form-control" placeholder="Fecha inicio" />
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
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
```
