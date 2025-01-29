import { mintMyFifthDonationSBT, mintMyFiftyDonationSBT, mintMyFirstCampaignSBT, mintMyFirstDonationSBT, mintMyHundredDonationSBT, mintMyTenCampaignSBT, mintMyTenDonationSBT, mintMyThirdCampaignSBT } from "@/web3/charity";
import { mintMyFirstSBT, mintMyOneMonthSBT, mintMyOneWeekSBT } from "@/web3/checkin";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";

export const SHODAQO_ADDRESS = "0x040EAdcaF7450609358047b7eF3Bef37E45D39D5";
export const CHECK_IN_ADDRESS = "0xA5bE51D8b8BE47A5517658c3cB401EBeC7C4F086";
export const CHARITY_ADDRESS = "0xeE69D703b166254313E1B46fdB6a60fda7decd2B";
export const CHARITY_FIRST_BLOCK = BigInt(10591655);

export const navigations: Navigation[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Check In",
    href: "/check-in",
  },
  {
    label: "Loyalty Program",
    href: "/loyalty-program",
  },
  {
    label: "Create a Campaign",
    href: "/create-a-campaign",
  },
  {
    label: "My Campaigns",
    href: "/my-campaigns",
  },
  {
    label: "Account",
    href: "/account",
  },
];

export const footerNavigations: Navigation[] = [
  {
    label: "Terms of Service",
    href: "#",
  },
  {
    label: "Privacy Policy",
    href: "#",
  },
  {
    label: "Contact Us",
    href: "#",
  },
  {
    label: "FAQ",
    href: "#",
  },
]

export const sponsors = [
  {
    image: "/icons/coinfest.svg",
    url: "https://coinfest.asia/",
    name: "Coinfest",
    cls: "bg-white",
  },
  {
    image: "/icons/ethsea.svg",
    url: "https://www.ethsea.com/",
    name: "ETHSEA",
    cls: ""
  },
  {
    image: "/icons/haqq.svg",
    url: "https://haqq.network/",
    name: "Haqq Network",
    cls: ""
  },
  {
    image: "/icons/islamic.svg",
    url: "https://islamiccoin.net/",
    name: "Islamic Coin",
    cls: ""
  },
  {
    image: "/icons/coingecko.svg",
    url: "https://www.coingecko.com/",
    name: "CoinGecko",
    cls: ""
  },
]

export const userColors = {
  primary: "#86EE60",
  secondary: "#2E6E65",
  tertiary: "#F4F7ED",
  shadow: "#2B3752",
};

export const checkInLists: CheckIn[] = [
  {
    amount: 1.25,
    day: 1,
    image: "/coins/twemoji_coin-1.svg",
  },
  {
    amount: 1.5,
    day: 2,
    image: "/coins/twemoji_coin-2.svg",
  },
  {
    amount: 2,
    day: 3,
    image: "/coins/twemoji_coin-3.svg",
  },
  {
    amount: 3,
    day: 4,
    image: "/coins/twemoji_coin-4.svg",
  },
  {
    amount: 5,
    day: 5,
    image: "/coins/twemoji_coin-5.svg",
  },
  {
    amount: 7,
    day: 6,
    image: "/coins/twemoji_coin-6.svg",
  },
  {
    amount: 10,
    day: 7,
    image: "/coins/twemoji_coin-7.svg",
  },
];

export const checkInProducts: Product[] = [
  {
    image: "/images/earn.png",
    label: "Earn",
    description: "Earn Coins Every Day!",
  },
  {
    image: "/images/collect.png",
    label: "Collect",
    description: "Collect Coins and Exchange for Attractive Rewards",
  },
  {
    image: "/images/level.png",
    label: "Level",
    description: "Level Up and Unlock Exclusive Surprises",
  },
  {
    image: "/images/bonus.png",
    label: "Earn",
    description: "Earn Bonus Coins for Consecutive Check-ins",
  },
  {
    image: "/images/reward.png",
    label: "Earn",
    description: "Don't Miss Daily Check-ins for Special Rewards!",
  },
];

export const homeProducts: Product[] = [
  {
    image: "/icons/home-1.svg",
    label: "Earn",
    description: "Transparent transactions, trackable contributions.",
  },
  {
    image: "/icons/home-2.svg",
    label: "Collect",
    description: "Secure, tamper-proof blockchain system.",
  },
  {
    image: "/icons/home-3.svg",
    label: "Level",
    description: "Shariah-aligned ethical giving.",
  },
  {
    image: "/icons/home-4.svg",
    label: "Earn",
    description: "Global reach through Web3 technology.",
  },
  {
    image: "/icons/home-5.svg",
    label: "Earn",
    description: "User-friendly, seamless donation experience.",
  },
];

export const CHAIN_EXPLORERS = [haqqMainnet, haqqTestedge2];

export const campaignStatus = [
  "All",
  "Active",
  "Finished",
]

export const campaignFilter = [
  "Last Updated",
  "Most Popular",
  "Most Raised",
]

export const tokenIcons = [
  {
    label: "native",
    icon: "/icons/islamic.svg",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18
  },
  {
    label: "usdc",
    icon: "/icons/usdc.svg",
    address: "0x45E9E9D65E9C7Dd7B87E1b9d9DD97940e82b8D41",
    decimals: 6
  },
  {
    label: "tether",
    icon: "/icons/usdt.svg",
    address: "0x5ebfa790f12077ab35C647cD83359Cd42221F2bf",
    decimals: 6
  },
  {
    label: "bridged-tether-axelar",
    icon: "/icons/usdt.svg",
    address: "0x781686accFB1330Fb8c3bE86a82ADf225686bC84",
    decimals: 6
  },
  {
    label: "bridged-usd-coin-axelar",
    icon: "/icons/usdc.svg",
    address: "0x76874a926C19d23C8Ce0677A531Fe6f0157E3F6F",
    decimals: 6
  },
]

