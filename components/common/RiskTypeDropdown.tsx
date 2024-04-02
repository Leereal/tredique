import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RiskTypeDropdownProps {
  value: string | undefined;
  onChangeHandler: (value: string) => void;
}

const RiskTypeDropdown: React.FC<RiskTypeDropdownProps> = ({
  value,
  onChangeHandler,
}) => {
  const risk_types: string[] = [
    "FLAT",
    "MARTINGALE",
    "COMPOUND ALL",
    "COMPOUND PROFIT ONLY",
    "BALANCE PERCENTAGE",
  ];

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Risk Type" />
      </SelectTrigger>
      <SelectContent className="z-[1200]">
        {risk_types.length > 0 &&
          risk_types.map((risk_type) => (
            <SelectItem
              key={risk_type}
              value={risk_type}
              className="select-item p-regular-14"
            >
              {risk_type}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RiskTypeDropdown;
