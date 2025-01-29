import { createPublicClient, http } from "viem";
import { haqqMainnet, haqqTestedge2 } from "viem/chains";

const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet";
const ENDPOINT =
  NETWORK === "mainnet"
    ? "https://rpc.eth.haqq.network"
    : "https://rpc.eth.testedge2.haqq.network";

export const publicClient = createPublicClient({
  chain: NETWORK === "mainnet" ? haqqMainnet : haqqTestedge2,
  transport: http(ENDPOINT),
});
