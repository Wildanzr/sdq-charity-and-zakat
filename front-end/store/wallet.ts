import { create } from "zustand";

export interface ContractData {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  refetch: boolean;
  setRefetch: (refetch: boolean) => void;
}

export const useWalletStore = create<ContractData>((set) => ({
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
  refetch: true,
  setRefetch: (refetch) => set({ refetch }),
}));