export const tokenIcon: TokenIcon[] = [
  {
    label: "native",
    image: "/coins/islamic.png",
  },
  {
    label: "axlusdc",
    image: "/coins/axlusdc.png",
  },
  {
    label: "axelar-usdt",
    image: "/coins/axlusdt.png",
  },
  {
    label: "axelar",
    image: "/coins/axelar.jpeg",
  },
  {
    label: "cosmos",
    image: "/coins/cosmos.png",
  },
  {
    label: "axlwbtc",
    image: "/coins/axlwbtc.png",
  },
  {
    label: "axlweth",
    image: "/coins/axlweth.png",
  },
  {
    label: "dai",
    image: "/coins/dai.png",
  },

]

export const raffleList: Product[] = [
  {
    label: "Grand Prize",
    image: "/images/prize-1.png",
    description: "Umrah Package for Two",
  },
  {
    label: "2nd Winner",
    image: "/images/prize-2.png",
    description: "Islamic Tour"
  },
  {
    label: "3rd Winner",
    image: "/images/prize-3.png",
    description: "Luxury Gift Set"
  },
  {
    label: "4th Winner",
    image: "/images/prize-4.png",
    description: "Qu'ran Set"
  },
  {
    label: "5th Winner",
    image: "/images/prize-5.png",
    description: "Customized Islamic Apparel"
  },
  {
    label: "6th Winner",
    image: "/images/prize-6.png",
    description: "Donation Mosque"
  },
  {
    label: "7th Winner",
    image: "/images/prize-7.png",
    description: "Library Acces"
  }
]

export const soulbounds: Soulbound[] = [
  {
    id: 0,
    contract: "0xaeC4DF5f6Ce960e790c3D947EA79c8416533328E",
    image: "/images/sbt-checkin-1.png",
    info: "You should check in at least 1 day",
    isObtained: false,
    isReadyToMint: false,
    requirement: 0,
    name: "SBT Check In 1",
  },
  {
    id: 1,
    contract: "0xaA31505BbabED6813f46130c302f9451254e56F6",
    image: "/images/sbt-checkin-2.png",
    info: "You should check in at least 1 week",
    isObtained: false,
    isReadyToMint: false,
    requirement: 7,
    name: "SBT Check In 2",
  },
  {
    id: 2,
    contract: "0xEc399E287c237Ddbb43974200FD7987cB74d45Ad",
    image: "/images/sbt-checkin-3.png",
    info: "You should check in at least 1 month",
    isObtained: false,
    isReadyToMint: false,
    requirement: 30,
    name: "SBT Check In 3",
  },
  {
    id: 3,
    contract: "0xFBAa8FBD196Be84aEe7a441d2E401B5dFD590bC3",
    image: "/images/sbt-donation-1.png",
    info: "You should donate at least 1 time",
    isObtained: false,
    isReadyToMint: false,
    requirement: 0,
    name: "SBT Donate 1",
  },
  {
    id: 4,
    contract: "0x38Bca10DC760bA287718Af20B1a663db63d3A4Fa",
    image: "/images/sbt-donation-2.png",
    info: "You should donate at least 5 times",
    isObtained: false,
    isReadyToMint: false,
    requirement: 5,
    name: "SBT Donate 2",
  },
  {
    id: 5,
    contract: "0xBbbC242b1bA31F19B834e7035c3A429486dbC6eA",
    image: "/images/sbt-donation-3.png",
    info: "You should donate at least 10 times",
    isObtained: false,
    isReadyToMint: false,
    requirement: 10,
    name: "SBT Donate 3",
  },
  {
    id: 6,
    contract: "0x3c8c04f86A0dF859d04C53Dc5c186d743172E2D3",
    image: "/images/sbt-donation-4.png",
    info: "You should donate at least 50 times",
    isObtained: false,
    isReadyToMint: false,
    requirement: 50,
    name: "SBT Donate 4",
  },
  {
    id: 7,
    contract: "0x7188A91DA93382a43cB54FaD6Fca9b0345E372CA",
    image: "/images/sbt-donation-5.png",
    info: "You should donate at least 100 times",
    isObtained: false,
    isReadyToMint: false,
    requirement: 100,
    name: "SBT Donate 5",
  },
  {
    id: 8,
    contract: "0x91ba4272b7c3f864f1b483C4D0BEd8eC05469262",
    image: "/images/sbt-campaign-1.png",
    info: "You should create campaign at least 1 time",
    isObtained: false,
    isReadyToMint: false,
    requirement: 0,
    name: "SBT Campaign 1",
  },
  {
    id: 9,
    contract: "0x1E30fc4e1741E1f4fAb0670B9fe66C529335057f",
    image: "/images/sbt-campaign-2.png",
    info: "You should create campaign at least 3 times",
    isObtained: false,
    isReadyToMint: false,
    requirement: 3,
    name: "SBT Campaign 2",
  },
  {
    id: 10,
    contract: "0xDEbbCbc64fDB1223A6f610D669A54C82d1546D6f",
    image: "/images/sbt-campaign-3.png",
    info: "You should create campaign at least 10 times",
    isObtained: false,
    isReadyToMint: false,
    requirement: 10,
    name: "SBT Campaign 3",
  },
]