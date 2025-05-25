import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 16,
  },
  inputContainer: { paddingBottom: 2, paddingTop: 8 },
  input: {
    borderBottomWidth: 0.5,
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: colors.white,
    fontSize: 15,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 2,
  },
  cardContainer: {},
  noData: {
    flex: 1,
    textAlign: "center",
    color: colors.white,
    fontSize: 22,
    fontWeight: "600",
  },
  infoContainer: {},
  error: {
    textAlign: "center",
    color: colors.red,
  },
});
