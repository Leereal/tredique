/* eslint-disable camelcase */
import CryptoTransaction from "@/lib/database/models/cryptoTransaction.model";

const bconKey = process.env.BCONGLOBAL_API_KEY!;

export async function POST(request: Request) {
  const {
    status,
    addr,
    value: stringValue,
    txid,
    secret,
  } = await request.json();

  if (secret !== bconKey) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const valueInBTC = parseInt(stringValue, 10) / 100000000;

  const order = await CryptoTransaction.findOne({
    address: addr,
  });

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
    order.paidCryptoAmount = valueInBTC;
    await order.save();
  } else if (status === "1") {
    order.status = "failed";
    order.transactionId = txid;
    order.paidCryptoAmount = valueInBTC;
    await order.save();
  }
  return new Response("", { status: 200 });
}
