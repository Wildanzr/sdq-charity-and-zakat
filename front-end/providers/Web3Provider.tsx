"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "@/config/wagmi";
import { customTheme } from "@/config/theme";

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: React.ReactNode;
  cookie?: string | null;
}

const Web3Provider = ({ children, cookie }: Web3ProviderProps) => {
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme} modalSize="wide">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
