import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Button from "./components/buttons/Button";
import Input from "./components/inputs/Input";

import JSEncrypt from "node-jsencrypt";

//web: 704352554180-brpb2f1epe5pqgu2cr9bupl6brk2g8qi.apps.googleusercontent.com
//ios: 704352554180-qkkudrjr2n5bihdj33v736u5a2muu9c9.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

async function testAuth() {
  // TODO use actual mirror IP

  // Get public key from server
  let res = await fetch("http://10.0.1.150:8081/api/auth/pub");
  const pubKey = await res.text();

  // Encrypt user password
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey);
  var ct = encrypt.encrypt("test"); // B64 of ciphertext

  // Send auth request to server (w/ encrypted pw) to get API key
  let formData = new FormData();
  formData.append("email", "test");
  formData.append("password", ct);
  res = await fetch("http://10.0.1.150:8081/api/auth", {
    method: "POST",
    body: formData,
  });

  return res.text();
}

export default function App() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "704352554180-brpb2f1epe5pqgu2cr9bupl6brk2g8qi.apps.googleusercontent.com",
    iosClientId:
      "704352554180-qkkudrjr2n5bihdj33v736u5a2muu9c9.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    // Crypto test
    testAuth().then((x) => setResult(x));

    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "System",
              marginBottom: 5,
              color: "white",
            }}
          >
            {" "}
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        </View>
      );
    }
  };

  return <Text style={{ marginTop: 100 }}>{result}</Text>;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <Input style={styles.box}/>  */}

      {user && <ShowUserInfo />}
      {user === null && (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 5,
              fontFamily: "System",

              color: "white",
            }}
          >
            {" "}
            Login To Google
          </Text>
          <Button
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
            title="login"
          ></Button>
        </>
      )}
      {/* <Input/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#89CFF0",
  },
  image: {
    flex: 1,
    opacity: 0.5,
    width: "100%",
    height: "100%",
  },
  text: {
    color: "black",
    fontSize: 34,
    lineHeight: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#3e7fc1",
  },
});
