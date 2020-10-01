const express = require('express');
const bodyParser = require('body-parser');
const service = require('./services/service');
const port = 3000;
const app = express();

app.use(bodyParser.json());

/* --------------- CANDY --------------- */

// Gets all candies within the application   *** DONE
app.get("/api/candies", (req, res) => {
    return res.json(service.getAllCandies());
});

// Creates a new candy (NO MODEL VALIDATION) and should return 
// the newly created model along with a proper status code
app.post("/api/candies", (req, res) => {
    const { body } = req;
    service.createCandy(body);
    return res.status(201).json(body);
});

// Gets a candy with a certain id    *** DONE
app.get("/api/candies/:id", (req, res) => {
    const { id } = req.params;
    const result = service.getCandyById(id);
    if(result === -1) { return res.status(404).send(); }
    return res.json(result);
});

/* --------------- OFFER --------------- */

// Gets all offers within the application and the output should include the
// nested candies within the offer object as seen in the Model Structure section   *** DONE
app.get("/api/offers", (req, res) => {
    return res.json(service.getAllOffers());
});

/* --------------- PINATA --------------- */

//  Gets all pinatas within the application - should contain all properties excluding surprise   *** DONE
app.get("/api/pinatas", (req, res) => {
    return res.json(service.getAllPinatas());
});

//  Gets a pinata with a certain id - should contain all properties excluding surprise    *** DONE
app.get("/api/pinatas/:id", (req, res) => {
    const { id } = req.params;
    const result = service.getPinataById(id);
    if(result === -1) { return res.status(404).send(); }
    return res.json(result);
});

//  Create a new pinata (NO MODEL VALIDATION) and should return the
// newly created model along with a proper status code. Here the model should also include a
// surprise property which can either be a written text or an URL to a valid image (.jpg, .png, etc.) 
app.post("/api/pinatas", (req, res) => {
    const { body } = req;
    service.createPinata(body);
    return res.status(201).json(body);
});

//  Hits a certain pinata until its hit limit has been reached.
//      • If the hit was a success it should return a status code of 204 (No Content), unless it
//        was the final blow than it should return a status code of 200 (OK) along with the
//        surprise property from the pinata as a string (the surprise will only be returned a single time) 
//      • A side-effect of the final blow should be one of the following:  
//             • If the surprise property value is a written text it should be appended to a file
//               called surprises.txt which should reside in the root folder, where each surprises
//               are separated by a newline
//             • Otherwise if it is an URL to an image it should be downloaded using the request
//               package and piped into a new file using a write stream, where the file should
//               have the name of the pinata (+ the correct extension) and reside in a folder
//               called images/ which should be in the root folder. 
//      • If the hit limit has been reached the endpoint should return a status code 423 (Locked)
app.get("/api/pinatas/:id/hit", (req, res) => {
    const { id } = req.params;
    const result = service.hitPinata(id);
    if(result === -1) { return res.status(404).send(); }
    return res.json(result);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});