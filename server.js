const express = require("express");
const errorHandler = require("./middlesware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb()
const app = express();

const port = process.env.PORT || 3000;

// !These are middlewares
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server started on ${port}`);
})