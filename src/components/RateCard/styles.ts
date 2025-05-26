import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 16,
  },
  cardContainer: {},
  card: {
    backgroundColor: colors.white,
    flexDirection: "row",
    marginVertical: 8,
    justifyContent: "space-between",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  titleContainer: {
    justifyContent: "space-between",
  },
  rateContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
  },
  country: {},
  rate: {
    marginVertical: "auto",
    fontSize: 18,
    fontWeight: "600",
    marginTop: "auto",
    marginBottom: 0,
  },
});
