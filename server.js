// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const port = 8000;


/* Middleware*/
const cors = require("cors");
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

app.get('/data', (req, res, next) => {
   return res.status(200).json(projectData);
});

app.post('/data', async (req, res, next) => {
    const userData = req.body;

    projectData.userData = userData;

    return res.status(200).json(projectData);
});

// Setup Server
app.listen(port, () => console.log(`Listening on port:${port}`));

