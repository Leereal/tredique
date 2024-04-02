"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import AccountModal from "./AccountModal"; // Import your AccountModal component
import { FaPencil } from "react-icons/fa6";

const AccountList = ({ accounts }: any) => {
  const [visible, setVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);

  const editAccount = async (account: any) => {
    setSelectedAccount(account);
    setVisible(true);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex items-center space-x-2">
        <span>
          <Button onClick={() => editAccount(rowData)}>
            <FaPencil />
          </Button>
        </span>
      </div>
    );
  };

  const activeBodyTemplate = (rowData: any) => {
    return <span>{rowData.active ? "Active" : "Deactivated"}</span>;
  };

  return (
    <div>
      <div className="mb-3">
        <Button className="submit-button" onClick={() => setVisible(true)}>
          Create
        </Button>
      </div>
      {accounts && accounts.length > 0 ? (
        <DataTable value={accounts} tableStyle={{ minWidth: "50rem" }}>
          <Column field="accountName" header="Account Name"></Column>
          <Column field="token" header="Token"></Column>
          <Column
            field="active"
            header="Active"
            body={activeBodyTemplate}
          ></Column>
          <Column field="balance" header="Balance"></Column>
          <Column field="openingBalance" header="Opening Balance"></Column>
          <Column
            headerStyle={{ width: "5rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      ) : (
        <div className="flex justify-center items-center">
          No accounts found
        </div>
      )}
      <AccountModal
        type={selectedAccount ? "Update" : "Create"}
        visible={visible}
        setVisible={() => setVisible(false)}
        account={selectedAccount}
      />
    </div>
  );
};

export default AccountList;
