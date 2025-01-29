"use server";

import axios from "axios";

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY!;

export const getCoinLatestPrice = async (coinId: string) => {
  try {
    // ?ids=dai&vs_currencies=usd
    const ENDPOINT = new URL("https://api.coingecko.com/api/v3/simple/price")
    ENDPOINT.searchParams.append("vs_currencies", "usd");
    ENDPOINT.searchParams.append("ids", coinId);

    const res = await axios.get(ENDPOINT.toString(), {
      headers: {
        "Content-Type": "application/json",
        "x-cg-demo-api-key": COINGECKO_API_KEY,
      },
    });

    return res.data[coinId].usd;
  } catch (error) {
    console.error("Error in getCoinLatestPrice", error);
    return false;
  }
}