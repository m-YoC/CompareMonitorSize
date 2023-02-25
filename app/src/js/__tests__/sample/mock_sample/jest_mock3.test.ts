
import {f, g} from "./sample";
jest.mock("./sample");
const mockFuncF = f as jest.MockedFunction<typeof f>;
const mockFuncG = g as jest.MockedFunction<typeof g>;

describe("jest mock sample3 (function module mock)", () => {

    test("", () => {
        mockFuncF.mockReturnValue("mocked");
        mockFuncG.mockReturnValue("mocked");

        expect(f()).toEqual("mocked");
        expect(f).toHaveBeenCalledTimes(1);
        expect(g()).toEqual("mocked");
        expect(g).toHaveBeenCalledTimes(1);
    });
});