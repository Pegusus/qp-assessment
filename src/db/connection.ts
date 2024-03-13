import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import "reflect-metadata";

export const db = new DataSource({
    "type": "postgres",
    "host": "host.docker.internal", // Use localhost for local connection and keep same for docker conn
    "port": 5432,
    "username": "postgres",
    "password": "science98",
    "database": "grocerydb",
    "synchronize": true,
    "entities": ["dist/entity/**/*.js"]
  } as PostgresConnectionOptions);

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
