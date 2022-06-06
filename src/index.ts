import express = require('express');
import dotenv = require('dotenv');
import mongoose = require('mongoose');

const app = express();
dotenv.config();

const DB_KEY = process.env.MONGODB_KEY != null ? process.env.MONGODB_KEY : '';

mongoose
    .connect(DB_KEY)
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log('mongodb connected');
    })
    .catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send({
        message: 'REST API',
        status: 400
    })
} );

app.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server open on http://localhost:${process.env.PORT}`)
} );