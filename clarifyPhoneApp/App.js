import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/buttons/Button';
import Input from './components/inputs/input';

export default function App() {
  return (
    <View style={styles.container}>

      <Text> Clarify </Text>
      <StatusBar style="auto" />
      {/* <Button> Login</Button> */}
      <Input/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1 ,
    opacity: 0.5,
    width:'100%',
    height:'100%',
  },
  text: {
    color: 'black',
    fontSize: 34,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#3e7fc1',
  },
});
