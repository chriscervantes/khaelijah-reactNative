import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native";

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export function HomePage({ navigation }: any) {
  return (
    <>
      <Button
        title="Register User"
        onPress={() => navigation.navigate("UserRegistration")}
      />
    </>
  );
}
