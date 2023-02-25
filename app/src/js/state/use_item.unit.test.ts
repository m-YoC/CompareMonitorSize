import * as Src from "@/state/use_item";
jest.mock("@/lib/rect");

const golden = Src.goldenItems;

test("maxBoxNum is number", () => {
    expect(Src.maxBoxNum()).toEqual(expect.any(Number));
});

test.each(golden)("getB1mm (has property width and height, does not have diagonal; and unit.b1 is 'mm')", (g) => {
    const b1mm = Src.getB1mm(g);
    expect(b1mm.unit.b1).toEqual("mm");
    expect(b1mm).toHaveProperty("width");
    expect(b1mm).toHaveProperty("height");
    expect(b1mm).not.toHaveProperty("diagonal");
});

test("getMaxWidthOfBoxes (return num > 0)", () => {
    const maxWidth = Src.getMaxWidthOfBoxes(golden);
    expect(maxWidth).toBeGreaterThan(0);
});

test("getMaxWidthOfBoxes (if arg is [], then return undefined)", () => {
    const maxWidth = Src.getMaxWidthOfBoxes([]);
    expect(maxWidth).toBeUndefined();
});

test.each(golden)("getCenterPosition (return {top: number, left: number})", (g) => {
    const center = Src.getCenterPosition(g, 1);
    expect(center).toEqual({top: expect.any(Number), left: expect.any(Number)});
});

test("calcNewScale (return num > 0)", () => {
    const scale = Src.calcNewScale(200);
    expect(scale).toBeGreaterThan(0);
});

test("calcNewScale (if arg <= 0 then return 1)", () => {
    const scale = Src.calcNewScale(-10);
    expect(scale).toBe(1);
});
