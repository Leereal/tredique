import { Schema, model, models } from "mongoose";

const RobotCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const RobotCategory =
  models.RobotCategory || model("RobotCategory", RobotCategorySchema);

export default RobotCategory;
