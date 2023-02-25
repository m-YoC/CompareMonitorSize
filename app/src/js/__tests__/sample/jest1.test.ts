
describe("jest sample1 (exist)", () => {
    const x = "jest";
    const y = undefined;

    test("x is defined (1)", () => {
        expect(x).toBeDefined();
    });

    test("x is defined (2)", () => {
        // anything excepted null and undefined
        expect(x).toEqual(expect.anything());
    });

    test("y is undefined", () => {
        expect(y).toBeUndefined();
    });

    test("y is not null", () => {
        expect(y).not.toBeNull();
    });

    test("falsy", () => {
        // false, undefined, null, NaN, "", 0, -0, 0n
        expect(false).toBeFalsy();
    });

    test("truthy", () => {
        // not Falsy
        expect(true).toBeTruthy();
    });
});

describe("jest sample2 (Numbers)", () => {
    test("1 + 1 = 2", () => {
        expect(1 + 1).toEqual(2);
    });

    test("1 + 1 ≠ 3", () => {
        expect(1 + 1).not.toEqual(3);
    });

    test("1 + 1 is number", () => {
        // usable into toEqual or toBeCalledWith
        expect(1 + 1).toEqual(expect.any(Number));
    });

    test("0.1 + 0.2 = 0.3 (Really: 0.30000000000000004) (1)", () => {
        expect(0.1 + 0.2).toBeCloseTo(0.3);
    });

    test("0.1 + 0.2 = 0.3 (Really: 0.30000000000000004) (2)", () => {
        expect(0.1 + 0.2).toEqual(expect.closeTo(0.3));
    });

    test("1 / 0 = Infinity", () => {
        expect(1 / 0).toEqual(Infinity);
    });

    test("1 < 2", () => {
        expect(1).toBeLessThan(2);
    });
});

describe("jest sample3 (Strings)", () => {
    test("'jest' is 'jest'", () => {
        expect("jest").toEqual("jest");
    });

    test("'jest sample tests' contains 'jest'", () => {
        expect("jest sample tests").toContain("jest");
    });

    test("'jest sample tests' matchs /je.t/", () => {
        expect("jest sample tests").toMatch(/je.t/);
    });

    test("'jest' matchs 'jest', 'test', or 'spec'", () => {
        expect("jest").toMatch(/^(jest|test|spec)$/);
    });

    test("['jest', 'sample x', 'tests'] is [match /je.t/, contain 'sample', any String]", () => {
        // Use when you want to unambiguously evaluate an Array or Object element.
        expect(["jest", "sample x", "tests"]).toEqual(
            [expect.stringMatching(/je.t/), expect.stringContaining("sample"), expect.any(String)]
        );
    });
});

describe("jest sample4 (Array)", () => {
    test("[1, 2, 3] = [1, 2, 3]", () => {
        expect([1, 2, 3]).toEqual([1, 2, 3]);
    });

    test("[1, 2, 3] (toBe should be used as little as possible in Array type)", () => {
        // toBe should be used as little as possible in Array type
        expect([1, 2, 3]).not.toBe([1, 2, 3]);
    });

    test("[1, 2, 3] contains 2", () => {
        expect([1, 2, 3]).toContain(2);
    });

    test("[1, [1, 2], 3] (toContain should be used as little as possible in Array type)", () => {
        // toContain should be used as little as possible in Array type
        expect([1, [1, 2], 3]).not.toContain([1, 2]);
    });

    test("[1, 2, 3] contains 2", () => {
        // deep check
        expect([1, 2, 3]).toContainEqual(2);
    });

    test("[1, [1, 2], 3] contains [1, 2]", () => {
        // deep check
        expect([1, [1, 2], 3]).toContainEqual([1, 2]);
    });

    test("[1, [1, 2], 3] contains [1, 2]", () => {
        // deep check
        expect([1, [1, 2], 3]).toContainEqual([1, 2]);
    });

    test("[1, [1, 2], 3, 4] contains [1, 2] and 4", () => {
        // deep check
        expect([1, [1, 2], 3, 4]).toEqual(expect.arrayContaining([[1, 2], 4]));
    });
});

describe("jest sample5 (Object)", () => {
    test("{k1: 1, k2: 2, k3: 3} = {k1: 1, k2: 2, k3: 3}", () => {
        expect({k1: 1, k2: 2, k3: 3}).toEqual({k1: 1, k2: 2, k3: 3});
    });

    test("{k1: 1, k2: 2, k3: 3} (toBe should be used as little as possible in Object type)", () => {
        // toBe should be used as little as possible in Object type
        expect({k1: 1, k2: 2, k3: 3}).not.toBe({k1: 1, k2: 2, k3: 3});
    });

    test("{k1: 1, k2: 2, k3: 3} can be treated as {k2: 2} (1)", () => {
        expect({k1: 1, k2: 2, k3: 3}).toMatchObject({k2: 2});
    });

    test("{k1: 1, k2: {k2a: 'a', k2b: 'b'}, k3: 3} can be treated as {k2: {k2a: 'a', k2b: 'b'}} (1)", () => {
        // deep check
        expect({k1: 1, k2: {k2a: "a", k2b: "b"}, k3: 3}).toMatchObject({k2: {k2a: "a", k2b: "b"}});
    });

    test("{k1: 1, k2: {k2a: 'a', k2b: 'b'}, k3: 3} can be treated as {k2: Object} (1)", () => {
        // deep check
        expect({k1: 1, k2: {k2a: "a", k2b: "b"}, k3: 3}).toMatchObject({k2: expect.any(Object)});
    });

    test("{k1: 1, k2: 2, k3: 3} has property k2", () => {
        expect({k1: 1, k2: 2, k3: 3}).toHaveProperty("k2");
    });

    test("{k1: 1, k2: 2, k3: 3} has property k2 (and value is 2)", () => {
        expect({k1: 1, k2: 2, k3: 3}).toHaveProperty("k2", 2);
    });

    test("{k1: 1, k2: 2, k3: 3} has property k2 (and value is number)", () => {
        expect({k1: 1, k2: 2, k3: 3}).toHaveProperty("k2", expect.any(Number));
    });

    test("{k1: 1, k2: 2, k3: 3} can be treated as {k2: 2} (2)", () => {
        expect({k1: 1, k2: 2, k3: 3}).toEqual(expect.objectContaining({k2: 2}));
    });

    test("{k1: 1, k2: {k2a: 'a', k2b: 'b'}, k3: 3} can be treated as {k2: {k2a: 'a', k2b: 'b'}} (2)", () => {
        // deep check
        expect({k1: 1, k2: {k2a: "a", k2b: "b"}, k3: 3}).toEqual(expect.objectContaining({k2: {k2a: "a", k2b: "b"}}));
    });

    test("{k1: 1, k2: {k2a: 'a', k2b: 'b'}, k3: 3} can be treated as {k2: Object} (2)", () => {
        // deep check
        expect({k1: 1, k2: {k2a: "a", k2b: "b"}, k3: 3}).toEqual(expect.objectContaining({k2: expect.any(Object)}));
    });
});

describe("jest sample6 (Throw)", () => {
    const f = () => { throw new Error("test error") };

    test("catch that function throws error", () => {
        expect(f).toThrow();
    });

    test("catch that function throws error containing message 'test'", () => {
        expect(f).toThrow("test");
        expect(f).not.toThrow("jest");
    });
});

