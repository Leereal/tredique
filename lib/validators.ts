import { z } from "zod";

export const signalFormSchema = z.object({
  signalCategoryId: z.string().optional(),
  symbol: z.string(),
  entryRange: z.string(),
  stopLoss: z.coerce
    .number()
    .gte(0, "Stop loss must be more than or equal 0")
    .optional(),
  takeProfit1: z.coerce
    .number()
    .gte(0, "Take Profit must be more than or equal 0")
    .optional(),
  takeProfit2: z.coerce
    .number()
    .gte(0, "Take Profit must be more than or equal 0")
    .optional(),
  takeProfit3: z.coerce
    .number()
    .gte(0, "Take profit must be more than or equal 0")
    .optional(),
  takeProfit4: z.coerce
    .number()
    .gte(0, "Take profit must be more than or equal 0")
    .optional(),
  takeProfit5: z.coerce
    .number()
    .gte(0, "Take profit must be more than or equal 0")
    .optional(),
  isPremium: z.boolean(),
  isBinary: z.boolean(),
  isActive: z.boolean(),
  profit: z.coerce.number().optional(),
  type: z.string(),
  expiration: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .optional(),
});

export const robotFormSchema = z.object({
  name: z.string(),
  version: z.string().optional(),
  description: z.string().optional(),
  strategy: z.string().optional(),
  active: z.boolean(),
  creator: z.string().optional(),
  category: z.string().optional(),
  symbols: z
    .array(
      z.object({
        name: z.string(),
        active: z.boolean(),
      })
    )
    .optional(),
  socket: z.string().optional(),
});

export const accountFormSchema = z.object({
  owner: z.string().optional(),
  accountName: z.string(),
  token: z.string().optional(),
  active: z.boolean().optional(),
  balance: z.number().optional(),
  openingBalance: z.number().optional(),
});

export const connectionFormSchema = z.object({
  accountId: z.string(),
  robotId: z.string(),
  payout: z.coerce.number().optional(),
  stake: z.coerce.number(),
  expiration: z.coerce.number(),
  currentLevel: z.coerce.number().optional(),
  martingale: z.boolean().optional(),
  targetPercentage: z.coerce.number().optional(),
  active: z.boolean().optional(),
  targetReached: z.boolean().optional(),
  openTrade: z.boolean().optional(),
  activeContractId: z.coerce.number().optional(),
  lastProfit: z.coerce.number().optional(),
  entry: z.string().optional(),
  currency: z.string(),
  dynamicStake: z.boolean().optional(),
  stopLoss: z.coerce.number().optional(),
  stakePercentage: z.coerce.number().optional(),
  riskType: z.string().optional(),
  riskPercentage: z.coerce.number().optional(),
});
