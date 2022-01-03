require("dotenv").config();

const express = require('express');
const cors = require("cors");
const mongo = require("./mongo.js");

// Importing routes
const register = require("./routes/register.js");
const login = require("./routes/login.js");

const app = express();

// Using cors
app.use(cors());

// Parsing request body as JSON format
app.use(express.json());
// Initializing passport

(async () => {
    try {
        // Mongodb Connection
        await mongo.connect();
        // Routes
        app.use("/register", register);
        app.use("/login", login);
    } catch (error) {
        console.log(error);
    }
})();

app.listen(process.env.PORT || 3001, () => console.log("Listening on PORT 3001"));
