import express, {Request, Response} from 'express';
import { Database } from './db/connection'
import { registerRoutes } from './modules/routes';

const app : express.Application = express();
const port: Number = 3000;
const router = express.Router();

app.use(express.json());

async function startServer() {
    await Database.initialize();

    registerRoutes(router);

    app.use(router);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer().catch((err) => {
    console.error("Error starting the server:", err);
});