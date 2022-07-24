const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

console.log(__dirname);
console.log(path.join(__dirname, "../public/index.html"));

const app = express();

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

const myName = "Marc Reid";

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        myName,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        myName,
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        myName,
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must enter an address.",
        });
    }

    //console.log(req.query);

    geocode(
        req.query.address,
        (error, { latitude, longitude, location, country } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                //res.send("Location: " + location + ", " + country);
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );

    // res.send({
    //     forecast: "It is snowing",
    //     location: "Philadelphia",
    //     address: req.query.address,
    // });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!",
        });
    }

    //console.log(req.query);

    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found",
        title: "404",
        myName,
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found",
        title: "404",
        myName,
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
