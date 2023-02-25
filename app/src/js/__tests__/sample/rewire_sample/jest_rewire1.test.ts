import rewire from "rewire";

const sampleRewired = rewire("./sample.ts");

describe("jest rewire sample", () => {
    test("access local function", () => {
        const localfunc = sampleRewired.__get__("localFunction" /* local resource name */);
        expect(localfunc("jest")).toEqual("jest :local");

        const publicfunc = sampleRewired.__get__("publicFunction");
        expect(publicfunc("jest")).toEqual("jest :public");
    });
});
