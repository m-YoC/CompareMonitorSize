import { openDB, DBSchema } from "idb";
import { Box } from "./box";

interface BoxDB extends DBSchema {
    boxes: {
        key: string;
        value: string;
    };
}


const dbPromise = openDB<BoxDB>("boxDB-idb-store", 1, {
    upgrade(db) {
        db.createObjectStore("boxes", {
            keyPath: "key",
            autoIncrement: true
        });
    }
});


export const dbSet = async (value: Box[]) => {
    return (await dbPromise).put("boxes", JSON.stringify(value), "array");
};

export const dbGet = async () => {
    return JSON.parse(await (await dbPromise).get("boxes", "array") ?? "[]") as Box[];
};


