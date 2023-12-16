import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";

import { auth } from "../firebase";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import JSEncrypt from "jsencrypt";
import axiosInstance, {
  updateAxiosDefaultHeaders,
} from "../config/axiosConfig";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomePage");
      }
    });
    return unsubscribe;
  }, []);

  const handleEncryptedSignIn = async () => {
    try {
      let response = await axiosInstance.get("/auth/pub");
      const publicKey = await response.data;

      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);

      let encyptedPassword = encrypt.encrypt(password);

      if (typeof encyptedPassword === "string") {
        // Send auth request to server (w/ encrypted pw) to get API key
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", encyptedPassword);

        response = await axiosInstance.post("/auth", formData);

        if (response.status == 200) {
          updateAxiosDefaultHeaders({ "X-API-KEY": response.data });
          navigation.navigate("HomePage", { email: email });
        }
      } else {
        console.log("Encryption Failed");
      }
    } catch (error: any) {
      console.log(error.message);
      console.log(error.response);
      console.log("Error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(pass) => setPassword(pass)}
        />
      </View>

      <View style={styles.buttonContainerRegister}>
        <View style={styles.buttonContainer}>
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: "#1E2F97",
          }}
          style={styles.button}
          onPress={handleEncryptedSignIn}
        >
          Login
        </Button>
        
        {/* <Button
          title="HomePage"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#1E2F97",
          }}
          onPress={() => navigation.navigate("HomePage")}
        /> */}
      </View>
        </View>
        <Button
          title="Register"
          style={styles.buttonRegister}
          buttonStyle={{
            backgroundColor: '#1E2F97',
          }}
          onPress={() => navigation.navigate("RegisterPage")}
        /> 
        
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#effaf6",
  },
  title: {
    fontSize: 35,
    color: "#1E2F97",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#1E2F97",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#1E2F97",
  },
  inputContainer: {
    width: "80%",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#effaf6",
  },
  button: {
    padding: 10,
    width: 150,
    color: "#1E2F97",
    fontSize: 16,
    borderRadius: 12,
    fontWeight: "bold",
  },
  buttonRegister: {
    paddingLeft: 10,
    paddingRight: 10,
    width: 150,
    borderRadius: 12,
    color: "#1E2F97",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainerRegister: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  },
});

export default LoginPage;
