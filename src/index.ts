import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/user';
import bodyParser from 'body-parser';
import passport from 'passport';

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRouter);

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