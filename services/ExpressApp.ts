import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { VendorRoute, AdminRoute, ShoppingRoute } from '../routes';
import path from 'path'


const port = 8000;

export default async (app: Application) => {


    // Middleware
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/images', express.static(path.join(__dirname, "images")));


    // Routes
    app.get('/', (req, res) => {
        res.send("We are up bro 😉😉");
    });
    app.use("/admin", AdminRoute);
    app.use("/vendor", VendorRoute);
    app.use("/food", ShoppingRoute);
    return app;
}
