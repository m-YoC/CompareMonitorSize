
import Module from "./sample_module";
jest.mock("./sample_module");
const mockModule = Module as jest.Mocked<typeof Module>;

import {f, g} from "./sample";

describe("jest mock sample2 (object module mock)", () => {

    test("", () => {
        mockModule.f.mockReturnValue("mocked");
        mockModule.g.mockReturnValue("mocked");

        expect(f()).toEqual("mocked");
        expect(g()).toEqual("mocked");
    });
});
