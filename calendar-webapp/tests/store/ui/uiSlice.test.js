import { uiSlice } from "../../../src/store/ui/uiSlice";

describe("uiSlice", () => {
    test("test initial state", () => {
        const state = uiSlice.getInitialState();
        expect(state).toEqual({ isDateModalOpen: false });
    });

    test("must change isDateModalOpen to true/false", () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, uiSlice.actions.onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, uiSlice.actions.onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();
    });
});
