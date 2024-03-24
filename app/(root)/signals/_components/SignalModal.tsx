import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog } from "primereact/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signalFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { signalDefaultValues } from "@/constants";
import { Button as PButton } from "primereact/button";
import { createSignal, updateSignal } from "@/lib/actions/signal.actions";
import { Input } from "@/components/ui/input";
import { SymbolComboBox } from "@/components/common/SymbolComboBox";
import SignalDropdown from "@/components/common/SignalDropdown";
import EntryTypeDropdown from "@/components/common/EntryTypeDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/Spinner";
import { cn } from "@/lib/utils";

const SignalModal = ({
  visible,
  setVisible,
  userId,
  signal,
  type,
}: {
  visible: boolean;
  setVisible: () => void;
  userId: string;
  signal?: any;
  type: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const binary = true;
  const initialValues =
    signal && type === "Update"
      ? {
          ...signal,
          signalCategoryId: signal.signalCategory._id,
        }
      : signalDefaultValues;
  const form = useForm<z.infer<typeof signalFormSchema>>({
    resolver: zodResolver(signalFormSchema),
    defaultValues: initialValues as z.infer<typeof signalFormSchema>,
  });
  async function onSubmit(values: z.infer<typeof signalFormSchema>) {
    setIsSubmitting(true);
    if (type === "Create") {
      try {
        const newSignal = await createSignal({
          signal: { ...values },
          userId,
          path: "/signals",
        });

        if (newSignal) {
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
      if (!signal._id) {
        return;
      }

      try {
        const updatedSignal = await updateSignal({
          userId,
          signal: { ...values, _id: signal._id },
          path: `/signals`,
        });

        if (updatedSignal) {
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
      header="Signal"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={setVisible}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <FormField
              control={form.control}
              name="signalCategoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SignalDropdown
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
              name="isBinary"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="isBinary"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Binary
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="isBinary"
                        className="mr-2 h-6 w-6 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <SymbolComboBox
                      categoryId={form.getValues("signalCategoryId")}
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Entry Type</FormLabel>
                  <FormControl>
                    <EntryTypeDropdown
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
              name="entryRange"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Entry Range / Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entry Range"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div
            className={cn(
              `flex flex-col gap-5 md:flex-row `,
              form.getValues("isBinary") ? "hidden" : ""
            )}
          >
            <FormField
              control={form.control}
              name="takeProfit1"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Take Profit 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Take Profit 1"
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
              name="takeProfit2"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Take Profit 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Take Profit 2"
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
              name="takeProfit3"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Take Profit 3</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Take Profit 3"
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
              name="takeProfit4"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Take Profit 4</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Take Profit 4"
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
              name="takeProfit5"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Take Profit 5</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Take Profit 5"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            {form.getValues("isBinary") ? (
              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Expiration (in minutes)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Expiration"
                        {...field}
                        className="input-field"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="stopLoss"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stop Loss</FormLabel>
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
            )}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="is_active"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="isActive"
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
              name="isPremium"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="isPremium"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Premium
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="isPremium"
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
              name="profit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Profit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Profit"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="submit-button "
          >
            {isSubmitting ? <Spinner /> : `Submit`}
          </Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default SignalModal;
