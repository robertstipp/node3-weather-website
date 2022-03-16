const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//
// Goals: Create a partial for the footer
//
// 1. Setup the template for the footer partial "Created by Some Name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "just bobby",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "just bobby",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "How can I help you",
    title: "Help",
    name: "just bobby",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please enter a search term" });
  }
  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(errors);
      }
      return res.send({
        location,
        forecastData,
      });
    });
  });

  // return res.send({
  //   forecast: "It is snowng",
  //   location: "Philadelphia",
  //   address: address,
  // });
});

//
// Goal: Wire up /weather
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location

app.get("/products", (req, res) => {
  if (req.query.search) {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  } else {
    res.send("no search input");
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "just bobby",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "just bobby",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
