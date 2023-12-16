import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

interface RouteParams {
  email: string;
}

const HomePage: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const userName = (route.params as RouteParams)?.email;
  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginPage");
      })
      .catch((error) => alert(error.message));
  };

  const goToCalendar = () => {
    navigation.navigate("Calendar");
  };
  const goToYoutubePlaylist = () => {
    navigation.navigate("YoutubePlaylist");
  };
  const goToSpotify = () => {
    navigation.navigate("SpotifyAuth");
  };
  const goToSettings = () => {
    navigation.navigate('SettingsTest');
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.home}>Welcome {userName}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={goToYoutubePlaylist}>
            <Text style={styles.buttonText}>Youtube</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToCalendar} style={styles.button}>
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToSpotify} style={styles.button}>
            <Text style={styles.buttonText}>Spotify</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToSettings} style={[styles.settingsButton, { position: 'absolute', top: 50, right: 10 }]}>
          <Icon name="settings" type="material" color="#517fa4" size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#effaf6",
    position: "relative",
  },
  settingsButton: {
    padding: 10,
    borderRadius: 5,
  },
  home: {
    fontSize: 34,

    marginBottom: 20,
    textAlign: "center",
    color: "#1E2F97",
  },
  row: {
    flexDirection: "row",
    height: "15%",
    width: "80%",
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    backgroundColor: "#1E2F97",
  },
  buttonText: {
    fontSize: 20,
    color: "#effaf6",
  },
});

export default HomePage;
