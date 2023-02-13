// `allMeasures` includes all the measures packaged with this library
import configureMeasurements from "convert-units";
import length from "convert-units/lib/cjs/definitions/length";

import { ItemType } from "../lib/types";


export type LengthUnit = "mm" | "cm" | "in";

export interface BoxBaseData {
    key: string;
    id: number;
    type: ItemType;
    top: number;
    left: number;
    unit: LengthUnit;
};

interface BoxSize1 {
    width: number;
    height: number;  
};

interface BoxSize2 {
    aspect: { w: number; h: number; arePixelNums: boolean; };
    diagonal: number;
};

export type Box1 = BoxBaseData & BoxSize1;
export type Box2 = BoxBaseData & BoxSize2;
export type Box = Box1 | Box2;


export const isBox1 = (src: Box): src is Box1 => {
    const t = src as Box1;
    return (
        typeof t?.width === "number" && typeof t?.height === "number"
    );
};

export const isBox2 = (src: Box): src is Box2 => {
    const t = src as Box2;
    return (
        typeof t?.diagonal === "number"
    );
};

/////////////////////////////////////////////////////////////////////////////////////

export const maxBoxNum = 6;

export const changeToBox1 = (src: Box): Box1 => {
    if (isBox2(src)) {
        // a = aspect.h / aspect.w
        // w = diagonal * cos{ arctan(a) } = diagonal * sqrt( 1 / (1 + a^2) )
        // h = diagonal * sin{ arctan(a) } = diagonal * sqrt( a^2 / (1 + a^2) )
        const a2 = Math.pow(src.aspect.h / src.aspect.w, 2);
        const width = src.diagonal * Math.sqrt(1 / (1 + a2));
        const height = src.diagonal * Math.sqrt(a2 / (1 + a2));

        return { ...(src as BoxBaseData), width, height };
    }

    return src;
};

const convertFunc = configureMeasurements({length});
export const convert = (num: number, from: LengthUnit, to: LengthUnit): number => {
    return convertFunc(num).from(from).to(to);
};

export const getRandStr = (size: number): string => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const chars = alphabets + numbers;

    return new Array<string>(size).fill("").map(_ => chars[Math.floor(Math.random() * chars.length)]).join("");
};
