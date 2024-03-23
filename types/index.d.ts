// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  photo: string;
};

// ====== TRANSACTION PARAMS
declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

declare type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

// ====== URL QUERY PARAMS
declare type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

declare type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

declare type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};

declare type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CreateForexSignalParams = {
  signalCategoryId: string;
  symbol: string;
  entryRange: string;
  stopLoss: number; // Optional to allow for binary signals where it might not be applicable
  takeProfit1: number; // Optional for the same reason
  takeProfit2: number; // Optional for the same reason
  takeProfit3: number; // Optional for the same reason
  takeProfit4: number; // Optional for the same reason
  takeProfit5: number; // Optional for the same reason
  isPremium: boolean;
  isActive: boolean;
  profit?: number | null;
  type: string;
  expiration: number;
  isBinary: boolean; // Added to reflect the schema
};

export type UpdateForexSignalParams = {
  _id: string;
  signalCategoryId?: string;
  symbol?: string;
  entryRange?: string;
  stopLoss?: number; // Made nullable for binary signals
  takeProfit1?: number; // Made nullable for binary signals
  takeProfit2?: number; // Made nullable for binary signals
  takeProfit3?: number; // Made nullable for binary signals
  takeProfit4?: number; // Made nullable for binary signals
  takeProfit5?: number; // Made nullable for binary signals
  isPremium?: boolean;
  isActive?: boolean;
  profit?: number | null;
  type?: string;
  expiration?: number;
  isBinary?: boolean;
};

export type ForexSignal = {
  _id: string;
  symbol: string;
  entryRange: string;
  stopLoss?: number | null; // Make it optional and nullable
  takeProfit1?: number | null; // Make it optional and nullable
  takeProfit2?: number | null; // Make it optional and nullable
  takeProfit3?: number | null; // Make it optional and nullable
  takeProfit4?: number | null; // Make it optional and nullable
  takeProfit5?: number | null; // Make it optional and nullable
  isPremium: boolean;
  isActive: boolean;
  profit?: number | null;
  type: string;
  expiration: number;
  isBinary: boolean;
  createdAt: Date;
  sender?: {
    // Include sender field
    _id: string;
    firstName: string;
    lastName: string;
  };
  signalCategory?: ForexSignalCategory;
  Robot?: {
    // Include Robot field
    _id: string;
    name: string;
    category?: {
      // Include category field if it's populated
      name: string;
    };
  };
};

export type ForexSignalCategory = {
  _id: string;
  name: string;
};
