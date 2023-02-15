export const round = (x: number, digit: number): number => {
    const d = Math.pow(10, digit);
    return Math.round(x / d) * d;
};
