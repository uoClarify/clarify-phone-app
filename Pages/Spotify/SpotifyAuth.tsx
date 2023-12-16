import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType,useAuthRequest } from "expo-auth-session";
import axiosInstance from "../../config/axiosConfig";
import { Buffer } from 'buffer'
import axios from 'axios'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function SpotifyAuth() {
  const clientID = encodeURIComponent("bc4a51db177443ce9e578fd8b6457d8d");
  const clientSecret = encodeURIComponent("dfb3920cb7be45029d562d35692cb996");
  const redirectURI = "exp://localhost:19006";
  // const redirectURI = "http://localhost:19006"; // used for chrome

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientSecret: clientSecret,
      clientId: clientID,
      scopes: ["user-read-currently-playing"],

      /* To be used in case of future use
      scopes: [
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-modify-playback-state",
      "streaming",
      "user-read-email",
      "user-read-private",],
      */

      usePKCE: false,
      redirectUri: redirectURI,
    },
    discovery
  );


  const getTokensAndSave = async (code: string) => {
    let response;
    // Tansform spotify code to access and refresh tokens
    try {
      let data = new FormData();
      data.append('grant_type', 'authorization_code');
      data.append('code', code);
      data.append('redirect_uri', redirectURI);
      response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectURI
        },
        headers: {
          'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } catch (error) {
      console.error("Error obtaining tokens from Spotify:", error)
      return;
    }
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;
    if (access_token == null || refresh_token == null) {
      console.error("Spotify did not return both tokens:", response.data)
      return;
    }

    // Save tokens to backend
    let data = new FormData();
    data.append("access_token", access_token);
    data.append("refresh_token", refresh_token);
    axiosInstance
      .post("/spotifytoken", data)
      .then((response) => {
        console.log("Server Response:", response.data);
      })
      .catch((error) => {
        console.error("Error sending access token to backend:", error.response);
      })
  }

  React.useEffect(() => {
    if (response == null || response?.type === "cancel") {
      return;
    }

    if (response?.type !== "success") {
      console.error("Error getting Spotify token:", response);
      return;
    }

    if (response?.params.code === undefined) {
      console.error("Spotify reported no error, but token is undefined:", response);
      return;
    }

    const code = response.params.code;
    getTokensAndSave(code);
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Spotify </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
      >
        <Text style={styles.buttonText}> Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#effaf6",
  },
  title: {
    fontSize: 34,

    marginBottom: 20,
    textAlign: "center",
    color: "#1E2F97",
  },
  input: {
    height: 40,
    borderColor: "#1E2F97",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 1,
    paddingLeft: 10,
    color: "#1E2F97",
  },
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: "5%",
    width: "50%",
    backgroundColor: "#1E2F97",
    color: "#effaf6",
  },
  buttonText: {
    fontSize: 20,
    color: "#effaf6",
  },
  inputContainer: {
    width: "75%",
  },
});
