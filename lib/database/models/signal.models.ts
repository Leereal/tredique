import { Schema, model, models } from "mongoose";

const SignalSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    robot: { type: Schema.Types.ObjectId, ref: "Robot" },
    signalCategory: { type: Schema.Types.ObjectId, ref: "SignalCategory" },
    symbol: { type: String },
    entryRange: { type: String },
    stopLoss: { type: Number },
    takeProfit1: { type: Number },
    takeProfit2: { type: Number },
    takeProfit3: { type: Number },
    takeProfit4: { type: Number },
    takeProfit5: { type: Number },
    isPremium: { type: Boolean },
    isActive: { type: Boolean },
    profit: { type: Number },
    type: { type: String },
    expiration: { type: Number },
    isBinary: { type: Boolean }, // Added isBinary field
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to nullify takeProfit fields if isBinary is true
SignalSchema.pre("save", function (next) {
  if (this.isBinary) {
    this.takeProfit1 = null;
    this.takeProfit2 = null;
    this.takeProfit3 = null;
    this.takeProfit4 = null;
    this.takeProfit5 = null;
    this.stopLoss = null;
  }
  next();
});

const Signal = models.Signal || model("Signal", SignalSchema);

export default Signal;
