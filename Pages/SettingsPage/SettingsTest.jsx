import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDown from "./DropDown";
import CheckBox from "./CheckBox";
import axiosInstance from "../../config/axiosConfig";
import TextInputBox from "./TextInputBox";

import Button from "react-native-elements";

// const TextInput = ({ label, boolValue }) => (
//   <View style={styles.textinputcontainer}>
//     <Text style={styles.textDisplay}>{label}: </Text>
//     <Text style={styles.textDisplay}> {boolValue ? "true" : "false"}</Text>
//   </View>
// );

const SettingsTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/settings/get");
  

      
      const dat = response.data;

      for(const [key,value] of Object.entries(dat)){
        value.hide[3] = false;
      }


      setData(dat);
      setLoading(false);




    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  



  const handleCheckBoxChange = (label, newValue) => {
    console.log(`${label} checkbox changed to ${newValue}`);
    updateData(label, newValue, data);

    
    
  };

  const handleDropDownChange = (label, newValue) => {
    console.log(`${label} dropdown changed to ${newValue}`);
    for (const [key, value] of Object.entries(data)) {
      
      if (key === label) {
        value.timeFormat[3] = newValue;
    
        setData(data);
        break;
      }
    }
  };

  const handleTextInputChange = (label, newValue) => {
    console.log(`${label} City changed to ${newValue}`);
    
    for (const [key, value] of Object.entries(data)) {
   
      if (key === label) {
      
          value.location[3] = newValue;
    
        setData(data);
        break;
      }
    }
 
  };

  const updateData = (label, newValue, currentData = data) => {
    for (const [key, value] of Object.entries(currentData)) {
      
      if (key === label) {

        
      
          value.hide[3] = Boolean(newValue);
      
    
        console.log(currentData)
        setData(currentData);
        break;
      }
    }
  
 

  };



  const renderComponent = (type, props) => {
    switch (type) {
      case "bool":
        return <CheckBox {...props} />;
      case "text":
        return <TextInputBox {...props} />;
      case "option":
        return <DropDown {...props} />;
      default:
        return null;
    }
  };

  const handleUpdate = async () => {
    
    
    try {
      const finalData = JSON.parse(JSON.stringify(data));
      for(const [widgetName, settings] of Object.entries(finalData)){
          for(const [key, value] of Object.entries(settings)){
            
            finalData[widgetName][key] = value[3];
            // console.log(finalData[widgetName][key].value);


          }


      }
      console.log(finalData)
      
      await axiosInstance.post("/settings/update", finalData);

      
      
      
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  return (
    <>
    <TouchableOpacity style={styles.button}
      onPress = {handleUpdate}
      >
        <Text style={styles.buttonText}>
          Update Settings
        </Text>
      </TouchableOpacity>
    <ScrollView>
      <View>
        {!loading && data ? (
          Object.entries(data).map(([key, value]) => (
            <View style={styles.blocks} key={key}>
              <Text style={styles.header}>{key}</Text>
              {typeof value === "object" && value !== null ? (
                Object.entries(value).map(([subKey, subValue]) => {
                  const [label, fieldType, fieldOptions, fieldValue] = subValue;
                  let identifier = key;

                  const props = {
                    label,
                    options: fieldOptions,
                    boolValue: fieldValue,
                    key: subKey,
                    identifier: identifier,
                    onCheckBoxChange: handleCheckBoxChange,
                    onDropDownChange: handleDropDownChange,
                    onTextInputChange: handleTextInputChange,
                  };

                  return renderComponent(fieldType, props);
                })
              ) : (
                <Text>Invalid data structure</Text>
              )}
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      

      
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textinputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textDisplay: {
    fontSize: 20,
  },
  blocks: {
    height: 150,
    margin: 5,

    backgroundColor: "#fff",
    borderWidth: 3,

    borderColor: "#1E2F97",
    borderRadius: 50,
  },
  header: {
    fontSize: 25,
    margin: 15,
    fontWeight: "light",
    color: "#1E2F97",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',

  },
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: "5%",
    width: "50%",
    backgroundColor: "#1E2F97",
    color: "#effaf6",

  
  },

  buttonText: {
    fontSize: 20,
    color: '#FFF',
  },
  
});

export default SettingsTest;



/*

    /*
    useEffect(() => {
        const initialData = {
            clock: {
                hide: ["Hide", "bool", [], false],
                timeFormat: [
                    "Time formatting",
                    "option",
                    ["24H", "12H AM/PM"],
                    "24H",
                ],
            },
            weather: {
                hide: ["Hide", "bool", [], false],
                location: ["Weather location", "text", [], "Ottawa"],
            },
            calendar: {
                hide: ["Hide", "bool", [], false],
            },
            spotify: {
                hide: ["Hide", "bool", [], false],
            },
            youtube: {
                hide: ["Hide", "bool", [], false],
            },
        };
        setData(initialData);
        setLoading(false);
    }, []);
    */
