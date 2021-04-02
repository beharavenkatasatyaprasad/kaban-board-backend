const express = require("express");
const config = require("./config.json");
const logger = require("morgan");
const cors = require("cors");
const task = require("./Models/task");
const app = express();
var ObjectId = require('mongoose').Types.ObjectId; 

const port = process.env.PORT || 5000;

app.use("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("This is Index Route");
});

app.post("/addTask", async (req, res) => {
  const { record } = req.body;
  try {
    const result = await task.create(record);
    if (result) {
      console.log(result);
      res.status(202).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ success: false });
  }
});

app.put("/startTask", async (req, res) => {
  const { id } = req.body;
  let o_id = new ObjectId(id); 
  try {
    const date = new Date();
    const result = await task.findOne({_id: o_id})
    result.Started = true;
    result.StartedAt = date.toUTCString();
    result.InProgress = true;
    result.save()
    if (result) {
      res.status(202).json({ success: result });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
