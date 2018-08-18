// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// var PORT = 3000;
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var newItems = [];
  //   {
  //     customerID: "12345",
  //     customerName: "customerName",
  //     customerEmail: "customerEmail@gmail.com",
  //     customerPhone: 12345678,
  //   }
  // ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all newItems
app.get("/api/newItems", function(req, res) {
  return res.json(newItems);
});

// Displays a single character, or returns false
// app.get("/api/newItems/:entry", function(req, res) {
//   var chosen = req.params.entry;
//
//   console.log(chosen);
//
//   for (var i = 0; i < newItems.length; i++) {
//     if (chosen === newItems[i].routeName) {
//       return res.json(newItems[i]);
//     }
//   }
//
//   return res.json(false);
// });

// Create newItems - takes in JSON input
app.post("/api/newEntry", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newEntry = req.body;

  // Using a RegEx Pattern to remove spaces from newEntry
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  // newEntry.routeName = newEntry.name.replace(/\s+/g, "").toLowerCase();

  console.log(newEntry);
  newItems.push(newEntry);
  console.log(newItems);

  res.json(newEntry);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
