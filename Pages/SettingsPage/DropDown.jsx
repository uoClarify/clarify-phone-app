import Picker from "react-native-picker-select";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const DropDown = ({ label, options, boolValue, onDropDownChange, identifier }) => {
  const [selected, setSelected] = useState(boolValue);

  const pickerItems = options.map((option, index) => ({
    label: option.toString(),
    value: option,
    key: index.toString(),
  }));

  const handleChange = (value) => {
    setSelected(value);
    
    onDropDownChange(identifier, value);
    
  };

  return (
    <View style={styles.Container}>
      <Picker
        value={selected}
        items={pickerItems}
        onValueChange={handleChange}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    margin: 5,
  },
  inputAndroid: {
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    margin: 5,
  },
});

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
});

export default DropDown;
