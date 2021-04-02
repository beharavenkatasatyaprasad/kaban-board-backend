const mongoose = require("mongoose");
const config = require("../config.json");

const dbUrl = config.dbUrl;

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err, result) => {
    err ? console.log(err) : console.log("db connected 🟢");
  }
);

const TaskSchema = new mongoose.Schema(
  {
    tasklabel: { type: String, required: true },
    pricing: { type: Number, required: true },
    Started: Boolean,
    InProgress: Boolean,
    Done: Boolean,
    StartedAt: { type: Date, required: false },
    DoneAt: { type: Date, required: false },
  },
  { collection: "tasks" }
);

const model = mongoose.model("Task", TaskSchema);

module.exports = model;
