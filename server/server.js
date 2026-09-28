const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("PA2 server is running");
});

const PORT = 5000;

app.listen(PORT, function () {
    console.log('Server running on port ${PORT}');
});