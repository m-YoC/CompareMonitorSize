// `allMeasures` includes all the measures packaged with this library
import configureMeasurements from "convert-units";
import length from "convert-units/lib/cjs/definitions/length";

import { ItemType } from "../lib/types";
import { round } from "../lib/math";

export const eachUnitDigit = {
    in: -1,
    mm: 0,
    cm: -1
};

export type LengthUnit = keyof typeof eachUnitDigit; //"mm" | "cm" | "in";

export type LengthUnits = { b1: LengthUnit, b2: LengthUnit};

export interface BoxBaseData {
    key: string;
    id: number;
    type: ItemType;
    top: number;
    left: number;
    unit: LengthUnits;
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

export type BoxAll = Box1 & Box2 & { base: "Box1" | "Box2" };

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



const convertFunc = configureMeasurements({length});
export const convert = (num: number, from: LengthUnit, to: LengthUnit): number => {
    return round(convertFunc(num).from(from).to(to), eachUnitDigit[to]);
};

export const convertBoxUnit = <T extends Box>(src: T, to: LengthUnits): T => {
    if (isBox1(src)) {
        const from = src.unit.b1;
        const width = convert(src.width, from, to.b1);
        const height = convert(src.height, from, to.b1);
        return { ...src, width, height, unit: to };
    } else {
        const from = src.unit.b2;
        const diagonal = convert(src.diagonal, from, to.b2);
        return {...src, diagonal, unit: to};
    }
};

export const getRandStr = (size: number): string => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const chars = alphabets + numbers;

    return new Array<string>(size).fill("").map(_ => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export const extractBoxBase = (src: Box): BoxBaseData => {
    return {key: src.key, id: src.id, type: src.type, top: src.top, left: src.left, unit: src.unit };
};

export const changeToBox1 = (src: Box): Box1 => {
    if (isBox2(src)) {
        // a = aspect.h / aspect.w
        // w = diagonal * cos{ arctan(a) } = diagonal * sqrt( 1 / (1 + a^2) )
        // h = diagonal * sin{ arctan(a) } = diagonal * sqrt( a^2 / (1 + a^2) )
        const a2 = Math.pow(src.aspect.h / src.aspect.w, 2);
        const width = convert(src.diagonal * Math.sqrt(1 / (1 + a2)), src.unit.b2, src.unit.b1);
        const height = convert(src.diagonal * Math.sqrt(a2 / (1 + a2)), src.unit.b2, src.unit.b1);

        return { ...extractBoxBase(src), width, height };
    }

    return src;
};

export const changeToBox2 = (src: Box): Box2 => {
    if (isBox1(src)) {
        const w = src.width;
        const h = src.height;
        const diagonal = convert(Math.sqrt(w*w + h*h), src.unit.b1, src.unit.b2);

        return { ...extractBoxBase(src), diagonal, aspect: { w, h, arePixelNums: false } };
    }

    return src;
};

export const changeToBoxAll = (src: Box): BoxAll => {
    if(isBox1(src)) {
        return {...changeToBox2(src), ...src, base: "Box1" };
    } else {
        return {...changeToBox1(src), ...src, base: "Box2" };
    }
}

export const changeFromBoxAll = (src: BoxAll): Box => {
    if(src.base === "Box1") return { ...extractBoxBase(src), width: src.width, height: src.height };
    return { ...extractBoxBase(src), diagonal: src.diagonal, aspect: src.aspect };
}

