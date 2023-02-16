
export const getRect = (id: string) => document.getElementById(id)?.getBoundingClientRect() ?? {top: 0, left: 0, width: 0, height: 0};

export const getScreenRect = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return { top: 0, left: 0, width: w, height: h };
};
