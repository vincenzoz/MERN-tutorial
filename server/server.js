const express = require('express');

const app = express();

app.use(express.static("public"));


const port = 2000;
app.listen(port, ()=> {
    console.log(`The server is listening on port ${port}`);
});


