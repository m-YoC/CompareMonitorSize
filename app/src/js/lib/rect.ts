
export const getRect = (id: string) => document.getElementById(id)?.getBoundingClientRect() ?? {top: 0, left: 0, width: 0, height: 0};
