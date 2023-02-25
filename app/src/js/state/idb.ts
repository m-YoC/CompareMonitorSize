import { openDB, deleteDB, DBSchema, type IDBPDatabase } from "idb";
import { Box } from "./box";

interface BoxDB extends DBSchema {
    boxes: {
        key: string;
        value: string;
    };
}

// deleteDB("boxDB-idb-store");

const dbname = "boxDB-idb-store";

const getDBPromise = () => {
    return openDB<BoxDB>(dbname, 1, {
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
};

// Singleton Pattern
let dbPromiseBuffer: IDBPDatabase<BoxDB> | undefined = undefined;
const dbPromise = async () => {
    if(!dbPromiseBuffer) dbPromiseBuffer = await getDBPromise();
    return dbPromiseBuffer as IDBPDatabase<BoxDB>;
}

export const removeDB = () => {
    console.log("clear", dbname);
    deleteDB(dbname);
    // move page
};


export const dbSet = async (value: Box[]) => {
    // (await dbPromise).clear("boxes");
    return (await dbPromise()).put("boxes", JSON.stringify(value), "array");
};

export const dbGet = async () => {
    return JSON.parse(await (await dbPromise()).get("boxes", "array") ?? "[]") as Box[];
};


