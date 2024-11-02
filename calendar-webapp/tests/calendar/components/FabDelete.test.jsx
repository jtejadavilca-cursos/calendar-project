import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { FabDelete } from "../../../src/calendar";
import { authSlice, calendarSlice } from "../../../src/store";
import { authFixture } from "../../fixtures/authState.fixture";
import { calendarFixture } from "../../fixtures/calendarState.fixture";

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
    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Should not the component at the beggining", () => {
        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <FabDelete />
                </MemoryRouter>
            </Provider>
        );
        screen.debug();
        expect(true).toBe(true);
    });
});
