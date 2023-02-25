import { nextTick } from "vue";
import { render as baseRender, RenderOptions, RenderResult } from "@testing-library/vue";

export async function render(component: any, options?: RenderOptions | undefined) {
    const app = baseRender(component, options) as RenderResult & { update: (props?: object) => Promise<void> };

    const update = async (props?: object) => {
        await nextTick();
        await app.rerender(props ?? {});
    };
    app.update = update;
    await app.update();
    return app;
};
