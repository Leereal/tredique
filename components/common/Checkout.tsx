"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import {
  checkoutCredits,
  getBitcoinAddress,
} from "@/lib/actions/transaction.actions";

import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog as PDialog } from "primereact/dialog";
import { FaCopy } from "react-icons/fa6";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);
  const [cryptoData, setCryptoData] = useState<any>();
  const [copied, setCopied] = useState(false);

  const handleCopy = (value: string) => {
    if (!value) return;

    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  const cryptoCheckout = async () => {
    const cryptoData: any = await getBitcoinAddress({
      fiatAmount: amount,
      credits,
      buyerId,
      plan,
    });

    //redirect to another page
    if (cryptoData?.address) {
      setCryptoData(cryptoData);
      setVisible(true);
    }
  };

  return (
    <>
      <section>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="submit"
              role="link"
              className="w-full rounded-full bg-purple-gradient bg-cover"
            >
              Buy Credit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select Payment Method</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Button>Paypal</Button>
              <Button onClick={cryptoCheckout}>Bitcoin</Button>
              <Button onClick={onCheckout}>Stripe</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
      <PDialog
        header="Payment Details"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="space-y-4">
          <span className="flex flex-col md:flex-row gap-4 md:items-center">
            <p className="font-bold">Address To Pay To:</p>
            <span className="flex gap-3 items-center">
              <p>{cryptoData?.address}</p>
              {copied ? (
                "Copied!"
              ) : (
                <FaCopy
                  className="cursor-pointer text-green-600"
                  onClick={() => handleCopy(cryptoData?.address)}
                />
              )}
            </span>
          </span>
          <p className="font-semibold">
            Please use the bitcoin value / amount in Bitcoin when making
            payment.
          </p>
          <span className="flex flex-col md:flex-row gap-4 md:items-center">
            <p className="font-bold">Amount in Bitcoin:</p>
            <span className="flex gap-3 items-center">
              <p>
                {cryptoData?.currency} {cryptoData?.cryptoAmount}
              </p>
              {copied ? (
                "Copied!"
              ) : (
                <FaCopy
                  className="cursor-pointer text-green-600"
                  onClick={() => handleCopy(cryptoData?.cryptoAmount)}
                />
              )}
            </span>
          </span>
          <span className="flex flex-col md:flex-row gap-4 md:items-center">
            <p className="font-bold">Amount in USD:</p>
            <p>${cryptoData?.amount}</p>
          </span>
        </div>
      </PDialog>
    </>
  );
};

export default Checkout;
