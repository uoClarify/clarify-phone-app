import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import axiosInstance from "../../config/axiosConfig";

function YoutubePlaylist() {
  const [playlist, setPlaylist] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);

  const handleSendRequest = () => {
    if (isValidUrl) {
 
      let data = new FormData();
      data.append("url", playlist);

      axiosInstance
        .post("/youtube", data)
        .then((response) => {
       
          console.log("Server Response:", response.data);
        })
        .catch((error) => {
        
          console.error("Error:", error);
        });
    }
  };
  const handleInputChange = (text: string) => {
    setPlaylist(text);
    validateUrl(text);
  };
  const validateUrl = (url: string) => {
    // Regular expression to match YouTube playlist URLs
    const youtubePlaylistRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)$/;

    if (youtubePlaylistRegex.test(url)) {
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Youtube Playlist</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter YouTube Playlist URL"
          onChangeText={handleInputChange}
          value={playlist}
          style={styles.input}
        />
      </View>

      <View
        style={{
          height: "3%",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <Text
          style={{
            opacity: !isValidUrl && playlist ? 1 : 0,
            color: "red",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Please enter a valid YouTube playlist URL.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendRequest}
        disabled={!isValidUrl}
      >
        <Text style={styles.buttonText}>Send Playlist</Text>
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
export default YoutubePlaylist;
