import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LandingPage({ navigation }: {navigation:any}){
  const {navigate} = navigation;
  setTimeout(() => {
      navigate('BarcodeScannerComponent'); 
  }, 2000); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clarify </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#effaf6',
  },
  title: {
    fontSize: 30,
    color: "#1E2F97",
    marginBottom: 20
  },   
});

export default LandingPage;
