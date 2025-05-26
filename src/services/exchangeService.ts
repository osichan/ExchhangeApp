import axios, { AxiosError } from "axios";
import { isExchangeResponse, ResponseType } from "../types/ResponseType";
import { API_ACCESS_KEY } from "@env";

export const getExchangeRate: () => Promise<ResponseType> = async () => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${API_ACCESS_KEY}` // ✅ Correct usage
    );
    if (
      response?.data?.success &&
      response?.data &&
      isExchangeResponse(response.data)
    ) {
      return response.data;
    }

    console.log(response.data.error.info);

    return {
      error: response.data.error.info || "Something went wrong",
      status: 500,
      success: false,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        error: e.message,
        status: e.response?.status ?? 500,
        success: false,
      };
    }
    return {
      error: "Something went wrong",
      status: 500,
      success: false,
    };
  }
};
