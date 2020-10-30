"use strict";
const express = require("express");
const app = express();
const port = 4242;
// Import the filesystem module
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.post("/api/maintenance/new", (req, res) => {
  // Little more time taken, but for now we will redundantly check
  // for mandatory data in the frontend and backend
  // Using Database would help to separate different concerns which now have to be though of
  // e.g. numerating the files or taking care that the local storage does not run out of space
  // Also considered writing all of the data to a single file,
  // but I think file size limit i.e. a size limit would be reached sooner then

  // Mock DATA
  let student = {
    name: "Mike",
    age: 23,
    gender: "Male",
    maintenanceDate: new Date(),
    department: "English",
    car: "Honda"
  };

  let data = JSON.stringify(student);

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
      if (err) throw err;

      console.log("Done writing"); // Success
    }
  );
  global_vehicle_counter++;
  res.send("Successfully safed the vehicle data");
});

/* route (Post) retrieves previously saved information about maintenance based on date */
app.post("/api/maintenance", (req, res) => {
  // As the requirement/circumstance is given, that we have no database we have at least two approaches
  // 1. we will fetch all of the documents and filter them in the backend
  // 2. another usefull approach could be to check all available saved documents if they fullfill the filter predicate
  // Here I will take approach 1, because I assume loading all the data to the backend once will be more sufficient enough
  var vehicles_data = {};
  try {
    vehicles_data = fs.readdirSync(__dirname + "/vehicles_data");
    vehicles_data.forEach(file => {
      if (path.extname(file) == ".json") {
        // Check for suitable date in json file
        const vehicle = JSON.parse(
          fs.readFileSync(__dirname + "/vehicles_data/" + file, {
            encoding: "utf8",
            flag: "r"
          })
        );
        if (vehicle.maintenanceDate == req.body.maintenanceDate) {
          console.log(vehicle);
          // TODO Return the vehicle data
        }
      }
    });
  } catch (error) {
    throw error;
  }

  res.send("Successfull red all the vehicles data");
});
