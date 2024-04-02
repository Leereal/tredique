import Header from "@/components/common/Header";
import { getAllAccounts } from "@/lib/actions/account.actions";
import { IAccount } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import AccountList from "./_components/AccountList";

const AccountsPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const response = await getAllAccounts({});
  const accounts: IAccount[] = response?.data ?? [];

  return (
    <>
      <Header title="Accounts" subtitle="In this page we add accounts" />
      <section className="mt-10">{<AccountList accounts={accounts} />}</section>
    </>
  );
};

export default AccountsPage;
