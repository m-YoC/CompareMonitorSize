import { render, fireEvent } from "@testing-library/vue";
import Counter from "./counter.vue";

describe("jest vue sample1", () => {

    test("increments value on click", async () => {
        const component = render(Counter);

        component.getByText("clicked: 0-times");
        expect(component.getByText(/clicked: .+-times/).textContent).toEqual("clicked: 0-times");

        const button = component.getByText("increment");
        await fireEvent.click(button);
        await fireEvent.click(button);

        component.getByText("clicked: 2-times");
        expect(component.getByText(/clicked: .+-times/).textContent).toEqual("clicked: 2-times");
    });

});
