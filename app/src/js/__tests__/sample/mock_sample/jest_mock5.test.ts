import {f, g} from "./sample";
jest.mock("./sample", () => {
    const origin = jest.requireActual("./sample");

    return {
        // __esModule: true,
        ...origin,
        // default: xxx,
        f: jest.fn(() => "mocked"),
    };
});



describe("jest mock sample5 (partial module mock3)", () => {

    test("", () => {
        expect(f()).toEqual("mocked");
        expect(f).toBeCalledTimes(1);
        expect(g()).toEqual("sample.ts :g");
    });
});