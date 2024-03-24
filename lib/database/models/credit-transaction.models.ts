import { Schema, model, models } from "mongoose";

const CreditTransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  transactionType: { type: String, required: true },
  transactionDetails: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

const CreditTransaction =
  models.CreditTransaction ||
  model("CreditTransaction", CreditTransactionSchema);

export default CreditTransaction;
