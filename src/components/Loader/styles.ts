import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.white,
    width: 120,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: { color: colors.black, fontSize: 20 },
});
