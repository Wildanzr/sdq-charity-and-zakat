import { cookieToInitialState, createConfig, http } from "wagmi";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";

const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet";
export const serverConfig = createConfig({
  chains: NETWORK === "mainnet" ? [haqqMainnet] : [haqqTestedge2],
  transports: {
    [haqqMainnet.id]: http("https://rpc.eth.haqq.network"),
    [haqqTestedge2.id]: http("https://rpc.eth.testedge2.haqq.network"),
  },
});