import { renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";

describe("Test uiStore", () => {
    /*test("should return an object with properties and methods", () => {
        const { result } = renderHook(() => useUiStore());
        const { isLoading, setIsLoading, isModalOpen, setIsModalOpen } = result.current;

        expect(isLoading).toBe(false);
        expect(isModalOpen).toBe(false);
        expect(typeof setIsLoading).toBe("function");
        expect(typeof setIsModalOpen).toBe("function");
    });*/

    test("Test default values", () => {
        const { result } = renderHook(() => useUiStore());
    });
});
