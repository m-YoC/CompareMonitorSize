import Module from "./sample_module";

describe("jest mock sample4a (partial module mock1)", () => {

    test("", () => {
        const spy = jest.spyOn(Module, "f").mockReturnValue("mocked");

        expect(Module.f("jest")).toEqual("mocked");
        expect(spy).toBeCalledTimes(1);
        expect(Module.g("jest")).toEqual("jest :g");
    });
});



import * as Sample from "./sample";

describe("jest mock sample4b (partial module mock2)", () => {

    test("", () => {
        const spy = jest.spyOn(Sample, "f").mockReturnValue("mocked");

        expect(Sample.f()).toEqual("mocked");
        expect(spy).toBeCalledTimes(1);
        expect(Sample.g()).toEqual("sample.ts :g");
    });
});