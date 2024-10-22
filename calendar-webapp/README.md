# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Dependencias instaladas:

-   [react-router-dom](https://reactrouter.com/en/main)
-   [react-big-calendar](https://www.npmjs.com/package/react-big-calendar)
-   [date-fns](https://www.npmjs.com/package/date-fns)
-   [react-modal](https://www.npmjs.com/package/react-modal)

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
