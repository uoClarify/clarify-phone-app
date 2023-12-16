import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';

function CheckBox({ label,checked, onCheckBoxChange, identifier}) {
  const [isEnabled, setIsEnabled] = useState(checked);



  const toggleSwitch = () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);


    
    onCheckBoxChange(identifier, newIsEnabled);
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.font}>{label}({isEnabled ? 'on' : 'off'})  </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#1E2F97' }}
        thumbColor='#fff'
       
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    
    
  },
  font: {
    fontSize: 20,
  }
});

export default CheckBox;
