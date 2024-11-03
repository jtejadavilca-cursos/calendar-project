import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar/pages/CalendarPage", () => ({
    CalendarPage: () => <div>CalendarPage</div>,
}));

describe("Test AuthRouter", () => {
    const mockCheckAuthToken = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should show loading screen and call checkAuthToken", () => {
        useAuthStore.mockReturnValue({
            status: "checking",
            checkAuthToken: mockCheckAuthToken,
        });

        const wrapper = render(<AppRouter />);

        expect(wrapper).toMatchSnapshot();
        expect(mockCheckAuthToken).toHaveBeenCalled();
        expect(screen.getByText("Cargando...")).toBeTruthy();
    });

    test("Should show login screen and not has loading screen", () => {
        useAuthStore.mockReturnValue({
            status: "not-authenticated",
            checkAuthToken: mockCheckAuthToken,
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(mockCheckAuthToken).toHaveBeenCalled();
        expect(screen.queryByText("Cargando...")).toBeFalsy();
        expect(screen.getByText("Ingreso")).toBeTruthy();
        expect(screen.getByText("Registro")).toBeTruthy();
    });

    test("Should show calendar screen and not has loading screen", () => {
        useAuthStore.mockReturnValue({
            status: "authenticated",
            checkAuthToken: mockCheckAuthToken,
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(mockCheckAuthToken).toHaveBeenCalled();
        expect(screen.queryByText("Cargando...")).toBeFalsy();
        expect(screen.queryByText("CalendarPage")).toBeTruthy();
    });
});
