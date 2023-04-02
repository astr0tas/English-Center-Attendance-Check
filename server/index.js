const express = require('express');
var cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

// const yourRoute = require('<filePath>');

// app.use('<path>', yourRoute);

app.listen(PORT, () =>
{
      console.log(`Server listening at http://localhost:${ PORT }`);
});