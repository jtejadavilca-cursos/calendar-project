import { act, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { useUiStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState },
        },
    });
};

describe("Test uiStore", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test.each([
        { status: true, expected: true },
        { status: false, expected: false },
    ])("Test default values as $status, expects a value as $expected", ({ status, expected }) => {
        const mockStore = getMockStore({ isDateModalOpen: status });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        const { isDateModalOpen } = result.current;
        expect(isDateModalOpen).toBe(expected);
        expect(result.current).toEqual({
            isDateModalOpen: expected,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        });
    });

    test("Test openDateModal", () => {
        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        const { openDateModal } = result.current;
        act(() => {
            openDateModal();
        });

        const { isDateModalOpen } = mockStore.getState().ui;
        expect(isDateModalOpen).toBe(true);
    });

    test("Test closeDateModal", () => {
        const mockStore = getMockStore({ isDateModalOpen: true });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
        });

        const { closeDateModal } = result.current;
        act(() => {
            closeDateModal();
        });

        const { isDateModalOpen } = mockStore.getState().ui;
        expect(isDateModalOpen).toBe(false);
    });
});
