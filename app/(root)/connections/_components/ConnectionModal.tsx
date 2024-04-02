import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createConnection,
  updateConnection,
} from "@/lib/actions/connection.actions"; // Import your actions for creating and updating connections
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/Spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useSocket } from "@/context/SocketContext";
import { connectionFormSchema } from "@/lib/validators";
import AccountDropdown from "@/components/common/AccountDropdown";
import RobotDropdown from "@/components/common/RobotDropdown";
import RiskTypeDropdown from "@/components/common/RiskTypeDropdown";
import { Checkbox } from "@/components/ui/checkbox";

const ConnectionModal = ({
  visible,
  setVisible,
  connection,
  type,
}: {
  visible: boolean;
  setVisible: () => void;
  connection?: any | null;
  type: string;
}) => {
  const { user } = useSocket();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues =
    connection && type === "Update"
      ? { ...connection }
      : { accountName: "", active: false };

  const form = useForm<z.infer<typeof connectionFormSchema>>({
    resolver: zodResolver(connectionFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof connectionFormSchema>) {
    setIsSubmitting(true);
    if (type === "Create") {
      try {
        const newConnection = await createConnection({
          connection: { ...values },
          userId: user?._id,
          path: "/connections",
        });

        if (newConnection) {
          form.reset();
          setVisible();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }

    if (type === "Update") {
      if (!connection?._id) {
        return;
      }

      try {
        const updatedConnection = await updateConnection({
          userId: user?._id,
          connection: { ...values, _id: connection._id },
          path: `/connections`,
        });

        if (updatedConnection) {
          form.reset();
          setVisible();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <Dialog
      header="Connection Details"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={setVisible}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <AccountDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                      type={type}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="robotId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Robot</FormLabel>
                  <FormControl>
                    <RobotDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="payout"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Payout</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Payout"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stake"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Stake</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stake"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Currency"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Expiration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Expiration"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentLevel"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Level</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Current Level"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activeContractId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Active Contract</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Active Contract"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="lastProfit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Profit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Profit"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetPercentage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Target"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Entry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entry"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="stopLoss"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Daily Stop Loss</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stop Loss"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stakePercentage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Stake Percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stake Percentage"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Risk Type</FormLabel>
                  <FormControl>
                    <RiskTypeDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskPercentage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Risk Percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Risk Percentage"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row items-center">
            <FormField
              control={form.control}
              name="martingale"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="martingale"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Martingale
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="martingale"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="active"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="active"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetReached"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="targetReached"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Target Reached
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="targetReached"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openTrade"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="openTrade"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Open Trade
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="openTrade"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dynamicStake"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="dynamicStake"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Dynamic Stake
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="dynamicStake"
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? <Spinner /> : `Submit`}
          </Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default ConnectionModal;
