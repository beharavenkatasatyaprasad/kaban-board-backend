const express = require("express");
const config = require("./config.json");
const logger = require("morgan");
const cors = require("cors");
const task = require("./Models/task");
const app = express();
const moment = require("moment");
var ObjectId = require("mongoose").Types.ObjectId;

const port = process.env.PORT || 5000;

app.use("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("This is Index Route");
});

app.post("/addTask", async (req, res) => {
  const { tasklabel, pricing } = req.body;

  const record = {
    tasklabel,
    pricing,
    Started: false,
    InProgress: false,
    Done: false,
  };

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
  var momentNow =moment().format("DD-MM-YYYY HH:mm:ss");
  try {
    const result = await task.findOne({ _id: o_id });
    result.Started = true;
    result.StartedAt = momentNow;
    result.InProgress = true;
    result.save();
    if (result) {
      res.status(202).json({ success: result });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ success: false });
  }
});

app.put("/resolveTask", async (req, res) => {
  const { id } = req.body;
  let o_id = new ObjectId(id);
  var momentNow =moment().format("DD-MM-YYYY HH:mm:ss");
  try {
    const result = await task.findOne({ _id: o_id });
    result.DoneAt = momentNow;
    result.InProgress = false;
    result.Done = true;
    result.save();
    if (result) {
      res.status(202).json({ success: result });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ success: false });
  }
});

app.get("/ToDoTasks", async (req, res) => {
  try {
    const result = await task.find({ Started: false });
    if (result) {
      res.status(202).json({ success: true, result: result });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ success: false });
  }
});

app.get("/inProgressTasks", async (req, res) => {
  try {
    const result = await task.find({ InProgress: true });
    if (result) {
      res.status(202).json({ success: true, result: result });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ success: false });
  }
});

app.get("/doneTasks", async (req, res) => {
  try {
    const result = await task.find({ Done: true });
    if (result) {
      res.status(202).json({ success: true, result: result });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
