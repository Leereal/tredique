"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ConnectionModal from "./ConnectionModal"; // Import your ConnectionModal component
import { FaPencil } from "react-icons/fa6";

const ConnectionList = ({ connections }: any) => {
  const [visible, setVisible] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<any | null>(
    null
  );

  const editConnection = async (connection: any) => {
    setSelectedConnection(connection);
    setVisible(true);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex items-center space-x-2">
        <span>
          <Button onClick={() => editConnection(rowData)}>
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
      {connections && connections.length > 0 ? (
        <DataTable value={connections} tableStyle={{ minWidth: "50rem" }}>
          <Column field="connector.firstName" header="Connector"></Column>
          <Column field="account.accountName" header="Account"></Column>
          <Column
            field="robot.name"
            header="Robot"
            className="text-nowrap"
          ></Column>
          <Column field="payout" header="Payout"></Column>
          <Column field="stake" header="Stake"></Column>
          <Column field="expiration" header="Expiration"></Column>
          <Column field="currentLevel" header="Current Level"></Column>
          <Column field="martingale" header="Martingale"></Column>
          <Column field="targetPercentage" header="Target Percentage"></Column>
          <Column
            field="active"
            header="Active"
            body={activeBodyTemplate}
          ></Column>
          <Column field="targetReached" header="Target Reached"></Column>
          <Column field="openTrade" header="Open Trade"></Column>
          <Column field="activeContractId" header="Active Contract ID"></Column>
          <Column field="lastProfit" header="Last Profit"></Column>
          <Column field="entry" header="Entry"></Column>
          <Column field="currency" header="Currency"></Column>
          <Column field="dynamicStake" header="Dynamic Stake"></Column>
          <Column
            headerStyle={{ width: "5rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      ) : (
        <div className="flex justify-center items-center">
          No connections found
        </div>
      )}
      {visible && (
        <ConnectionModal
          type={selectedConnection ? "Update" : "Create"}
          visible={visible}
          setVisible={() => setVisible(false)}
          connection={selectedConnection}
        />
      )}
    </div>
  );
};

export default ConnectionList;
