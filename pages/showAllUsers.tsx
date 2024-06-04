import {
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  FlatList,
  Animated,
  Button,
} from "react-native";
import { HttpMethod } from "../types";
import { useEffect, useReducer, useRef, useState } from "react";

const SPACING = 20;
const ITEM_SIZE = 70 + SPACING * 3;

export type ItemData = {
  id: number;
  accountName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  mobile: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text
      style={[styles.title, { color: textColor }]}
    >{`${item.id} ${item.firstName} ${item.lastName}`}</Text>
  </TouchableOpacity>
);

export function ShowAllUsers({ navigation }: any) {
  const [selectedId, setSelectedId] = useState<number>();
  let listOfUsers: ItemData[] = [];
  let data: ItemData[] = [];
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUsers = async () =>
      await fetch(`http://localhost:5235/api/consumer`, {
        method: HttpMethod.Get,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData: ItemData[]) => {
          listOfUsers = JSON.parse(JSON.stringify(responseData));

          listOfUsers.forEach((user) => {
            data.push({
              id: user.id,
              accountName: user.accountName,
              firstName: user.firstName,
              lastName: user.lastName,
              birthDate: user.birthDate,
              mobile: user.mobile,
            });
          });
        })
        .catch((error) => {
          alert(`error fetching ${error}`);
        });

    fetchUsers();
  });

  // const renderItem = ({ item }: { item: ItemData }) => {
  //   const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
  //   const color = item.id === selectedId ? "white" : "black";

  //   return (
  //     <Item
  //       item={item}
  //       onPress={() => {
  //         // navigate to next page
  //         setSelectedId(item.id);
  //       }}
  //       backgroundColor={backgroundColor}
  //       textColor={color}
  //     />
  //   );
  // };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                ...styles.animatedView,
                transform: [{ scale }],
                opacity: opacity,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "700" }}>
                {item.accountName}
              </Text>
              <Text style={{ fontSize: 18, opacity: 0.7, marginLeft: 15 }}>
                {item.firstName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  marginLeft: 15,
                  color: "#0099cc",
                }}
              >
                {item.lastName}
              </Text>
              <Button
                title="Show Details"
                onPress={() => {
                  navigation.navigate("PersonalDetails", { id: item.id });
                }}
              ></Button>
            </Animated.View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
    </View>
  );
}

// async function fetchAllUsers() {
//   try {
//     const response = await fetch(`http://localhost:5235/api/consumer`, {
//       method: HttpMethod.Get,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });

//     const responseJson = await response.json();
//     const allUsers = JSON.parse(JSON.stringify(responseJson));
//   } catch (error) {}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$fff",
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  animatedView: {
    flexDirection: "row",
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: SPACING,
  },
});
