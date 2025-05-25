import { RatesType } from "./RatesType";

export type ResponseType =
  | ExchangeResponse
  | {
      error: string;
      status: number;
      success: false;
    };

export type ExchangeResponse = {
  base: string;
  date: string;
  rates: RatesType;
  success: true;
  timestamp: number;
};

export function isExchangeResponse(data: any): data is ExchangeResponse {
  return (
    data &&
    typeof data === "object" &&
    typeof data.base === "string" &&
    typeof data.date === "string" &&
    typeof data.success === "boolean" &&
    typeof data.timestamp === "number" &&
    typeof data.rates === "object" &&
    data.rates !== null &&
    Object.values(data.rates).every((rate) => typeof rate === "number")
  );
}
