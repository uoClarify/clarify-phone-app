import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import axiosInstance, { updateAxiosDefaultURL } from "../config/axiosConfig";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function BarcodeScannerComponent() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = async ({
    type,
    data,
  }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    try {
      let dataForm = new FormData();
      dataForm.append("barcodeData ", data);

      const url = `http://${data}/api/server-info`;
      const response = await axiosInstance.get(url);

      if (response.status === 200) {
        updateAxiosDefaultURL(`http://${data}/api`);
        navigation.navigate('LoginPage')
      } else {
        alert("Failed to send data to the backend.");
      }

      // Handle the response from your backend here (e.g., success or error handling).
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      // Handle the error here.
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
      
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Text style={styles.buttonText}> Login Page</Text>
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    alignItems: "flex-end", // Align items at the right
    paddingTop: 20, // Optional: Add some top padding to create space
    paddingRight: 20,
  },
  scanButton: {
    padding: 15,
    backgroundColor: "#1E2F97",
    color: "#effaf6",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#effaf6",
  },
});
