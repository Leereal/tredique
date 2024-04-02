import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount, updateAccount } from "@/lib/actions/account.actions"; // Import your actions for creating and updating accounts
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
import { accountFormSchema } from "@/lib/validators";

const AccountModal = ({
  visible,
  setVisible,
  account,
  type,
}: {
  visible: boolean;
  setVisible: () => void;
  account?: any | null;
  type: string;
}) => {
  const { user } = useSocket();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues =
    account && type === "Update"
      ? { ...account }
      : { accountName: "", active: false };

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    setIsSubmitting(true);
    if (type === "Create") {
      try {
        const newAccount = await createAccount({
          account: { ...values },
          userId: user?._id,
          path: "/accounts",
        });

        if (newAccount) {
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
      if (!account?._id) {
        return;
      }

      try {
        const updatedAccount = await updateAccount({
          userId: user?._id,
          account: { ...values, _id: account._id },
          path: `/accounts`,
        });

        if (updatedAccount) {
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
      header="Account Details"
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
              name="accountName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
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
              name="token"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Token"
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
            className="submit-button"
          >
            {isSubmitting ? <Spinner /> : `Submit`}
          </Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default AccountModal;
