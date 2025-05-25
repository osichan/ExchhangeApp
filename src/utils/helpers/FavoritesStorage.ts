import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITE_COUNTRIES_KEY } from "../constants/AsyncStorageKeys";

export const getFavoritesStorage: () => Promise<string[] | null> = async () => {
  const favorites = await AsyncStorage.getItem(FAVORITE_COUNTRIES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const setFavoritesStorage = async (favorites: string[]) => {
  await AsyncStorage.setItem(FAVORITE_COUNTRIES_KEY, JSON.stringify(favorites));
};

export const addFavoriteStorage = async (favorite: string) => {
  const favorites = await getFavoritesStorage();
  if (!favorites) {
    await AsyncStorage.setItem(
      FAVORITE_COUNTRIES_KEY,
      JSON.stringify([favorite])
    );
    return;
  }

  if (favorites.includes(favorite)) {
    await AsyncStorage.setItem(
      FAVORITE_COUNTRIES_KEY,
      JSON.stringify(favorites.filter((item) => item !== favorite))
    );
  } else {
    await AsyncStorage.setItem(
      FAVORITE_COUNTRIES_KEY,
      JSON.stringify([...favorites, favorite])
    );
  }
};

export const removeFavoritesStorage = async () =>
  await AsyncStorage.removeItem(FAVORITE_COUNTRIES_KEY);
