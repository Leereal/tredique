import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  accountName: { type: String },
  token: { type: String },
  active: { type: Boolean, default: true },
  balance: { type: Number, default: 0 },
  openingBalance: { type: Number, default: 0 },
});

const Account = models.Account || model("Account", AccountSchema);

export default Account;
