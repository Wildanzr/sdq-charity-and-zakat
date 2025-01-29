"use client";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { campaignStatus, campaignFilter } from "@/constants/common";

export interface QueryFilterProps {
  query: string;
  filter: string;
  status: string;
}
interface CampaignFilterProps {
  values: QueryFilterProps;
  setValues: (values: QueryFilterProps) => void;
}

const CampaignFilter = ({ values, setValues }: CampaignFilterProps) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center space-y-3">
      <Input
        startIcon={SearchIcon}
        type="text"
        value={values.query}
        onChange={(e) => setValues({ ...values, query: e.target.value })}
        className="bg-primary-100 border border-primary-90 text-neutral-base"
        placeholder="Type to search"
      />
      <div className="flex flex-row space-x-3 items-center justify-center w-full h-full">
        <Select
          value={values.filter}
          onValueChange={(value) => setValues({ ...values, filter: value })}
        >
          <SelectTrigger className="w-full bg-primary-100 border border-primary-90 text-neutral-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {campaignFilter.map((item, idx) => (
              <SelectItem key={idx} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={values.status}
          onValueChange={(value) => setValues({ ...values, status: value })}
        >
          <SelectTrigger className="w-full bg-primary-100 border border-primary-90 text-neutral-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {campaignStatus.map((item, idx) => (
              <SelectItem key={idx} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CampaignFilter;
