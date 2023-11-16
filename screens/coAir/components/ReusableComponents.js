import React, { useState, createContext, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, TouchableOpacity, Text } from "react-native";

//------------ STYLE ------------//

import input from "../../../styles/inputs";
import button from "../../../styles/buttons";
//-------------------------------//

const GlobalStateContext = createContext();
export const useGlobalState = () => useContext(GlobalStateContext);
export const GlobalStateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState("");
  const [depth, setDepth] = useState("");
  return (
    <GlobalStateContext.Provider
      value={{ date, setDate, minutes, setMinutes, depth, setDepth }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
//------- TRAITEMENT -------//
const convertInput = (value) => {
  return value
    .replace(",", ".")
    .replace(";", ".")
    .replace("-", ".")
    .replace(" ", ".");
};
//--------------------------//

export const DatePickerComponent = ({ onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handlePress = () => {
    setShowPicker(true);
  };
  return (
    <>
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={"time"}
          display="default"
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) {
              onDateChange(date);
            }
          }}
          is24Hour={true} // Utiliser le format 24h selon votre besoin
        />
      )}
      <TouchableOpacity style={button.button} onPress={handlePress}>
        <Text style={button.buttonText}>Choisir une heure</Text>
      </TouchableOpacity>
    </>
  );
};

export const MinutesInputComponent = () => {
  const { minutes, setMinutes } = useGlobalState();
  const handleMinutesChange = (text) => {
    const normalizedText = convertInput(text);
    setMinutes(normalizedText);
  };
  return (
    <TextInput
      style={input.inputCoAir}
      value={String(minutes)}
      keyboardType="numeric"
      onChangeText={handleMinutesChange}
    />
  );
};

export const DepthInputComponent = () => {
  const { depth, setDepth } = useGlobalState();
  const handleDepthChange = (text) => {
    const normalizedText = convertInput(text);
    setDepth(normalizedText);
  };

  return (
    <TextInput
      style={input.inputCoAir}
      value={depth}
      keyboardType="numeric"
      onChangeText={handleDepthChange}
    />
  );
};
