const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;


const app = express();



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});