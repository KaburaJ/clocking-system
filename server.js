require("dotenv").config();
require("./models/clocking.model").default
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req,res) => res.send("Welcome to CDED Clocking System"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/clocking", require("./controllers/clocking.controller"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server listening on port " + port));
