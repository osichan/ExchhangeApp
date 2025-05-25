import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { StarIcon } from "./src/assets/svg/StarIcon";
import FavoriteScreen from "./src/screens/FavoriteScreen/FavoriteScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { RootStackParamList } from "./src/types/navigation";

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Exchange App",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("FavoriteScreen")}
              >
                <StarIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={{ title: "Favorites" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
