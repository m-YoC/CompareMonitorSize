import { round } from "@/lib/math";

describe("round test", () => {
    const num = 314.1592;

    test("round(314.1592, 0) = 314", () => {
        expect(round(num, 0)).toBeCloseTo(314);
    });

    test("round(314.1592, 2) = 300", () => {
        expect(round(num, 2)).toBeCloseTo(300);
    });

    test("round(314.1592, -2) = 314.16", () => {
        expect(round(num, -2)).toBeCloseTo(314.16);
    });
});
