import React, { useEffect, useState } from "react";
import { getAllAccounts } from "@/lib/actions/account.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAccount } from "@/types";

interface AccountDropdownProps {
  value: string;
  onChangeHandler: (value: string) => void;
  type: string;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  value,
  onChangeHandler,
  type,
}) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const accountList = await getAllAccounts({});
        accountList && setAccounts(accountList.data);
      } catch (error) {
        console.log("Error fetching accounts:", error);
      }
    };

    getAccounts();
  }, []);

  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={value}
      disabled={type === "Update"}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent className="z-[1200]">
        {accounts.length > 0 &&
          accounts.map((account) => (
            <SelectItem
              key={account._id}
              value={account._id}
              className="select-item p-regular-14"
            >
              {account.accountName}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default AccountDropdown;
