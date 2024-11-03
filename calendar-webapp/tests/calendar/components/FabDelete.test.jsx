import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { FabDelete } from "../../../src/calendar";
import { authSlice, calendarSlice } from "../../../src/store";
import { authFixture } from "../../fixtures/authState.fixture";
import { calendarFixture } from "../../fixtures/calendarState.fixture";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useCalendarStore");

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
    //useSelector: jest.fn()
}));

const testStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    preloadedState: {
        auth: authFixture.initialState,
        calendar: calendarFixture.initialState,
    },
});
describe("Test <FabDelete />", () => {
    const mockStartDeletingEvent = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should not show the component at the beggining", () => {
        useCalendarStore.mockReturnValue({
            activeEvent: null,
        });

        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <FabDelete />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryAllByRole("button").length).toBe(0);
    });

    test("Should show the component", () => {
        useCalendarStore.mockReturnValue({
            activeEvent: { id: 1 },
        });

        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <FabDelete />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryAllByRole("button").length).toBe(1);
    });

    test("Should call delete event function", async () => {
        useCalendarStore.mockReturnValue({
            activeEvent: { id: 1 },
            startDeletingEvent: mockStartDeletingEvent,
        });

        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <FabDelete />
                </MemoryRouter>
            </Provider>
        );

        const button = screen.getByLabelText("btn-delete");
        fireEvent.click(button);
        const btnYes = screen.getByText("Sí, eliminar");
        fireEvent.click(btnYes);

        await waitFor(() => {
            expect(mockStartDeletingEvent).toHaveBeenCalledWith(1);
        });
    });

    test("Should not call delete event function", async () => {
        useCalendarStore.mockReturnValue({
            activeEvent: { id: 1 },
            startDeletingEvent: mockStartDeletingEvent,
        });

        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <FabDelete />
                </MemoryRouter>
            </Provider>
        );

        const button = screen.getByLabelText("btn-delete");
        fireEvent.click(button);
        const btnNo = screen.getByText("No");
        fireEvent.click(btnNo);

        await waitFor(() => {
            expect(mockStartDeletingEvent).not.toHaveBeenCalled();
        });
    });
});
