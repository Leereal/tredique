"use client";
import { getUserByClerkId, updateCredits } from "@/lib/actions/user.actions";
import { ForexSignal } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, ReactNode } from "react";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";

const PremiumPermission = ({
  children,
  skipPermission,
  signal,
}: {
  children: ReactNode;
  skipPermission?: boolean;
  signal: ForexSignal;
}) => {
  const clerkId = useAuth().userId;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [haveCredits, setHaveCredits] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const user = await getUserByClerkId(clerkId);

        if (user?.role === "Admin") {
          setIsAdmin(true);
        } else if (user?.premiumDueDate > new Date()) {
          setIsPremium(true);
        } else if (user?.creditBalance > 0) {
          console.log("signal", signal);

          // Deduct credits based on signal category and binary status
          let creditsToDeduct = 0;
          switch (signal.signalCategory?.name) {
            case "forex":
              if (!signal.isBinary) {
                creditsToDeduct = parseInt(
                  process.env.NEXT_PUBLIC_FOREX_SIGNAL_CREDIT!
                );
              }
              break;
            case "iqoption-binary":
              if (signal.isBinary) {
                creditsToDeduct = parseInt(
                  process.env.NEXT_PUBLIC_BINARY_SIGNAL_CREDIT!
                );
              }
              break;
            case "synthetic":
              if (!signal.isBinary) {
                creditsToDeduct = parseInt(
                  process.env.NEXT_PUBLIC_SYNTHETIC_FOREX_SIGNAL_CREDIT!
                );
              }
              break;
            case "synthetic-binary":
              if (signal.isBinary) {
                creditsToDeduct = parseInt(
                  process.env.NEXT_PUBLIC_SYNTHETIC_BINARY_SIGNAL_CREDIT!
                );
              }
              break;
            default:
              break;
          }

          // Deduct credits from user
          if (creditsToDeduct > 0 && user.creditBalance >= creditsToDeduct) {
            await updateCredits({
              userId: user._id,
              creditFee: -creditsToDeduct,
              transactionType: "Credit deduction",
              transactionDetails: {
                signal: signal._id,
              },
            });
            setHaveCredits(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return null;
  }

  if (skipPermission || isAdmin || isPremium || haveCredits) {
    return children;
  }
  return <InsufficientCreditsModal />;
};

export default PremiumPermission;
