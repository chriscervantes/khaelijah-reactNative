import { Input } from "@mui/material";
import { StyleSheet, TextInput, View } from "react-native";
import UserRegistration from "./pages/login";

export default function App() {
  let x = 1;

  console.log("App executed");
  return (
    <View style={styles.container}>
      <UserRegistration />
    </View>
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
