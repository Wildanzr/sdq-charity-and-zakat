import { connectorsForWallets, WalletList } from "@rainbow-me/rainbowkit";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";
import {
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { haqqWallet } from "./haqq-wallet";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";

const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet";
const walletList: WalletList = [
  {
    groupName: "Recommended",
    wallets: [haqqWallet, metaMaskWallet, rainbowWallet, walletConnectWallet]
  }
]
const connectors = connectorsForWallets(
  walletList, {
  appName: "SDQ",
  projectId: WALLETCONNECT_ID,
}
)

export const config = createConfig({
  chains: NETWORK === "mainnet" ? [haqqMainnet] : [haqqTestedge2],
  transports: {
    [haqqMainnet.id]: http("https://rpc.eth.haqq.network"),
    [haqqTestedge2.id]: http("https://rpc.eth.testedge2.haqq.network"),
  },
  connectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});