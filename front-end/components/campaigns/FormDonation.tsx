"use client";

import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Address, formatUnits, parseEther } from "viem";
import { Input } from "../ui/input";
import Loader from "../shared/Loader";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { formatterUSD, getExplorer } from "@/lib/utils";
import { donateNative, donateToken } from "@/web3/charity";
import { useToast } from "../ui/use-toast";
import ToastTx from "../shared/ToastTx";
import { approveSpending } from "@/web3/token";
import useWaitForTxAction from "@/hooks/useWaitForTx";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().max(100).optional(),
  message: z.string().max(100).optional(),
  token: z.string(),
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected positive non-zero number, received a string",
  }),
});

interface SelectedToken {
  label: string;
  address: Address;
  icon: string;
  ticker: string;
  dollarValue: number;
  index: number;
}

interface FormDonationProps {
  id: number;
  balances: TokenBalance[];
  availableTokens: AvailableTokens;
  nativeBalance: AvailableTokens;
  nativeAmount: bigint;
}

const FormDonation = ({
  id,
  availableTokens,
  balances,
  nativeBalance,
  nativeAmount,
}: FormDonationProps) => {
  const etherscan = getExplorer();
  const router = useRouter();
  const { toast } = useToast();
  const [disabledButton, setDisabledButton] = useState(false);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [state, setState] = useState<"approve" | "donate">("donate");
  const [selected, setSelected] = useState<SelectedToken>({
    label: "native",
    address: nativeBalance.address[0],
    icon: nativeBalance.icon[0],
    ticker: "ISLM",
    dollarValue: nativeBalance.price[0],
    index: -1,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      message: "",
      name: "",
      token: "",
    },
  });

  const action = () => {
    if (txHash !== undefined) {
      toast({
        title: "Transaction Done",
        action: (
          <ToastTx
            explorerLink={etherscan.url}
            explorerName={etherscan.name}
            txHash={txHash}
          />
        ),
      });

      setTxHash(undefined);
      setDisabledButton(false);

      if (state === "approve") {
        setState("donate");
        balances[selected.index].allowance = BigInt(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
      } else {
        form.reset();
        router.push("/account");
      }
    }
  };

  useWaitForTxAction({
    txHash: txHash,
    action: action,
  });

  const handleCreateCampaign = async (values: z.infer<typeof formSchema>) => {
    if (selected.label === "native") {
      handleDonateNative();
    } else {
      handleDonateToken();
    }
  };

  const handleDonateNative = async () => {
    setDisabledButton(true);
    try {
      const amount = parseEther(form.getValues("amount"));
      const txHash = await donateNative(
        id,
        form.getValues("name")!,
        form.getValues("message")!,
        amount
      );
      setTxHash(txHash);
      toast({
        title: "Transaction submitted",
        action: (
          <ToastTx
            explorerLink={etherscan.url}
            explorerName={etherscan.name}
            txHash={txHash}
          />
        ),
      });
    } catch (error: any) {
      console.error("Error in handleDonateNative", error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  const handleDonateToken = async () => {
    setDisabledButton(true);
    try {
      let txHash: Address | undefined = undefined;
      if (balances[selected.index].allowance === BigInt(0)) {
        // Approve Spending
        setState("approve");
        txHash = await approveSpending(selected.address);
        setTxHash(txHash);
        setTxHash(txHash);
        toast({
          title: "Transaction submitted",
          action: (
            <ToastTx
              explorerLink={etherscan.url}
              explorerName={etherscan.name}
              txHash={txHash}
            />
          ),
        });
      } else {
        const tokenDecimals = availableTokens.decimals[selected.index];
        const tokenAmount = Number(form.getValues("amount"));
        const amount = BigInt(tokenAmount * 10 ** tokenDecimals);
        txHash = await donateToken(
          id,
          form.getValues("name")!,
          form.getValues("message")!,
          amount,
          selected.address
        );
        setTxHash(txHash);
        toast({
          title: "Transaction submitted",
          action: (
            <ToastTx
              explorerLink={etherscan.url}
              explorerName={etherscan.name}
              txHash={txHash}
            />
          ),
        });
      }
    } catch (error: any) {
      console.error("Error in handleCreateCampaign", error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateCampaign)}
        className="flex flex-col space-y-3 w-full h-full"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Crypto
                <span className="pl-1 text-red-500">*</span>
              </FormLabel>
              <div className="flex flex-row space-x-3">
                <FormControl className="w-full">
                  <Input
                    type="number"
                    max={
                      selected.label === "native"
                        ? Number(formatUnits(nativeAmount, 18))
                        : Number(
                            formatUnits(
                              balances[selected.index].value,
                              availableTokens.decimals[selected.index]
                            )
                          )
                    }
                    className="bg-primary-100 border border-primary-90 text-neutral-base"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <Select
                  value={selected.label}
                  onValueChange={(value) => {
                    if (value === "native") {
                      setSelected({
                        address: nativeBalance.address[0],
                        icon: nativeBalance.icon[0],
                        label: value,
                        ticker: "ISLM",
                        dollarValue: nativeBalance.price[0],
                        index: -1,
                      });
                      return;
                    }

                    const index = availableTokens.coinIds.findIndex(
                      (item) => item === value
                    );
                    setSelected({
                      address: availableTokens.address[index],
                      icon: availableTokens.icon[index],
                      label: value,
                      ticker: balances[index].ticker,
                      dollarValue: availableTokens.price[index],
                      index,
                    });
                  }}
                >
                  <SelectTrigger className="w-1/6 bg-primary-100 border border-primary-90 text-neutral-base">
                    <SelectValue>
                      <Image
                        src={selected.icon}
                        width={20}
                        height={20}
                        alt={selected.label}
                        className="rounded-full object-cover"
                      />
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">ISLM</SelectItem>
                    {availableTokens.coinIds.map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start justify-start text-neutral-base">
                <p className="m-body-small text-neutral-base/50">
                  Available:{" "}
                  {selected.label === "native"
                    ? formatUnits(nativeAmount, 18)
                    : formatUnits(
                        balances[selected.index].value,
                        availableTokens.decimals[selected.index]
                      )}{" "}
                  {selected.ticker}
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="Anonymous"
                  maxLength={50}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="I hope this ..."
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2 items-start justify-center text-neutral-base/80">
          <p className="m-body-base">You will donate:</p>
          <div className="flex flex-row space-x-2 w-full">
            <Image
              src={selected.icon}
              width={20}
              height={20}
              alt={"Token"}
              className="rounded-full object-cover"
            />
            <div className="flex flex-row items-center justify-between w-full">
              <p className=" m-body-small ">
                {form.watch("amount")} {selected.ticker}
              </p>
              <p className=" m-body-small ">
                equivalent to{" "}
                {formatterUSD.format(
                  selected.dollarValue * Number(form.watch("amount"))
                )}{" "}
                USD
              </p>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={disabledButton}
          className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl"
        >
          <p>
            {selected.label === "native"
              ? "Donate Now"
              : balances[selected.index].allowance === BigInt(0)
              ? "Approve"
              : "Donate Now"}
          </p>
          {disabledButton && <Loader size="20" speed="1.75" color="white" />}
        </Button>
      </form>
    </Form>
  );
};

export default FormDonation;
