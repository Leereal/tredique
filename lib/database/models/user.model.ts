import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String },
  planId: { type: Number, default: 1 },
  premiumDueDate: { type: Date, default: null },
  creditBalance: { type: Number, default: 10 },
  role: { type: String, default: "User" },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
