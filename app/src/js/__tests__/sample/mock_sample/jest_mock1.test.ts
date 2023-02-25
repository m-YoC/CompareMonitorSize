describe("jest mock sample1 (function mock)", () => {
    const f = (callback: (arg: string) => string): string => {
        return callback("sample");
    };

    test("set mock to callback function (1)", () => {
        const mock = jest.fn(s => "jest");

        const res = f(mock);
        expect(res).toEqual("jest");

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test("set mock to callback function (2)", () => {
        const mock = jest.fn().mockImplementation(s => "jest");

        const res = f(mock);
        expect(res).toEqual("jest");

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test("set mock to callback function (3)", () => {
        const mock = jest.fn().mockReturnValue("jest");

        const res = f(mock);
        expect(res).toEqual("jest");

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test("get used arguments and its return value of mock function", () => {
        const mock = jest.fn(s => "jest");

        const res = f(mock);
        expect(res).toEqual("jest");

        // mock.mock.calls[n-th called][m-th arg]
        expect(mock.mock.calls).toEqual([[ "sample" ]]);
        // mock.mock.results[n-th called].value
        // type: ( return | throw | incomplete )
        expect(mock.mock.results).toEqual([{ type: "return", value: "jest" }]);
    });

    test.todo("instances");
    test.todo("contexts");

});

describe("jest 'async' mock sample", () => {
    const f = async (callback: (arg: string) => Promise<string>) => {
        return await callback("sample");
    };

    test("set mock to callback function (1)", async /* <== Don't forget! */ () => {
        const mock = jest.fn(async s => "jest");

        const res = await f(mock);
        expect(res).toEqual("jest");

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test("set mock to callback function (2)", async /* <== Don't forget! */  () => {
        const mock = jest.fn().mockImplementation(async s => "jest");

        const res = await f(mock);
        expect(res).toEqual("jest");

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test("set mock to callback function (3)", async /* <== Don't forget! */  () => {
        const mock = jest.fn().mockResolvedValue("jest");

        const res = await f(mock);
        expect(res).toEqual("jest");

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    });
});
