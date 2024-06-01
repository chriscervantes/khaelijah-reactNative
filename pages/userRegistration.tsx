import { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";

export default function UserRegistration({ navigation }: any) {
  const [accountName, setAccountName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  async function ButtonSubmit() {
    alert(
      `I will save this ${accountName} | ${firstName} | ${lastName} |  ${mobile}}`
    );

    createUser({ accountName, firstName, lastName, mobile, navigation });
  }

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Account Name"
        onChangeText={(text: string) => setAccountName(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text: string) => setFirstName(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text: string) => setLastName(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        onChangeText={(text: string) => setMobile(text)}
      ></TextInput>

      <Text style={styles.divider} />
      <Button title="Submit" onPress={ButtonSubmit} />
    </>
  );
}

type UserRegistrationPayload = {
  accountName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  mobile: string;
  navigation?: any;
};

enum HttpMethod {
  Post = "POST",
  Get = "GET",
}

async function createUser({
  accountName,
  firstName,
  lastName,
  mobile,
  navigation,
}: UserRegistrationPayload) {
  const baseUrl = process.env.API_BASE_URL;

  // setRandom(Math.random());
  const bodyRequest = {
    accountName: accountName,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
  };

  alert(baseUrl);
  try {
    const response = await fetch(`http://localhost:5235/api/consumer`, {
      method: HttpMethod.Post,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });
    const responsJson = await response.json();
    const transformJson: UserRegistrationPayload = JSON.parse(
      JSON.stringify(responsJson)
    );
    alert(`user successfully created ${JSON.stringify(responsJson, null, 3)}`);

    navigation.navigate("PersonalDetails", {
      accountName: transformJson.accountName,
      firstName: transformJson.firstName,
      lastName: transformJson.lastName,
      birthDate: transformJson.birthDate,
    });
  } catch (error) {
    alert(`error something ${error}`);
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  divider: {
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
    width: "80%",
    margin: 20,
  },
});
