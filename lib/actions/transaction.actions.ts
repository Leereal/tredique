"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";
import { CheckoutTransactionParams, CreateTransactionParams } from "@/types";
import { connectToDatabase } from "../database";
import CreditTransaction from "../database/models/credit-transaction.models";
import axios from "axios";
import CryptoTransaction from "../database/models/cryptoTransaction.model";
const bconKey = process.env.BCONGLOBAL_API_KEY!;
const API_URL = "https://external-api.bcon.global/api/v1";

const bconAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bconKey}`,
  },
});

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
  });

  redirect(session.url!);
}

export async function checkoutWithCrypto(
  transaction: CheckoutTransactionParams
) {
  // const amount = Number(transaction.amount) * 100;
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "usd",
  //         unit_amount: amount,
  //         product_data: {
  //           name: transaction.plan,
  //         },
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   metadata: {
  //     plan: transaction.plan,
  //     credits: transaction.credits,
  //     buyerId: transaction.buyerId,
  //   },
  //   mode: "payment",
  //   success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
  // });
  // redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    // Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    await updateCredits({
      userId: transaction.buyerId,
      creditFee: transaction.credits,
      transactionType: "Credit Purchase",
      transactionDetails: { planId: transaction.plan || 2 },
    });

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}

export async function getBitcoinAddress({
  fiatAmount,
  credits,
  buyerId,
  plan,
}: {
  fiatAmount: number;
  credits: number;
  buyerId: string;
  plan: string;
}) {
  try {
    const walletResponse: any = await bconAPI.post("/address");

    if (walletResponse?.data?.status !== "Ok") {
      throw new Error("Failed to generate bitcoin address");
    }

    const bitcoinAddress = walletResponse?.data?.data.address;

    const cryptoResponse: any = await bconAPI.get(
      "/currencies/btc?currency=USD"
    );

    if (cryptoResponse?.data?.status !== "Ok") {
      throw new Error("Failed to get cryptoCurrency ratee");
    }
    const cryptoCurrencyRate = cryptoResponse.data.data.price;
    const cryptoPrice = parseFloat(
      (fiatAmount / cryptoCurrencyRate).toFixed(8)
    );

    const newOrder = new CryptoTransaction({
      amount: fiatAmount,
      cryptoAmount: cryptoPrice,
      address: bitcoinAddress,
      currency: "BTC",
      buyer: buyerId,
      credits: credits,
      plan: plan,
    });

    await newOrder.save();

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}
