"use client";

import {
  useEffect,
  useRef,
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import {
  CountryCode,
  CountryOutputDto,
} from "@/app/models/country-code.dto";

export interface SearchModalProps {
  open: boolean;
  itemList: CountryOutputDto["countryCode"];
  onClick: (value: CountryCode) => void;
  onCancel: () => void;
}

export const SearchModal = ({
  open,
  itemList,
  onClick,
  onCancel,
}: SearchModalProps) => {
  const [searchList, setSearchList] = useState(itemList);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSearchList(itemList);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, itemList]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = itemList.filter(({ country_name }) =>
      country_name.toLowerCase().includes(search)
    );
    setSearchList(filtered);
    setSelectedIndex(0);
  };

  const handleSelect = (item: CountryCode) => {
    onClick(item);
    onCancel();
  };

  const onClose = () => {
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent className="max-w-md sm:rounded-xl animate-in fade-in-0 zoom-in-95">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Search Country</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              className="pl-10"
              placeholder="Search country"
              name="search"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>

          <ScrollArea className="h-[300px]" ref={containerRef}>
            <div className="space-y-2">
              {searchList.map((item, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md cursor-pointer transition-colors`}
                  // className={`p-2 rounded-md cursor-pointer transition-colors ${
                  //   i === selectedIndex
                  //     ? "bg-blue-100 text-blue-700 font-semibold"
                  //     : "hover:bg-gray-100"
                  // }`}
                  onClick={() => handleSelect(item)}
                >
                  {item.country_name}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
