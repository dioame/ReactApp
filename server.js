const express = require("express");

const products = require("./routes/api/products");

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({
        limit:'50mb',
        extended: true
}));


app.use("/api/products",products);

const port = process.env.PORT || 3001;

app.listen(port, ()=>console.log("SERVER RUNS IN PORT: "+port));