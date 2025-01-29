"use client";

import React from "react";
import { MdOutlineMessage } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

interface MessageProps {
  from: string;
  message: string;
}

const Message = ({ from, message }: MessageProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="m-0 p-0">
          <MdOutlineMessage
            className="text-neutral-base cursor-pointer"
            size={20}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{from}</h4>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Message;
