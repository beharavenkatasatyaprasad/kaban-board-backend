const express = require("express");
const config = require("./config.json");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const task = require("./Models/task")
const app = express();
const port = process.env.PORT || 5000;




app.use("*",cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("This is Index Route")
});

app.post("/addtask",async (req, res) => {
    const {record} = req.body
    try {
        const result = await task.create(record);
        console.log(result)
    } catch(error) {
        console.error(error)
    }

});

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`)
});