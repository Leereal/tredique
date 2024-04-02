import React, { useEffect, useState } from "react";
import { getAllRobots } from "@/lib/actions/robot.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRobot } from "@/types";

interface RobotDropdownProps {
  value: string;
  onChangeHandler: (value: string) => void;
}

const RobotDropdown: React.FC<RobotDropdownProps> = ({
  value,
  onChangeHandler,
}) => {
  const [robots, setRobots] = useState<IRobot[]>([]);

  useEffect(() => {
    const getRobots = async () => {
      try {
        const robotList = await getAllRobots();
        robotList && setRobots(robotList);
      } catch (error) {
        console.log("Error fetching robots:", error);
      }
    };

    getRobots();
  }, []);
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Robot" />
      </SelectTrigger>
      <SelectContent className="z-[1200]">
        {robots &&
          robots.length > 0 &&
          robots.map((robot) => (
            <SelectItem
              key={robot._id}
              value={robot._id}
              className="select-item p-regular-14"
            >
              {robot.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RobotDropdown;
