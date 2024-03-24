"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { symbols } from "@/constants";
import { getAllSignalCategories } from "@/lib/actions/signal-category.actions";
import { useEffect, useState } from "react";
import { ForexSignalCategory } from "@/types";
import { useAuth } from "@clerk/nextjs";

export function SymbolComboBox({
  value,
  onChangeHandler,
  categoryId = "",
}: {
  value: string;
  onChangeHandler: (value: string) => void;
  categoryId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ForexSignalCategory[]>([]);
  //TODO: make sure to fix the bug where changing category doesn't rerender this component

  let categoryName = categoryId
    ? categories?.find((cat) => cat._id === categoryId)?.name?.toLowerCase()
    : undefined;
  if (categoryName) {
    switch (categoryName) {
      case "forex":
      case "synthetic":
        break;
      case "deriv-binary":
        categoryName = "synthetic";
        break;
      case "iqoption-binary":
        categoryName = "forex";
        break;
      default:
        categoryName = "forex";
    }
  }
  const assets = categoryName
    ? symbols[categoryName] || []
    : symbols.forex || [];

  useEffect(() => {
    const getCategories = async () => {
      const categoryList: ForexSignalCategory[] =
        await getAllSignalCategories();
      categoryList && setCategories(categoryList);
    };

    getCategories();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between input-field"
          disabled={!assets}
        >
          {value
            ? assets.find((asset) => asset.name === value)?.name
            : "Select Symbol..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 md:w-[400px] z-[1200]">
        <Command>
          <CommandInput placeholder="Search Symbol..." />
          <CommandList>
            <CommandEmpty>No asset found.</CommandEmpty>
            <CommandGroup>
              {assets?.map((asset) => (
                <CommandItem
                  key={asset.name}
                  value={asset.name}
                  onSelect={(currentValue) => {
                    onChangeHandler(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === asset.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {asset.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
