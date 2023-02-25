import * as Src from "@/state/box";

describe("Box test", () => {
    const getBox1 = (): Src.Box1 => ({key: "0", id: 0, type: "Monitor", top: 0, left: 0, 
        width: 640, height: 480, unit: {b1: "mm", b2: "in"} });
    const getBox2 = (): Src.Box2 => ({key: "0", id: 0, type: "Monitor", top: 0, left: 0, 
        aspect: { w: 1920, h: 1080, arePixelNums: true }, diagonal: 23, 
        unit: {b1: "mm", b2: "in"} });

    const inch = 0.0393701; // mm
    const mm = 25.4; //inch

    test("isBox1(Box1) === true", () => {
        const b = getBox1();
        expect(Src.isBox1(b)).toBeTruthy();
    });

    test("isBox2(Box1) === false", () => {
        const b = getBox1();
        expect(Src.isBox2(b)).toBeFalsy();
    });

    test("isBox1(Box2) === false", () => {
        const b = getBox2();
        expect(Src.isBox1(b)).toBeFalsy();
    });

    test("isBox2(Box2) === true", () => {
        const b = getBox2();
        expect(Src.isBox2(b)).toBeTruthy();
    });

    test("convertBoxUnit(Box1) mm => inch", () => {
        const b = getBox1();
        const c = Src.convertBoxUnit(b, {b1: "in"});
        expect(c.width).toBeCloseTo(b.width * inch, Src.eachUnitDigit.in);
        expect(c.height).toBeCloseTo(b.height * inch, Src.eachUnitDigit.in);
    });

    test("convertBoxUnit(Box2) inch => mm", () => {
        const b = getBox2();
        const c = Src.convertBoxUnit(b, {b2: "mm"});
        expect(c.diagonal).toBeCloseTo(b.diagonal * mm, Src.eachUnitDigit.mm);
        expect(c.aspect).toEqual(b.aspect);
    });

    test("change Box2 => Box1", () => {
        const b = getBox2();
        expect(Src.isBox2(b)).toBeTruthy();
        expect(Src.isBox1(Src.changeToBox1(b))).toBeTruthy();
    });

    test("change Box1 => Box2", () => {
        const b = getBox1();
        expect(Src.isBox1(b)).toBeTruthy();
        expect(Src.isBox2(Src.changeToBox2(b))).toBeTruthy();
    });

    test("change Box1 => BoxAll", () => {
        const b = getBox1();
        expect(Src.isBox1(b)).toBeTruthy();

        const all = Src.changeToBoxAll(b);
        expect(all.base).toEqual("Box1");
        expect(Src.isBox1(all)).toBeTruthy();
        expect(Src.isBox2(all)).toBeTruthy();
    });

    test("change Box2 => BoxAll", () => {
        const b = getBox2();
        expect(Src.isBox2(b)).toBeTruthy();

        const all = Src.changeToBoxAll(b);
        expect(all.base).toEqual("Box2");
        expect(Src.isBox1(all)).toBeTruthy();
        expect(Src.isBox2(all)).toBeTruthy();
    });

    test("change BoxAll => Box1", () => {
        const all = Src.changeToBoxAll(getBox1());
        expect(Src.isBox1(all)).toBeTruthy();
        expect(Src.isBox2(all)).toBeTruthy();

        const b = Src.changeFromBoxAll(all);
        expect(Src.isBox1(b)).toBeTruthy();
        expect(Src.isBox2(b)).toBeFalsy();
    });

    test("change BoxAll => Box2", () => {
        const all = Src.changeToBoxAll(getBox2());
        expect(Src.isBox1(all)).toBeTruthy();
        expect(Src.isBox2(all)).toBeTruthy();

        const b = Src.changeFromBoxAll(all);
        expect(Src.isBox1(b)).toBeFalsy();
        expect(Src.isBox2(b)).toBeTruthy();
    });
});
