import { CreateForexSignalParams, IRobot } from "@/types";

export const navLinks = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: "/assets/icons/dashboard.svg",
    isAdmin: false,
    isActive: true,
  },
  {
    label: "Signals",
    route: "/signals",
    icon: "/assets/icons/wristwatch.svg",
    isAdmin: false,
    isActive: true,
  },
  {
    label: "Robots",
    route: "/robots",
    icon: "/assets/icons/robot-face.svg",
    isAdmin: false,
    isActive: false,
  },
  {
    label: "Accounts",
    route: "/accounts",
    icon: "/assets/icons/account.svg",
    isAdmin: false,
    isActive: false,
  },
  {
    label: "Connections",
    route: "/connections",
    icon: "/assets/icons/connections-wire.svg",
    isAdmin: false,
    isActive: false,
  },
  {
    label: "Trade",
    route: "/trade",
    icon: "/assets/icons/signal.svg",
    isAdmin: false,
    isActive: false,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile-user.svg",
    isAdmin: false,
    isActive: true,
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/money-bag.svg",
    isAdmin: false,
    isActive: false,
  },
  {
    label: "Settings",
    route: "/settings",
    icon: "/assets/icons/settings.svg",
    isAdmin: true,
    isActive: true,
  },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "signal.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const signalDefaultValues: CreateForexSignalParams = {
  signalCategoryId: "",
  symbol: "",
  entryRange: "",
  stopLoss: 0,
  takeProfit1: 0,
  takeProfit2: 0,
  takeProfit3: 0,
  takeProfit4: 0,
  takeProfit5: 0,
  isPremium: false,
  isActive: true,
  profit: null,
  type: "",
  expiration: 0,
  isBinary: false,
};

export const robotDefaultValues: IRobot = {
  name: "",
  active: true,
};

export const symbols: Record<string, { name: string; active: boolean }[]> = {
  forex: [
    { name: "AUDCAD", active: true },
    { name: "AUDCHF", active: true },
    { name: "AUDJPY", active: true },
    { name: "AUDNZD", active: true },
    { name: "AUDUSD", active: true },
    { name: "CADCHF", active: true },
    { name: "CADJPY", active: true },
    { name: "CHFJPY", active: true },
    { name: "EURAUD", active: true },
    { name: "EURCAD", active: true },
    { name: "EURCHF", active: true },
    { name: "EURGBP", active: true },
    { name: "EURJPY", active: true },
    { name: "EURNZD", active: true },
    { name: "EURUSD", active: true },
    { name: "GBPAUD", active: true },
    { name: "GBPCAD", active: true },
    { name: "GBPCHF", active: true },
    { name: "GBPJPY", active: true },
    { name: "GBPNZD", active: true },
    { name: "GBPUSD", active: true },
    { name: "NZDCAD", active: true },
    { name: "NZDCHF", active: true },
    { name: "NZDJPY", active: true },
    { name: "NZDUSD", active: true },
    { name: "USDCAD", active: true },
    { name: "USDCHF", active: true },
    { name: "USDCNH", active: true },
    { name: "USDDKK", active: true },
    { name: "USDHKD", active: true },
    { name: "USDJPY", active: true },
    { name: "USDMXN", active: true },
    { name: "USDNOK", active: true },
    { name: "USDSEK", active: true },
    { name: "USDSGD", active: true },
    { name: "USDTHB", active: true },
    { name: "USDTRY", active: true },
    { name: "USDZAR", active: true },
    { name: "XAUUSD", active: true },
  ],
  synthetic: [
    { name: "BOOM 300", active: true },
    { name: "BOOM 500", active: true },
    { name: "BOOM 1000", active: true },
    { name: "CRASH 300", active: true },
    { name: "CRASH 500", active: true },
    { name: "CRASH 1000", active: true },
    { name: "STEP INDEX", active: true },
    { name: "VOLATILITY 10", active: true },
    { name: "VOLATILITY 10 (1S)", active: true },
    { name: "VOLATILITY 25", active: true },
    { name: "VOLATILITY 25 (1S)", active: true },
    { name: "VOLATILITY 50", active: true },
    { name: "VOLATILITY 50 (1S)", active: true },
    { name: "VOLATILITY 75", active: true },
    { name: "VOLATILITY 75 (1S)", active: true },
    { name: "VOLATILITY 100", active: true },
    { name: "VOLATILITY 100 (1S)", active: true },
  ],
};

export const creditFee = -1;
