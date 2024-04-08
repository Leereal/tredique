/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions/transaction.actions";
import { connectToDatabase } from "@/lib/database";
import CryptoTransaction from "@/lib/database/models/cryptoTransaction.model";

const bconKey = process.env.BCONGLOBAL_API_KEY!;

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams }: any = new URL(request.url);

    const status = searchParams.get("status");
    const addr = searchParams.get("addr");
    const stringValue = searchParams.get("value");
    const txid = searchParams.get("txid");
    const secret = searchParams.get("secret");

    // if (secret !== bconKey) {
    //   return new Response("Unauthorized", {
    //     status: 401,
    //   });
    // }

    const valueInBTC = parseInt(stringValue, 10) / 100000000;

    const order = await CryptoTransaction.findOne({
      address: addr,
    }).maxTimeMS(20000);

    if (!order) {
      return new Response("Transaction not found", {
        status: 404,
      });
    }

    if (status === "2") {
      order.status = order.paidCryptoAmount
        ? valueInBTC + order.paidCryptoAmount >= order.cryptoAmount
          ? "success"
          : "partially paid"
        : valueInBTC >= order.cryptoAmount
        ? "success"
        : "partially paid";
      order.transactionId = txid;
      order.paidCryptoAmount = (order.paidCryptoAmount || 0) + valueInBTC;
      await order.save();

      //We need to refactor this to be better
      if (order.status === "success") {
        const transaction = {
          stripeId: null,
          amount: order.amount,
          plan: order.plan,
          credits: order.credits,
          buyerId: order.buyer,
          createdAt: new Date(),
        };
        const newTransaction = await createTransaction(transaction);
      }
    } else if (status === "1") {
      order.status = "failed";
      order.transactionId = txid;
      order.paidCryptoAmount = valueInBTC;
      await order.save();
    }
    return new Response("", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
