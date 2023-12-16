import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";

import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native";
import axiosInstance from "../../config/axiosConfig";

interface State {
  items?: AgendaSchedule;
  selectedTime: string;
  selectedDate: string;
  inputText: string;
  isModalVisible: boolean;
  isDatePickerVisible: boolean;
  isTimePickerVisible: boolean;
}

export default class Calendar extends Component<State> {
  state: State = {
    items: undefined,
    isModalVisible: false,
    selectedTime: "",
    selectedDate: "",
    inputText: "",
    isDatePickerVisible: false,
    isTimePickerVisible: false,
  };
  isDatePickerVisible: boolean = false;
  isTimePickerVisible: boolean = false;
  selectedTime: Date | null = null;
  selectedDate: Date | null = null;

  sendToMirror = async () => {
    try {
      const itemsJSON = JSON.parse(JSON.stringify(this.state.items));
      const finalItems = itemsJSON;

      

      const date = new Date();
      const currentMonth = date.getMonth() +1;
      const todaydate = date.getFullYear() + "-" + currentMonth + "-" + date.getDate();

      
      for (const [key, value] of Object.entries(finalItems)) {
        if(key != todaydate){
          delete finalItems[key];
        }
      }



      for (const [key, value] of Object.entries(itemsJSON)) {
        let temp = JSON.parse(JSON.stringify(itemsJSON[key]));
        
        for (const [k2, val2] of Object.entries(temp)) {
          
            value[k2] = val2.name;
          

        }
      }
      
      console.log(finalItems);
      await axiosInstance.post("/calendar/settings", finalItems);

      
    } catch (error) {
      console.error("Error sending calendar:", error);
    }
  };
  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  handleConfirmDate = (date: Date) => {
    const formattedDate = this.formatDate(date);
    this.setState({ selectedDate: formattedDate });
    this.hideDatePicker();
  };
  handleConfirmTime = (time: Date) => {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const formattedTime = hour + ":" + minutes;
    this.setState({ selectedTime: formattedTime });
    this.hideTimePicker();
  };

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  handleTextInput = (text: string) => {
    this.setState({ inputText: text });
  };

  makeNewItem = () => {
    const { selectedDate, inputText, selectedTime } = this.state;

    if (selectedDate && inputText && selectedTime) {
      this.addItemToAgenda(selectedDate, {
        name: selectedTime + "-" + inputText,
        height: 50,
        day: selectedDate,
      });
      this.closeModal();
      this.state.selectedDate = "";
      this.state.inputText = "";
      this.state.selectedTime = "";
    } else {
      Alert.alert("Please select a date and enter text.");
    }
  };
  addItemToAgenda = (date: string, newItem: AgendaEntry) => {
    const { items } = this.state;
    const updatedItems = { ...items };

    if (!updatedItems[date]) {
      updatedItems[date] = [];
    }

    updatedItems[date].push(newItem);

    this.setState({
      items: updatedItems,
    });
  };
  getFullDate = () => {
    const date = new Date().toLocaleDateString();
    return date;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
        />

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>
            <View style={styles.datePickerContainer}>
              <Button title="Select Date" buttonStyle={styles.modalButtonText} onPress={this.showDatePicker} />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirmDate}
                onCancel={this.hideDatePicker}
                style={styles.datePicker}
              />
            </View>

            <View>

              <Button title = "Pick a Time" onPress={this.showTimePicker} buttonStyle={styles.modalButtonText}/>
            
              <DateTimePickerModal
                isVisible={this.state.isTimePickerVisible}
                mode="time"
                style={styles.datePicker}
                onConfirm={this.handleConfirmTime}
                onCancel={this.hideTimePicker}
              />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {this.state.selectedDate ? (
                <Text style={{ fontSize: 18 }}>{this.state.selectedDate}</Text>
              ) : (
                <Text style={{ fontSize: 14 }}>Date Not Selected</Text>
              )}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {this.state.selectedTime ? (
                <Text style={{ fontSize: 18 }}>{this.state.selectedTime}</Text>
              ) : (
                <Text style={{ fontSize: 14 }}>Time Not Selected</Text>
              )}
            </View>

            <TextInput
              placeholder="Enter text"
              value={this.state.inputText}
              onChangeText={this.handleTextInput}
              style={styles.textInput}
            />

            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={styles.modalButtonText}
                title="Cancel"
                onPress={this.closeModal}
              />
              <Button
                buttonStyle={styles.modalButtonText}
                title="Save"
                onPress={this.makeNewItem}
              />
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.addNew} onPress={this.openModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendToMirrorButton}
          onPress={() => this.sendToMirror()}
        >
          <Text style={styles.buttonText2}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  loadItems = (day: DateData) => {
    const items = this.state.items || {};
    const currentDate = new Date(day.dateString);

    const newItems = {};

    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });

    this.setState({
      items: newItems,
    });
  };

  renderDay = (day: Date) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()} </Text>;
    }
    return <View style={styles.dayItem}></View>;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = 16;
    const color = "black";

    return (
      <TouchableOpacity style={[styles.item, { height: 50 }]}>
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green",
  },
  dayItem: {
    marginLeft: 34,
    fontSize: 24,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePicker: {
    backgroundColor: "white",
  },
  addNew: {
    backgroundColor: "#1E2F97",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",

    bottom: 20,
    left: 20,
  },
  buttonText: {
    fontSize: 40,
    color: "white",
  },
  modalButtonText: {
    backgroundColor: "#1E2F97",
  },

  buttonText2: {
    fontSize: 20,
    color: "white",
  },
  sendToMirrorButton: {
    backgroundColor: "#1E2F97",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",

    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
