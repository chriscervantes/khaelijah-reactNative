import { StyleSheet, View } from "react-native";
import UserRegistration from "./pages/userRegistration";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./pages/homePage";
import { PersonalDetail } from "./pages/personalDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  let x = 1;

  console.log("App executed");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Khaelijah App" }}
        />
        <Stack.Screen name="UserRegistration" component={UserRegistration} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 1,
  },
});
function createStackNavigator() {
  throw new Error("Function not implemented.");
}
