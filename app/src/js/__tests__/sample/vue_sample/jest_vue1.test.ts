import { render, fireEvent } from "@testing-library/vue";
import { render as render2 } from "./modified_render_vtl";
import Counter from "./counter.vue";

describe("jest vue sample1", () => {

    test("increments value on click", async () => {
        const component = render(Counter);

        component.getByText("clicked: 0-times");
        expect(component.getByText(/clicked: .+-times/).textContent).toEqual("clicked: 0-times");
        expect(component.getByText(/^computed-\d/).textContent).toEqual("computed-0");

        const button = component.getByText("increment");
        await fireEvent.click(button);
        await fireEvent.click(button);

        component.getByText("clicked: 2-times");
        expect(component.getByText(/clicked: .+-times/).textContent).toEqual("clicked: 2-times");
        expect(component.getByText(/^computed-\d/).textContent).toEqual("computed-2");
    });

    test("increments value on click (For when computation of computed is delayed.)", async () => {
        const component = await render2(Counter);

        component.getByText("clicked: 0-times");
        expect(component.getByText(/clicked: .+-times/).textContent).toEqual("clicked: 0-times");
        expect(component.getByText(/^computed-\d/).textContent).toEqual("computed-0");

        const button = component.getByText("increment");
        await fireEvent.click(button);
        await fireEvent.click(button);
        await component.update();

        component.getByText("clicked: 2-times");
        expect(component.getByText(/clicked: .+-times/).textContent).toEqual("clicked: 2-times");
        expect(component.getByText(/^computed-\d/).textContent).toEqual("computed-2");
    });

});
