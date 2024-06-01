import { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from "react-native";

const baseUrl = process.env.baseUrl;

export default function UserRegistration() {
  const [accountName, setAccountName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  async function ButtonSubmit() {
    alert(
      `I will save this ${accountName} | ${firstName} | ${lastName} |  ${mobile}}`
    );
    createUser({ accountName, firstName, lastName, mobile });
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
      <Button title="Submit" onPress={ButtonSubmit} />
    </>
  );
}

type UserRegistrationPayload = {
  accountName: string;
  firstName: string;
  lastName: string;
  mobile: string;
};

async function createUser({
  accountName,
  firstName,
  lastName,
  mobile,
}: UserRegistrationPayload) {
  enum HttpMethod {
    Post = "POST",
    Get = "GET",
  }

  // setRandom(Math.random());
  const bodyRequest = {
    accountName: accountName,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
  };

  const response = await fetch(`${baseUrl}api/consumer`, {
    method: HttpMethod.Post,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyRequest),
  });

  if (response.status === 200) {
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
