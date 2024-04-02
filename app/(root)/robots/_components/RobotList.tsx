"use client";
import AdminPermission from "@/components/common/AdminPermission";
import { Button } from "@/components/ui/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import RobotModal from "./RobotModal";
import { FaCirclePlay, FaCircleStop, FaPencil } from "react-icons/fa6";
import { IRobot } from "@/types";
import { useSocket } from "@/context/SocketContext";
import { getAllRobots } from "@/lib/actions/robot.actions";

const RobotList = ({ bots }: any) => {
  const [visible, setVisible] = useState(false);
  const [activating, setActivating] = useState(false);
  const { socket, showMessage } = useSocket();
  const [robots, setRobots] = useState<IRobot[]>(bots);
  const [selectedBot, setSelectedBot] = useState<IRobot | null>(null);
  const handleBot = async (bot: IRobot) => {
    setActivating(true);
    socket.emit("handleBot", {
      id: bot._id,
      activate: !bot.active,
    });

    setSelectedBot(bot);
  };
  const editBot = async (bot: IRobot) => {
    setSelectedBot(bot);
    setVisible(true);
  };
  const actionBodyTemplate = (rowData: IRobot) => {
    return (
      <div className="flex items-center space-x-2">
        <span>
          <Button
            className={rowData.active ? `bg-red-500` : ``}
            onClick={() => handleBot(rowData)}
            disabled={activating && selectedBot?._id === rowData._id}
          >
            {rowData.active ? <FaCircleStop /> : <FaCirclePlay />}
          </Button>
        </span>
        <span>
          <Button onClick={() => editBot(rowData)}>
            <FaPencil />
          </Button>
        </span>
      </div>
    );
  };
  const activeBodyTemplate = (rowData: any) => {
    return <span>{rowData.active ? "Active" : "Deactivated"}</span>;
  };
  useEffect(() => {
    if (!socket) return;

    const handleUpdateRobots = async (data: any) => {
      if (data.action === "bot_started" || data.action === "bot_stopped") {
        if (data.data.message === "success") {
          const updatedRobots = await getAllRobots();
          setRobots(updatedRobots);
          showMessage("success", "Robot Updated", "Robot updated successfully");
          setActivating(false);
        } else {
          setActivating(false);
          showMessage(
            "error",
            "Robot Updated Failed",
            "Robot update failed maybe we don't have active connections"
          );
        }
      }
    };

    socket.on("bot", handleUpdateRobots);

    return () => {
      socket.off("bot", handleUpdateRobots);
    };
  }, [socket]);
  return (
    <div>
      <div className="mb-3">
        <AdminPermission>
          <Button className="submit-button" onClick={() => setVisible(true)}>
            Create
          </Button>
        </AdminPermission>
      </div>
      {robots ? (
        <DataTable value={robots} tableStyle={{ minWidth: "50rem" }}>
          <Column field="name" header="Name"></Column>
          <Column field="version" header="Version"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="strategy" header="Strategy"></Column>
          <Column
            field="active"
            header="Active"
            body={activeBodyTemplate}
          ></Column>
          <Column field="creator.name" header="Creator"></Column>
          <Column field="category.name" header="Category"></Column>
          <Column field="socket" header="Socket"></Column>
          <Column
            headerStyle={{ width: "5rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      ) : (
        <div className="flex justify-center items-center">No robots found</div>
      )}
      <AdminPermission>
        <RobotModal
          type={selectedBot ? "Update" : "Create"}
          visible={visible}
          setVisible={() => setVisible(false)}
          robot={selectedBot}
        />
      </AdminPermission>
    </div>
  );
};

export default RobotList;
