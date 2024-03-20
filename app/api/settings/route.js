import { getAllAccounts } from "@/lib/actions/account.actions";
import { NextResponse } from "next/server";

export async function GET(request) {
  const accounts = await getAllAccounts({
    query: "",
    page: 1,
    limit: 100,
  });
  return NextResponse.json(accounts);
}
