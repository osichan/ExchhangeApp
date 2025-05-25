import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";
type LoaderProps = {
  isLoading: boolean;
  isDataLoaded?: boolean;
  onRefresh?: () => void;
  children: React.ReactNode;
};

export const Loader = ({
  isLoading,
  isDataLoaded,
  onRefresh,
  children,
}: LoaderProps) => {
  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={"#fff"} size={50} />
      </View>
    );
  if (!isDataLoaded)
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onRefresh}>
          <Text style={styles.text}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  return <>{children}</>;
};
