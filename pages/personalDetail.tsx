import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { HttpMethod } from "../types";
import { ItemData } from "./showAllUsers";

export function PersonalDetail({ route }: any) {
  const params = route.params;
  const [user, setUser] = useState<ItemData>();
  let data: ItemData | undefined;

  useEffect(() => {
    const fetchUser = async () => {
      let response;
      let userResponse: ItemData | undefined = undefined;
      try {
        response = await fetch(
          `http://localhost:5235/api/consumer/${params.id}`,
          {
            method: HttpMethod.Get,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        userResponse = (await response.json()) as ItemData;
      } catch (error) {
        alert(`error fetching the data ${error}`);
      }

      setUser(userResponse);
    };
    fetchUser();
  }, []);

  let birthdate = "";
  if (user && user.birthDate) {
    birthdate = `${new Date(user.birthDate).getDay()}/${new Date(
      user.birthDate
    ).getMonth()}/${new Date(user.birthDate).getFullYear()}`;
  }

  return (
    <View style={{ backgroundColor: "#fff0", paddingTop: 10 }}>
      <TextInput
        style={{ ...styles.text }}
        value={user?.accountName}
      ></TextInput>
      <Text style={styles.text}>{user?.accountName}</Text>
      <Text style={{ ...styles.text, fontSize: 16 }}>{user?.firstName}</Text>
      <Text style={{ ...styles.text }}>{user?.lastName}</Text>
      <Text style={{ ...styles.text }}>{birthdate}</Text>
      <View style={{ ...styles.button }}>
        <Button title="Update"></Button>

        <Button title="Delete"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  text: {
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 15,
    color: "#0099cc",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
