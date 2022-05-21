import express = require('express');
import dotenv = require('dotenv');

const app = express();
dotenv.config();

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