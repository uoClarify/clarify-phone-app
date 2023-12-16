import { StyleSheet} from "react-native";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Calendar from "./Pages/Calendar/Calendar";
import RegisterPage from "./Pages/RegisterPage";
import YoutubePlaylist from "./Pages/YoutubePlaylist/YoutubePlaylist";
import SpotifyAuth from "./Pages/Spotify/SpotifyAuth";
import BarcodeScannerComponent from "./Pages/BarcodeScannerComponent";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";

import SettingsTest from "./Pages/SettingsPage/SettingsTest";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type StackParams = {
  LandingPage: { name: "LandingPage" };
  LoginPage: { name: "LoginPage" };
  HomePage: { name: "HomePage" };
  Calendar: { name: "Calendar" };
  YoutubePlaylist: { name: "YoutubePlaylist" };
  SpotifyAuth: { name: "SpotifyAuth" };
  RegisterPage: { name: "RegisterPage" };
  BarcodeScannerComponent: { name: "BarcodeScannerComponent"}
  SettingsTest: {name: 'SettingsTest'}
};
const Stack = createStackNavigator<StackParams>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegisterPage"
          component={RegisterPage}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#effaf6",
            },
          }}
        />

        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#effaf6",
            },
          }}
        />
        <Stack.Screen
          name="YoutubePlaylist"
          component={YoutubePlaylist}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#effaf6",
            },
          }}
        />
        <Stack.Screen
          name="SpotifyAuth"
          component={SpotifyAuth}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#effaf6",
            },
          }}
        />
        <Stack.Screen
          name = "BarcodeScannerComponent"
          component={BarcodeScannerComponent}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#effaf6",
            },
          }}
        />
        <Stack.Screen
          name = "SettingsTest"
          component={SettingsTest}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#effaf6",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
