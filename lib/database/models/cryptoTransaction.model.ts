import { Schema, model, models } from "mongoose";

const CryptoTransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    cryptoAmount: {
      type: Number,
      required: true,
    },
    paidCryptoAmount: {
      type: Number,
      required: false,
    },
    currency: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
    },
    credits: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "success", "failed", "partially paid"],
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

const CryptoTransaction =
  models?.CryptoTransaction ||
  model("CryptoTransaction", CryptoTransactionSchema);

export default CryptoTransaction;
