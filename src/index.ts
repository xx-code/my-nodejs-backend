import express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send({
        message: 'REST API',
        status: 400
    })
} );

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server open on http://localhost:${port}`)
} );