import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import "reflect-metadata";

export const db = new DataSource({
    "type": "postgres",
    "host": "host.docker.internal", // - Use for docker image build and run
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "synchronize": true,
    "entities": ["src/entity/**/*.ts"] // ["dist/entity/**/*.js"] - Use for docker image build and run
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
