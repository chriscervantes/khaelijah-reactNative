import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { HttpMethod } from "../types";
import { ItemData } from "./showAllUsers";

export function PersonalDetail({ route }: any) {
  const params = route.params;

  let data: ItemData | undefined;

  useEffect(() => {
    const fetchUsers = async () =>
      await fetch(`http://localhost:5235/api/consumer/${params.id}`, {
        method: HttpMethod.Get,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData: ItemData) => {
          const user = JSON.parse(JSON.stringify(responseData));

          data = {
            id: user.id,
            accountName: user.accountName,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            mobile: user.mobile,
          };
        })
        .catch((error) => {
          alert(`error fetching ${error}`);
        });

    fetchUsers();
  });

  alert(`test ${data}`);

  return (
    <View style={styles.display}>
      <Text>{data?.accountName}</Text>
      <Text>{data?.firstName}</Text>
      <Text>{params.lastName}</Text>
      <Text>{params.birthDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
});
