import { getRandStr } from "@/lib/rand_str";

describe("getRandStr test", () => {
    const regex = /^(\w|\d)+$/;

    test("getRandStr(8) = /^(\w|\d){8}$/", () => {
        [...Array(10)].map(() => {
            const res = getRandStr(8);
            expect(res).toMatch(/^(\w|\d)+$/);
            expect(res.length).toBe(8);
        });
    });

    test("getRandStr(16) = /^(\w|\d){16}$/", () => {
        [...Array(10)].map(() => {
            const res = getRandStr(16);
            expect(res).toMatch(/^(\w|\d)+$/);
            expect(res.length).toBe(16);
        });
    });

});