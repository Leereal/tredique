import { Schema, model, models } from "mongoose";

const ConnectionSchema = new Schema(
  {
    connector: { type: Schema.Types.ObjectId, ref: "User" },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    robot: { type: Schema.Types.ObjectId, ref: "Robot" },
    payout: { type: Number },
    stake: { type: Number },
    expiration: { type: Number },
    currentLevel: { type: Number },
    martingale: { type: Boolean },
    targetPercentage: { type: Number },
    active: { type: Boolean },
    targetReached: { type: Boolean },
    openTrade: { type: Boolean },
    activeContractId: { type: Number },
    lastProfit: { type: Number },
    entry: { type: String },
    currency: { type: String },
    dynamicStake: { type: Boolean },
    stopLoss: { type: Number },
    stakePercentage: { type: Number },
    riskType: { type: String },
    riskPercentage: { type: Number },
  },
  {
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

const Connection = models.Connection || model("Connection", ConnectionSchema);

export default Connection;
