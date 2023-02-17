import { openDB, deleteDB, DBSchema } from "idb";
import { Box } from "./box";

interface BoxDB extends DBSchema {
    boxes: {
        key: string;
        value: string;
    };
}

// deleteDB("boxDB-idb-store");

const dbPromise = openDB<BoxDB>("boxDB-idb-store", 10, {
    async upgrade(db, oldVersion) {
        console.log(oldVersion);

        if ( oldVersion < 1 ){
            db.createObjectStore("boxes");
        }

        if ( db.version >= 2 ) {
            console.log("clear", db.name);
            deleteDB(db.name);
        }
        
    }
});


export const dbSet = async (value: Box[]) => {
    // (await dbPromise).clear("boxes");
    return (await dbPromise).put("boxes", JSON.stringify(value), "array");
};

export const dbGet = async () => {
    return JSON.parse(await (await dbPromise).get("boxes", "array") ?? "[]") as Box[];
};


