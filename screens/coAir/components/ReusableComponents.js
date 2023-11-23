import React, { useState, createContext, useContext, useEffect } from "react";
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
          is24Hour={true}
        />
      )}
      <TouchableOpacity style={button.button} onPress={handlePress}>
        <Text style={button.buttonText}>Choisir une heure</Text>
      </TouchableOpacity>
    </>
  );
};
export const MinutesInputComponent = ({ onMinutesChange, workDuration }) => {
  const { setMinutes } = useGlobalState();
  const [localMinutes, setLocalMinutes] = useState(String(workDuration));
  useEffect(() => {
    setLocalMinutes(String(workDuration));
  }, [workDuration]);
  const handleMinutesChange = (text) => {
    const normalizedText = convertInput(text);
    setLocalMinutes(normalizedText);
    onMinutesChange(normalizedText);
  };
  return (
    <TextInput
      style={input.inputCoAir}
      value={localMinutes}
      keyboardType="numeric"
      onChangeText={handleMinutesChange}
    />
  );
};

export const DepthInputComponent = ({ onDepthChange, depth }) => {
  const { setDepth } = useGlobalState();
  const [localDepth, setLocalDepth] = useState(depth);

  useEffect(() => {
    setLocalDepth(depth);
  }, [depth]);

  const handleDepthChange = (text) => {
    const normalizedText = convertInput(text);
    setLocalDepth(normalizedText); // Mettez à jour l'état local
    onDepthChange(normalizedText); // Notify the parent component
  };

  return (
    <TextInput
      style={input.inputCoAir}
      value={String(localDepth)} // Assurez-vous que c'est une chaîne
      keyboardType="numeric"
      onChangeText={handleDepthChange}
    />
  );
};
