import express from 'express';
import "reflect-metadata";
import dbConnection from './services/Database';
import App from './services/ExpressApp';
const app = express();
const port = 8000;
const ServerStart = async () => {
    try {
        await dbConnection();
        await App(app);

        const server = app.listen(port, () => {
            console.clear();
            console.log(`Server started at http://localhost:${port}`);
        });

        // Gracefully handle unhandled promise rejections
        process.on('unhandledRejection', (err: any) => {
            console.error("Unhandled Rejection! Shutting down...");
            console.error(err.name, err.message);
            server.close(() => process.exit(1));
        });

        // Gracefully handle SIGINT (Ctrl+C)
        process.on('SIGINT', () => {
            console.log("SIGINT received. Gracefully shutting down...");
            server.close(() => {
                console.log("Server closed. Exiting process.");
                process.exit(0);
            });
        });

    } catch (err: any) {
        console.error("Error starting server:", err.message);
        process.exit(1);
    }
};

// Register uncaught exception handler before anything else
process.on('uncaughtException', (err: any) => {
    console.error("Uncaught Exception! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
});

ServerStart();






