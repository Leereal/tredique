import { Schema, model, models } from "mongoose";

const RobotSchema = new Schema({
  name: { type: String, required: true, unique: true },
  version: { type: String },
  description: { type: String },
  strategy: { type: String },
  active: { type: Boolean },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "RobotCategory" },
  symbols: [{ name: { type: String }, active: { type: Boolean } }],
  socket: { type: String },
});

const Robot = models.Robot || model("Robot", RobotSchema);

export default Robot;
