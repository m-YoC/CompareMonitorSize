
export const getRandStr = (size: number): string => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const chars = alphabets + numbers;

    return new Array<string>(size).fill("").map(_ => chars[Math.floor(Math.random() * chars.length)]).join("");
};
