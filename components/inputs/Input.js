import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Button from "../buttons/Button";

class Inputs extends Component {
  submitBtn = "Submit";
  state = {
    email: "",
    password: "",
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  login = (email, pass) => {
    alert("email: " + email + " password: " + pass);
  };
  render() {
    return (
      <View style={styles.container}>

        <Text style={{
        fontFamily: 'San Francisco', 
        fontSize: 50, 
        flex: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center',
        }}> Clarify </Text> 


        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="gray"
          
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <Button onPress={() => this.login(this.state.email, this.state.password)} title={this.submitBtn}></Button>
      </View>
    );
  }
}
export default Inputs;
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    
    
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#783300",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 60,
    height: 40,
  },
  submitButtonText: {
    fontFamily: "San Francisco",
    color: "white",
  },
});
