const express = require("express");
const mongoose = require("mongoose");

const items = require("./routes/api/items");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
        extended: true
}));

// DB CONFIG
const db = require("./config/keys").mongoURI;

// CONNECT TO MONGODB
mongoose
.connect(db)
.then(() => console.log("MONGODB Connected."))
.catch( err => console.log("ERROR"));


// USE ROUTES
app.use("/api/items",items);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log("SERVER RUNS IN PORT: "+port));