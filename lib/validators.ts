import { z } from "zod";

export const signalFormSchema = z.object({
  signalCategoryId: z.string().optional(),
  symbol: z.string(),
  entryRange: z.string(),
  stopLoss: z.coerce.number().gte(0, "Stop loss must be more than or equal 0"),
  takeProfit1: z.coerce
    .number()
    .gte(0, "Take Profit must be more than or equal 0"),
  takeProfit2: z.coerce
    .number()
    .gte(0, "Take Profit must be more than or equal 0"),
  takeProfit3: z.coerce
    .number()
    .gte(0, "Take profit must be more than or equal 0"),
  takeProfit4: z.coerce
    .number()
    .gte(0, "Take profit must be more than or equal 0"),
  takeProfit5: z.coerce
    .number()
    .gte(0, "Take profit must be more than or equal 0"),
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
