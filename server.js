const express = require("express");
const mongoose = require("mongoose");

const items = require("./routes/api/items");
const products = require("./routes/api/products");

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({
        limit:'50mb',
        extended: true
}));


// DB CONFIG
const db = require("./config/keys").mongoURI;

mongoose
.connect(db)
.then(() => console.log("MONGODB Connected."))
.catch( err => console.log("ERROR"));


// USE ROUTES
app.use("/api/items",items);
app.use("/api/products",products);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log("SERVER RUNS IN PORT: "+port));