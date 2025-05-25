import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExchangeResponse } from "../../types/ResponseType";
import { LAST_UPDATE_DATE_KEY } from "../constants/AsyncStorageKeys";

export const getLastUpdateDataStorage: () => Promise<ExchangeResponse | null> = async () => {
  const lastUpdateDate = await AsyncStorage.getItem(LAST_UPDATE_DATE_KEY);
  return lastUpdateDate ? JSON.parse(lastUpdateDate) : null;
};

export const setLastUpdateDataStorage = async (lastUpdateData: ExchangeResponse) => {
  await AsyncStorage.setItem(
    LAST_UPDATE_DATE_KEY,
    JSON.stringify(lastUpdateData)
  );
};

export const removeLastUpdateDataStorage = async () =>
  await AsyncStorage.removeItem(LAST_UPDATE_DATE_KEY);
