import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'
import { Input } from 'react-native-elements'


function TextInputBox({ label, boolValue, onTextInputChange, identifier }) {
  const[currentLocation, setCurrentLocation ] = useState(boolValue)

 

  const handleButtonPress = () =>{
   
    onTextInputChange(identifier, currentLocation);
  };

  const handleTextChange = (val) =>{
    setCurrentLocation(val);
    
   
  };
  
  
  return (
    <View style={styles.container}>
        <View style = {styles.inputView}>
        <Input onChangeText={handleTextChange}  value={currentLocation} style = {styles.input}/>
        </View>
        
        <TouchableOpacity style = {styles.button} onPress={handleButtonPress} >
          <Text style = {styles.buttonText}>Submit</Text>
          </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    width: '80%',

  },
  input: {
    paddingLeft: 10,
    
  },
  inputView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    width: 50,
    paddingLeft: 20,
  },
  button: {
    
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      height: 30,
      width: "30%",
      backgroundColor: "#1E2F97",
      color: "#effaf6",
  
  },
  buttonText: {
    fontSize: 20,
    color: "#effaf6",
  },

});
export default TextInputBox


/*

<View style={styles.container}>
        <Text style = {{textAlign: 'center'}}>{label}: </Text>
        <Input value={currentLocation} onChange={handleTextChange} style = {styles.input}/>
    </View>

*/