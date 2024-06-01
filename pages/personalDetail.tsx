import { StyleSheet, View, Text } from "react-native";
export function PersonalDetail({ route }: any) {
  const params = route.params;

  return (
    <View style={styles.display}>
      <Text>{params.accountName}</Text>
      <Text>{params.firstName}</Text>
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
