import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

interface ItemProps {
  day: number;
  currentDay: number;
  amount: number;
  image: string;
  className?: string;
}

const Item = ({ className, amount, day, image, currentDay }: ItemProps) => {
  currentDay %= 7;
  const isNotPassed = day > currentDay ? "opacity-40" : "";
  const isPassed =
    day < currentDay
      ? "bg-primary-60 border-4 border-brand-40 "
      : day === currentDay
      ? "bg-primary-90 border-4 border-primary-10"
      : "bg-primary-90/40";

  return (
    <div
      className={cn(
        "relative flex flex-col space-y-2 items-center justify-center text-tertiary rounded-xl h-36",
        isNotPassed,
        isPassed,
        className
      )}
    >
      {/* Make FaCheck absolute top right */}
      {day < currentDay && (
        <div className="absolute flex items-center justify-center w-7 h-7 -top-3 -right-3 bg-gradient-to-bl from-tertiary-30 to-primary-20 rounded-full">
          <FaCheck className="text-brand-80" size={18} />
        </div>
      )}
      <p className="text-neutral-base m-body-base">Day {day}</p>
      <Image src={image} width={40} height={40} alt={`Day ${day}`} />
      <div className="flex w-full items-center justify-center">
        <p className="text-center text-primary-100 m-body-link px-4 py-1.5 rounded-2xl bg-brand-30">
          +{amount}
        </p>
      </div>
    </div>
  );
};

export default Item;
