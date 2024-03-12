import { DataSource } from "typeorm";
import ormConfig from "../../ormconfig.json";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import "reflect-metadata";

export const db = new DataSource(ormConfig as PostgresConnectionOptions);

export class Database {
    static async initialize() {
        try {
            await db.initialize();
            console.log("Database connection established successfully.");
        } catch (error) {
            console.error("Error during Data Source initialization:", error);
            throw error;
        }
    }
}
