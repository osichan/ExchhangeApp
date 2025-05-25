import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TextInput, View } from "react-native";
import { Loader } from "../../components/Loader/Loader";
import { RateCard } from "../../components/RateCard/RateCard";
import { getExchangeRate } from "../../services/exchangeService";
import { RatesType } from "../../types/RatesType";
import { ALL_COUNTRIES } from "../../utils/constants/AllCoutries";
import {
  addFavoriteStorage,
  getFavoritesStorage,
} from "../../utils/helpers/FavoritesStorage";
import {
  getLastUpdateDataStorage,
  setLastUpdateDataStorage,
} from "../../utils/helpers/LastCurrencies";
import { styles } from "./styles";
import { dateFormater } from "../../utils/helpers/dateFormater";

const HomeScreen = () => {
  const [allRates, setAllRates] = useState<RatesType | null>(null);
  const [filteredRates, setFilteredRates] = useState<RatesType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [isLastUpdated, setIsLastUpdated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getFavorites = async () => {
    const favorites = await getFavoritesStorage();
    if (!favorites) return;
    setFavorites(favorites);
  };

  const onFavorite = async (code: string) => {
    await addFavoriteStorage(code);
    setFavorites((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code]
    );
  };

  const getLastUpdatedDate = async () => {
    const lastUpdateDate = await getLastUpdateDataStorage();
    if (lastUpdateDate) {
      setAllRates(lastUpdateDate.rates);
      setFilteredRates(lastUpdateDate.rates);
      setDate(dateFormater(lastUpdateDate.timestamp));
      setIsLastUpdated(false);
      return lastUpdateDate;
    }
    return null;
  };
  const getNewData = async () => {
    setError("");
    const response = await getExchangeRate();
    if (response.success) {
      setAllRates(response.rates);
      setFilteredRates(response.rates);
      setIsLastUpdated(true);
      await setLastUpdateDataStorage(response);
      setDate(dateFormater(response.timestamp));
    } else {
      setError(response.error);
    }
    return response;
  };

  const getData = async () => {
    setIsLoading(true);
    getFavorites();
    const response = await getNewData();
    if (!response.success) {
      await getLastUpdatedDate();
    }
    setIsLoading(false);
  };

  const filterRates = useCallback(() => {
    if (!allRates) return setFilteredRates(null);

    if (search.trim() === "") {
      setFilteredRates(allRates);
    } else {
      const lowerSearch = search.toLowerCase();

      const filtered = Object.keys(allRates).filter((code) => {
        const countryName =
          ALL_COUNTRIES[code as keyof typeof ALL_COUNTRIES] ?? "";
        return (
          code.toLowerCase().includes(lowerSearch) ||
          countryName.toLowerCase().includes(lowerSearch)
        );
      });

      const filteredRatesObj: RatesType = {};
      filtered.forEach((code) => {
        filteredRatesObj[code] = allRates[code];
      });

      setFilteredRates(filteredRatesObj);
    }
  }, [allRates, search]);

  useEffect(() => {
    filterRates();
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Loader
        isLoading={isLoading}
        isDataLoaded={!!allRates}
        onRefresh={getData}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={search}
            style={styles.input}
            placeholder="Search by code or country name"
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.date}>{`${
            isLastUpdated ? "" : "Last updated: "
          } ${date}`}</Text>
        </View>
        {filteredRates && Object.keys(filteredRates).length !== 0 ? (
          <View style={styles.cardContainer}>
            <FlatList
              data={Object.keys(filteredRates)}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={getNewData} />
              }
              renderItem={({ item }) => (
                <RateCard
                  item={item}
                  coutry={
                    ALL_COUNTRIES.hasOwnProperty(item)
                      ? ALL_COUNTRIES[item as keyof typeof ALL_COUNTRIES]
                      : ""
                  }
                  isFavorite={favorites.includes(item)}
                  rate={filteredRates[item]}
                  onFavorite={() => onFavorite(item)}
                />
              )}
            />
          </View>
        ) : (
          <Text style={styles.noData}>No data</Text>
        )}
      </Loader>
    </View>
  );
};

export default HomeScreen;
