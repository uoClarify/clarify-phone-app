import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Button from "./components/buttons/Button";
import Input from "./components/inputs/Input";

//web: 704352554180-brpb2f1epe5pqgu2cr9bupl6brk2g8qi.apps.googleusercontent.com
//ios: 704352554180-qkkudrjr2n5bihdj33v736u5a2muu9c9.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "704352554180-brpb2f1epe5pqgu2cr9bupl6brk2g8qi.apps.googleusercontent.com",
    iosClientId:
      "704352554180-qkkudrjr2n5bihdj33v736u5a2muu9c9.apps.googleusercontent.com",
  });

  React.useEffect(() => {
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
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
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
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Georgia', fontSize: 40, flex: 0.5, justifyContent: 'center', alignItems: 'center'}}> Clarify </Text> 
      <StatusBar style="auto" />

      <Input style={styles.box}/> 

      {user && <ShowUserInfo />}
      {user === null && (
        <>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}> Welcome</Text>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              marginBottom: 20,
              color: "gray",
            }}
          >
            {" "}
            Please login
          </Text>
          <Button
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
            title="login"
          >
          </Button>
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
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#3e7fc1",
  },
});
