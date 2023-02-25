import { fireEvent, RenderOptions } from "@testing-library/vue";
import { render } from "@/lib_test/modified_render_vtl";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useItemStore } from "@/state/state";
import flushPromises from "flush-promises";

import { presetMonitor } from "@/state/items/preset";
import { changeToBoxAll } from "@/state/box";

jest.mock("@/state/idb");

import App from "@/index.vue";

describe("page integration test", () => {
    // check preset monitor data!
    const presetAspectW = 16;
    const presetAspectH = 9;
    const updatedAspectW = 21;
    const updatedAspectH = 9;

    const presetAll = changeToBoxAll(presetMonitor);

    const presetAspectText = new RegExp(`^${presetAspectW}:${presetAspectH}`);
    const updatedDataText = {
        aspect: `${updatedAspectW}:${updatedAspectH}`,
        aspectRegex: new RegExp(`^${updatedAspectW}:${updatedAspectH}`),
        aspectW: `${updatedAspectW}`,
        aspectH: `${updatedAspectH}`,
        size: `${presetAll.diagonal + 5}`,
        width: `${presetAll.width + 200}`,
        height: `${presetAll.height + 200}`,
    };

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe("first check", () => {
        test("Render and init", async () => {
            const app = await render(App);
            const boxes = app.queryAllByTestId(/^view-box/);
            expect(boxes.length).toBe(1);
            const menus = app.queryAllByTestId(/^menu-/);
            expect(menus.length).toBe(2);
        });

        test("check presetAspect is same as preset", () => {
            // OK if the ratio is correct.
            // (1920:1080) and (16:9) are same.
            expect(presetAspectH / presetAspectW).toBeCloseTo(presetAll.aspect.h / presetAll.aspect.w);
        });

        test("check updatedAspect is not same as preset", () => {
            expect(updatedAspectW).not.toBeCloseTo(presetAll.aspect.w);
            expect(updatedAspectH).not.toBeCloseTo(presetAll.aspect.h);
        });
    });

    describe("control view area", () => {
        test("Clicking on an item selects the corresponding menu and settings", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            let boxes = app.queryAllByTestId(/^view-box/);
            expect(boxes.length).toBe(1);
    
            await fireEvent.click(boxes[0]);
            await app.update();
    
            // menu check
            const itemKey = iStore.getSelectedItemKey();
            const menu = app.getByTestId(new RegExp(`^menu-item ${itemKey}$`));
            expect(menu.className).toMatch(/selected/);
    
            // settings check
            const selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            const aspectText = (app.getByLabelText(/Aspect/) as HTMLInputElement).value;
            expect(aspectText).toMatch(presetAspectText);
            const sizeText = (app.getByLabelText(/Size/) as HTMLInputElement).value;
            expect(+sizeText).toBeCloseTo(selectedItem.diagonal);
            const widthText = (app.getByLabelText(/Width/) as HTMLInputElement).value;
            expect(+widthText).toBeCloseTo(selectedItem.width);
            const heightText = (app.getByLabelText(/Height/) as HTMLInputElement).value;
            expect(+heightText).toBeCloseTo(selectedItem.height);
        });

        // PointerEvent does not receive MouseEventProps
        test.skip("Move item", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            let boxes = app.queryAllByTestId(/^view-box/);
            expect(boxes.length).toBe(1);
    
            await fireEvent.click(boxes[0]);
            await app.update();

            const selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            await fireEvent.pointerDown(boxes[0], { x: 0, y: 0, clientX: 0, clientY: 0 });
            await app.update();
            await fireEvent.pointerMove(window, { x: 0, y: 0, clientX: 0, clientY: 0 });
            await fireEvent.pointerUp(window);
            await app.update();
            const selectedItem2 = changeToBoxAll(iStore.getSelectedItem()!);

            console.log(selectedItem.top, selectedItem2.top);
            console.log(selectedItem.left, selectedItem2.left);

        });
    });

    describe("control menu", () => {
        test("Click add button of menu", async () => {
            const app = await render(App);
            let boxes = app.queryAllByTestId(/^view-box/);
            expect(boxes.length).toBe(1);
    
            const menuAdd = app.getByTestId("menu-add");
            await fireEvent.click(menuAdd);
            await app.update();
            boxes = app.queryAllByTestId(/^view-box/);
            expect(boxes.length).toBe(2);
            const menus = app.queryAllByTestId(/^menu-/);
            expect(menus.length).toBe(3);
        });

        test("Click item button of menu", async () => {
            const iStore = useItemStore();
            const app = await render(App);
    
            const menus = app.queryAllByTestId(/^menu-item/);
            await fireEvent.click(menus[0]);
            await app.update();
  
            // menu check
            const itemKey = iStore.getSelectedItemKey();
            const menu = app.getByTestId(new RegExp(`^menu-item ${itemKey}$`));
            expect(menu.className).toMatch(/selected/);
    
            // settings check
            const selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            const aspectText = (app.getByLabelText(/Aspect/) as HTMLInputElement).value;
            expect(aspectText).toMatch(presetAspectText);
            const sizeText = (app.getByLabelText(/Size/) as HTMLInputElement).value;
            expect(+sizeText).toBeCloseTo(selectedItem.diagonal);
            const widthText = (app.getByLabelText(/Width/) as HTMLInputElement).value;
            expect(+widthText).toBeCloseTo(selectedItem.width);
            const heightText = (app.getByLabelText(/Height/) as HTMLInputElement).value;
            expect(+heightText).toBeCloseTo(selectedItem.height);
        });
    });

    describe("control settings", () => {
        const selectItem = async (app: any) => {
            const menus = app.queryAllByTestId(/^menu-item/);
            await fireEvent.click(menus[0]);
            await app.update();
        };

        test("Select type", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            await selectItem(app);
            
            const elem = app.getByTestId(/settings-select-type/) as HTMLSelectElement;
            expect(elem.value).toMatch(/Monitor/);

            // await fireEvent.change(elem, { target: { value: "Others" } });
            await fireEvent.update(elem, "Others");
            await app.update();

            expect(elem.value).toMatch(/Others/);
            expect(iStore.getSelectedItem()!.type).toEqual("Others");

            await fireEvent.update(elem, "Monitor");
            await app.update();

            expect(elem.value).toMatch(/Monitor/);
            expect(iStore.getSelectedItem()!.type).toEqual("Monitor");
        });

        test("Write new aspect and size", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            await selectItem(app);

            let selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            const aspectElem = app.getByLabelText(/Aspect/) as HTMLInputElement;
            const sizeElem = app.getByLabelText(/Size/) as HTMLInputElement;
            const widthElem = app.getByLabelText(/Width/) as HTMLInputElement;
            const heightElem = app.getByLabelText(/Height/) as HTMLInputElement;

            // check that they are not written yet.
            expect(aspectElem.value).toMatch(presetAspectText);
            expect(+sizeElem.value).toBeCloseTo(selectedItem.diagonal);

            // write
            await fireEvent.update(aspectElem, updatedDataText.aspect);
            await fireEvent.change(aspectElem);
            await fireEvent.update(sizeElem, updatedDataText.size);
            await fireEvent.change(sizeElem);
            await app.update();

            // check if they were written or not
            expect(aspectElem.value).toMatch(updatedDataText.aspectRegex);
            expect(+sizeElem.value).toBeCloseTo(+updatedDataText.size);
            
            // old selectedItem do not match
            expect(selectedItem.aspect.w).not.toBeCloseTo(+updatedDataText.aspectW);
            expect(selectedItem.aspect.h).not.toBeCloseTo(+updatedDataText.aspectH);
            expect(selectedItem.diagonal).not.toBeCloseTo(+updatedDataText.size);
            expect(selectedItem.width).not.toBeCloseTo(+widthElem.value);
            expect(selectedItem.height).not.toBeCloseTo(+heightElem.value);

            // new selectedItem match
            selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            expect(selectedItem.aspect.w).toBeCloseTo(+updatedDataText.aspectW);
            expect(selectedItem.aspect.h).toBeCloseTo(+updatedDataText.aspectH);
            expect(selectedItem.diagonal).toBeCloseTo(+updatedDataText.size);
            expect(selectedItem.width).toBeCloseTo(+widthElem.value);
            expect(selectedItem.height).toBeCloseTo(+heightElem.value);
        });

        test("Select radio and write new width and height", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            await selectItem(app);

            let selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            const aspectElem = app.getByLabelText(/Aspect/) as HTMLInputElement;
            const sizeElem = app.getByLabelText(/Size/) as HTMLInputElement;
            const widthElem = app.getByLabelText(/Width/) as HTMLInputElement;
            const heightElem = app.getByLabelText(/Height/) as HTMLInputElement;

            // check that they are not written yet.
            expect(+widthElem.value).toBeCloseTo(selectedItem.width);
            expect(+heightElem.value).toBeCloseTo(selectedItem.height);

            // select radio
            const radioElem = app.getByTestId(/settings-radio-b1/) as HTMLInputElement;
            await fireEvent.update(radioElem);
            await app.update();

            // write
            await fireEvent.update(widthElem, updatedDataText.width);
            await fireEvent.change(widthElem);
            await fireEvent.update(heightElem, updatedDataText.height);
            await fireEvent.change(heightElem);
            await app.update();

            // check if they were written or not
            expect(+widthElem.value).toBeCloseTo(+updatedDataText.width);
            expect(+heightElem.value).toBeCloseTo(+updatedDataText.height);
            
            // old selectedItem do not match
            expect(selectedItem.aspect.w).not.toBeCloseTo(+updatedDataText.width);
            expect(selectedItem.aspect.h).not.toBeCloseTo(+updatedDataText.height);
            expect(selectedItem.diagonal).not.toBeCloseTo(+sizeElem.value);
            expect(selectedItem.width).not.toBeCloseTo(+updatedDataText.width);
            expect(selectedItem.height).not.toBeCloseTo(+updatedDataText.height);

            // new selectedItem match
            selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
            expect(selectedItem.aspect.w).toBeCloseTo(+updatedDataText.width);
            expect(selectedItem.aspect.h).toBeCloseTo(+updatedDataText.height);
            expect(selectedItem.diagonal).toBeCloseTo(+sizeElem.value);
            expect(selectedItem.width).toBeCloseTo(+updatedDataText.width);
            expect(selectedItem.height).toBeCloseTo(+updatedDataText.height);
        });

        describe("If not selected proper radio button when we update values...", () => {
            test("Cannot write new aspect and size", async () => {
                const iStore = useItemStore();
                const app = await render(App);
                await selectItem(app);
    
                let selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
                const aspectElem = app.getByLabelText(/Aspect/) as HTMLInputElement;
                const sizeElem = app.getByLabelText(/Size/) as HTMLInputElement;
                const widthElem = app.getByLabelText(/Width/) as HTMLInputElement;
                const heightElem = app.getByLabelText(/Height/) as HTMLInputElement;
    
                // check that they are not written yet.
                expect(aspectElem.value).toMatch(presetAspectText);
                expect(+sizeElem.value).toBeCloseTo(selectedItem.diagonal);

                // select radio
                const radioElem = app.getByTestId(/settings-radio-b1/) as HTMLInputElement;
                await fireEvent.update(radioElem);
                await app.update();
    
                // write
                await fireEvent.update(aspectElem, updatedDataText.aspect);
                await fireEvent.change(aspectElem);
                await fireEvent.update(sizeElem, updatedDataText.size);
                await fireEvent.change(sizeElem);
                await app.update();
    
                // new selectedItem do not match
                selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
                expect(selectedItem.aspect.w).not.toBeCloseTo(+updatedDataText.aspectW);
                expect(selectedItem.aspect.h).not.toBeCloseTo(+updatedDataText.aspectH);
                expect(selectedItem.diagonal).not.toBeCloseTo(+updatedDataText.size);
            });
    
            test("Cannot write new width and height", async () => {
                const iStore = useItemStore();
                const app = await render(App);
                await selectItem(app);
    
                let selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
                const aspectElem = app.getByLabelText(/Aspect/) as HTMLInputElement;
                const sizeElem = app.getByLabelText(/Size/) as HTMLInputElement;
                const widthElem = app.getByLabelText(/Width/) as HTMLInputElement;
                const heightElem = app.getByLabelText(/Height/) as HTMLInputElement;
    
                // check that they are not written yet.
                expect(+widthElem.value).toBeCloseTo(selectedItem.width);
                expect(+heightElem.value).toBeCloseTo(selectedItem.height);
    
                // write
                await fireEvent.update(widthElem, updatedDataText.width);
                await fireEvent.change(widthElem);
                await fireEvent.update(heightElem, updatedDataText.height);
                await fireEvent.change(heightElem);
                await app.update();
    
                // new selectedItem do not match
                selectedItem = changeToBoxAll(iStore.getSelectedItem()!);
                expect(selectedItem.width).not.toBeCloseTo(+updatedDataText.width);
                expect(selectedItem.height).not.toBeCloseTo(+updatedDataText.height);
            });
        });

        test("Move selectedItem's position to center", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            await selectItem(app);

            // (New item is initially placed in the center)
            const selectedItem = iStore.getSelectedItem()!;
            // Force the item to change its position.
            iStore.setItem({...selectedItem, top: selectedItem.top + 100, left: selectedItem.left + 100});

            // check
            const selectedItem2 = iStore.getSelectedItem()!;
            expect(selectedItem2.top).toBeCloseTo(selectedItem.top + 100);
            expect(selectedItem2.left).toBeCloseTo(selectedItem.left + 100);

            // fire
            const elem = app.getByTestId(/settings-to-center/);
            await fireEvent.click(elem);

            // about check (Return to approximate center (initial position))
            // Errors may occur due to unit conversion and rounding.
            const selectedItem3 = iStore.getSelectedItem()!;
            expect(selectedItem3.top / 10).toBeCloseTo(selectedItem.top / 10, 0);
            expect(selectedItem3.left / 10).toBeCloseTo(selectedItem.left / 10, 0);
        });

        test("Delete selectedItem", async () => {
            const iStore = useItemStore();
            const app = await render(App);
            await selectItem(app);

            // check
            expect(iStore.boxes.length).toBe(1);
            let menus = app.queryAllByTestId(/^menu-/);
            expect(menus.length).toBe(2);

            // fire
            const elem = app.getByTestId(/settings-delete/);
            await fireEvent.click(elem);

            // check
            expect(iStore.boxes.length).toBe(0);
            menus = app.queryAllByTestId(/^menu-/);
            expect(menus.length).toBe(1);
        });
    });
});


