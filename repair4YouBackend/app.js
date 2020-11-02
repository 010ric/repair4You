"use strict";
const express = require("express");
const app = express();
const port = 4242;
// Import the filesystem module
const fs = require("fs");
const path = require("path");
var bodyParser = require("body-parser");

// ## CORS middleware
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let global_vehicle_counter = 0;

// TODO: Depends on frontend, hwo we construct the request.body
function mandatory_data_provided(request) {
  if (request.body) {
    return true;
  }
  return false;
}

/* route (Post) needs to save JSON (down?) inside local memory (no need for db)  */
app.post("/api/maintenance/new", jsonParser, (req, res) => {
  // Little more time taken, but for now we will redundantly check
  // for mandatory data in the frontend and backend
  // Using Database would help to separate different concerns which now have to be though of
  // e.g. numerating the files or taking care that the local storage does not run out of space
  // Also considered writing all of the data to a single file,
  // but I think file size limit i.e. a size limit would be reached sooner then

  // Mock DATA
  let vehicle = req.body;
  let data = JSON.stringify(vehicle);
  let successfullWrite = true;
  let errorText = "No unexpected behaviour";

  // 1. check if mandatory data is send in request object, catch errors
  /*
  if (!mandatory_data_provided(req)) {
    throw new Error("missing mandatory data"); // Express will catch this on its own.
  }
  */
  fs.writeFile(
    "./vehicles_data/vehicles_data_" +
      global_vehicle_counter.toString() +
      ".json",
    data,
    err => {
      // Checking for errors
      if (err) {
        successfullWrite = false;
        // Check if typeof err.errorMessage
        errorText = err.errorMessage;
        throw err;
      }
      console.log("Done writing"); // Success
    }
  );
  global_vehicle_counter++;
  res.send({ success: successfullWrite, errorMessage: errorText });
});

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/* route (Post) retrieves previously saved information about maintenance based on date */
app.post("/api/maintenance", urlencodedParser, (req, res) => {
  // As the requirement/circumstance is given, that we have no database we have at least two approaches
  // 1. we will fetch all of the documents and filter them in the backend
  // 2. another usefull approach could be to check all available saved documents if they fullfill the filter predicate
  // Here I will take approach 1, because I assume loading all the data to the backend once will be more sufficient enough
  // array of strings
  var vehicles_data = [];
  try {
    let all_data = fs.readdirSync(__dirname + "/vehicles_data");
    all_data.forEach(file => {
      if (path.extname(file) == ".json") {
        // Check for suitable date in json file
        const vehicle = JSON.parse(
          fs.readFileSync(__dirname + "/vehicles_data/" + file, {
            encoding: "utf8",
            flag: "r"
          })
        );
        // retrieves previously saved information about maintenance based on date
        if (
          sameDay(
            new Date(vehicle.maintenanceDate),
            new Date(req.query.maintenanceDate)
          )
        ) {
          // array of JSON objects
          vehicles_data.push(vehicle);
        }
      }
    });
  } catch (error) {
    throw error;
  }
  res.send(vehicles_data);
});
