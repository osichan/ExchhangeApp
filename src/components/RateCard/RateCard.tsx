import { Text, TouchableOpacity, View } from "react-native";
import { BookmarkIcon } from "../../assets/svg/BookmarkIcon";
import { styles } from "./styles";

type RateCardProps = {
  item: string;
  coutry: string;
  isFavorite: boolean;
  rate: number;
  onFavorite: () => void;
};

export const RateCard = ({
  item,
  coutry,
  isFavorite,
  rate,
  onFavorite,
}: RateCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item}</Text>
        <Text style={styles.country}>{coutry}</Text>
      </View>
      <View style={styles.rateContainer}>
        <TouchableOpacity onPress={onFavorite}>
          <BookmarkIcon
            isFavorite={isFavorite}
            style={{ marginRight: 0, marginLeft: "auto" }}
          />
        </TouchableOpacity>
        <Text style={styles.rate}>{rate}</Text>
      </View>
    </View>
  );
};
