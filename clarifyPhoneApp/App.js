import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Input from './Components/input.js';


const App =()=> {
  
  return (
    <View style ={styles.container}>
      <Input/>
    </View>
    
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


